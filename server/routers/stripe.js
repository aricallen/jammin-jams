const express = require('express');
const Stripe = require('stripe');
const { pick } = require('lodash');

const { STRIPE_PUBLISHABLE_KEY, STRIPE_SECRET_KEY, HOST, PORT } = process.env;

const stripe = Stripe(STRIPE_SECRET_KEY);

const router = express.Router();

router.get('/plans', async (req, res) => {
  const plans = await stripe.plans.list();
  const { productId } = req.query;
  if (productId) {
    const filtered = plans.data.filter((plan) => plan.product === productId);
    return res.send({
      ...plans,
      data: filtered,
    });
  }
  res.send(plans);
});

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
router.post('/checkout', async (req, res) => {
  const { formValues, cartItems, coupons = [] } = req.body;
  try {
    const session = await stripe.checkout.sessions.create({
      customer_email: formValues.email,
      payment_method_types: ['card'],
      payment_intent_data: {
        setup_future_usage: 'off_session',
      },
      line_items: serializeLineItems(cartItems, coupons),
      submit_type: 'auto',
      billing_address_collection: 'auto',
      metadata: cartItems.reduce((acc, item) => {
        return {
          ...acc,
          ...item.attributes,
        };
      }, {}),
      success_url: `${HOST}:${PORT}/store/success?session_id={CHECKOUT_SESSION_ID}`,
      cancel_url: `${HOST}:${PORT}/store/cancel?session_id={CHECKOUT_SESSION_ID}`,
    });

    const responseData = {
      ...session,
      formValues,
      cartItems,
      sessionKey: STRIPE_PUBLISHABLE_KEY,
    };

    // add to current session for FE
    req.session[session.id] = responseData;

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

/**
 * find customer for completed checkout
 * create local user record with related customer.id
 * add shipping info to customer record
 * update customer description with sku info
 */
router.post('/checkout/success', async (req, res) => {
  const { formValues, sessionId } = req.body;
  const { address, address2, zipCode } = formValues;

  try {
    const sessionRecord = await stripe.checkout.sessions.retrieve(sessionId);
    const { customer: customerId } = sessionRecord;
    const fullName = `${formValues.firstName} ${formValues.lastName}`;
    const customerRecord = await stripe.customers.update(customerId, {
      description: sessionRecord.display_items.map((item) => item.custom.description).join(' - '),
      name: fullName,
      shipping: {
        address: {
          line1: address,
          line2: address2,
          postal_code: zipCode,
        },
        name: fullName,
      },
    });

    res.send({
      data: {
        ...sessionRecord,
        customer: customerRecord,
      },
    });
  } catch (err) {
    res.status(400).send({
      error: 'Unable to resolve databases',
      message: 'Error occured while attempting to process checkout',
    });
  }
});

router.get('/coupons', async (req, res) => {
  const { key, value, type } = req.query;
  const results = await stripe.coupons.list();
  const filteredData =
    results.data &&
    results.data.filter((item) => {
      if (type) {
        return item[key] === value && item.metadata.type === type;
      }
      return item[key] === value;
    });
  res.send({ ...results, data: filteredData });
});

router.get('/:resource', async (req, res) => {
  const { key, value } = req.query;
  const results = await stripe[req.params.resource].list();
  const filteredData = results.data && results.data.filter((item) => item[key] === value);
  res.send({ ...results, data: filteredData });
});

router.get('/:resource/:id', async (req, res) => {
  const { resource, id } = req.params;
  const result = await stripe[resource].retrieve(id);
  res.send(result);
});

module.exports = { router };
