const express = require('express');
const { omit, pick } = require('lodash');
const { getConnection, updateRecord } = require('../utils/db-helpers');
const { sendEmail, serializeForEmail, addMember } = require('../utils/email-helpers');
const { adapter: emailListAdapter } = require('../adapters/email-list');
const { adapter: stripeAdapter } = require('../adapters/stripe');

const { STRIPE_PUBLISHABLE_KEY, HOST, PORT, TARGET_ENV, DEBUG_EMAIL } = process.env;

const router = express.Router();

const serializeLineItems = (cartItems, coupons) => {
  const discount = coupons.map((coupon) => coupon.amountOff);
  const fractionalDiscount = Math.ceil(discount / cartItems.length);
  return cartItems.map((item) => {
    const { product, sku } = item;
    return {
      ...pick(product, ['name', 'description']),
      ...pick(sku, ['currency']),
      quantity: 1,
      amount: sku.price - fractionalDiscount,
      description: sku.attributes.interval,
    };
  });
};

/**
 * create checkout session
 * return session.id to FE to use for redirecting to hosted checkout form
 */
router.post('/', async (req, res) => {
  const { formValues, cartItems, sessionUser, coupons = [] } = req.body;
  const host = TARGET_ENV === 'production' ? HOST : `${HOST}:${PORT}`;
  const customerValues = sessionUser.paymentCustomerId
    ? { customer: sessionUser.paymentCustomerId }
    : { customer_email: formValues.email };
  try {
    const checkoutSession = await stripeAdapter.checkout.sessions.create({
      ...customerValues,
      payment_method_types: ['card'],
      payment_intent_data: {
        setup_future_usage: 'off_session',
      },
      line_items: serializeLineItems(cartItems, coupons),
      submit_type: 'auto',
      billing_address_collection: 'auto',
      metadata: coupons.reduce((acc, curr) => {
        acc[curr.metadata.type] = curr.amountOff;
        return acc;
      }, {}),
      success_url: `${host}/store/success?session_id={CHECKOUT_SESSION_ID}`,
      cancel_url: `${host}/store/cancel?session_id={CHECKOUT_SESSION_ID}`,
    });

    const responseData = {
      checkoutSession,
      formValues: omit(formValues, ['password', 'confirmPassword']),
      cartItems,
      coupons,
      sessionKey: STRIPE_PUBLISHABLE_KEY,
    };

    // add to current session for FE
    req.session[checkoutSession.id] = responseData;

    res.send({
      data: responseData,
    });
  } catch (err) {
    res.status(400).send({
      error: err,
      message: 'Unable to create checkout session',
    });
  }
});

const updateStripeCustomer = async (
  customerId,
  formValues,
  checkoutSessionRecord,
  sessionUser,
  coupons
) => {
  const shippingFullName = `${formValues.firstName} ${formValues.lastName}`;
  const customerFullName = `${sessionUser.firstName} ${sessionUser.lastName}`;
  const { address, address2, zipCode } = formValues;
  const description = checkoutSessionRecord.display_items
    .map((item) => item.custom.description)
    .join(' - ');
  const priceCoupon = coupons.find((c) => c.metadata.type === 'price');
  const deliveryCoupon = coupons.find((c) => c.metadata.type === 'delivery');
  try {
    const customerRecord = await stripeAdapter.customers.update(customerId, {
      description,
      name: customerFullName,
      shipping: {
        address: {
          line1: address,
          line2: address2,
          postal_code: zipCode,
        },
        name: shippingFullName,
      },
      metadata: {
        shipping_instructions: formValues.shippingInstructions,
        deliveryCoupon: deliveryCoupon ? deliveryCoupon.name : 'n/a',
        priceCoupon: priceCoupon ? priceCoupon.name : 'n/a',
      },
    });
    return customerRecord;
  } catch (err) {
    const subject = 'Unable to update stripe customer record during checkout';
    console.error(subject, err);
    const message = serializeForEmail({ err, sessionUser, checkoutSessionRecord, formValues });
    sendEmail({ message, to: DEBUG_EMAIL, subject });
  }
};

const updateJJUserRecord = async (sessionUserId, formValues, customerId) => {
  try {
    const conn = await getConnection();
    const updatedValues = {
      ...pick(formValues, ['firstName', 'lastName', 'email']),
      isActive: true,
      paymentCustomerId: customerId,
    };
    const updated = await updateRecord(conn, 'users', sessionUserId, updatedValues);
    return updated;
  } catch (err) {
    const subject = 'Unable to update JJ user record during checkout';
    console.error(subject, err);
    const message = serializeForEmail({ err, sessionUserId, formValues, customerId });
    sendEmail({ message, to: DEBUG_EMAIL, subject });
  }
};

const addToEmailLists = async (formValues) => {
  try {
    return addMember(formValues, emailListAdapter);
  } catch (err) {
    const subject = 'Unable to add user to email lists during checkout';
    console.error(subject, err);
    const message = serializeForEmail({ err, formValues });
    sendEmail({ message, to: DEBUG_EMAIL, subject });
  }
};

const updatePaymentIntent = async (checkoutSessionRecord, appliedCoupons) => {
  const paymentIntentId = checkoutSessionRecord.payment_intent;
  const priceCoupon = appliedCoupons.find((c) => c.metadata.type === 'price');
  const product = checkoutSessionRecord.display_items
    .map((item) => `${item.custom.name} (${item.custom.description})`.trim())
    .join(' - ');
  try {
    const updated = await stripeAdapter.paymentIntents.update(paymentIntentId, {
      metadata: {
        couponName: priceCoupon ? priceCoupon.name : 'n/a',
        discount: priceCoupon ? priceCoupon.amountOff : 'n/a',
        product,
      },
    });
    return updated;
  } catch (err) {
    console.error('unable to update payment intent', err);
  }
};

/**
 * find customer for completed checkout
 * create jj user record with related customer.id
 * add shipping info to customer record
 * update customer description with sku interval info e.g. "Bimonthly"
 */
router.post('/success', async (req, res) => {
  const { formValues, sessionId, sessionUser } = req.body;
  const appliedCoupons = req.session[sessionId].coupons;
  try {
    const checkoutSessionRecord = await stripeAdapter.checkout.sessions.retrieve(sessionId);
    const { customer: customerId } = checkoutSessionRecord;
    const customerRecord = await updateStripeCustomer(
      customerId,
      formValues,
      checkoutSessionRecord,
      sessionUser,
      appliedCoupons
    );
    const updatedSessionUser = await updateJJUserRecord(sessionUser.id, formValues, customerId);
    await updatePaymentIntent(checkoutSessionRecord, appliedCoupons);
    await addToEmailLists(formValues);
    res.send({
      data: {
        checkoutSession: checkoutSessionRecord,
        sessionUser: {
          ...updatedSessionUser,
          customer: customerRecord,
        },
      },
    });
  } catch (err) {
    res.status(400).send({
      error: 'Unable to resolve databases',
      message: 'Error occured while attempting to process checkout',
    });
  }
});

module.exports = { router };
