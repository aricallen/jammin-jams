const express = require('express');
const Stripe = require('stripe');
const { pick } = require('lodash');
const { serialize } = require('../utils/api-helpers');

const { STRIPE_PUBLISHABLE_KEY, STRIPE_SECRET_KEY } = process.env;

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

const serializeLineItems = (cartItems) => {
  return cartItems.map((item) => {
    const { product, sku } = item;
    return {
      ...pick(product, ['name', 'description']),
      ...pick(sku, ['currency']),
      quantity: 1,
      amount: sku.price,
      description: sku.attributes.interval,
    };
  });
};

/**
 * check for existing customer
 * create one if doesn't exist
 * create checkout session
 * on completion of checkout session, attach payment intent to customer
 */
router.post('/checkout', async (req, res) => {
  const { formValues, cartItems } = req.body;
  try {
    const session = await stripe.checkout.sessions.create({
      customer_email: formValues.email,
      payment_method_types: ['card'],
      payment_intent_data: {
        setup_future_usage: 'off_session',
      },
      line_items: serializeLineItems(cartItems),
      submit_type: 'auto',
      billing_address_collection: 'auto',
      success_url: 'http://localhost:4242/store/success?session_id={CHECKOUT_SESSION_ID}',
      cancel_url: 'http://localhost:4242/store',
    });

    const responseData = {
      ...session,
      sessionKey: STRIPE_PUBLISHABLE_KEY,
    };

    req.session[session.id] = responseData;

    res.send({
      data: responseData,
    });
  } catch (err) {
    res.status(400).send({
      error: err,
      ...err,
    });
  }
});

router.post('/subscription/checkout', async (req, res) => {
  const { cartItems } = req.body;
  try {
    const session = await stripe.checkout.sessions.create({
      payment_method_types: ['card'],
      subscription_data: {
        items: cartItems.map((item) => ({
          plan: item.plan.id,
        })),
      },
      success_url: 'http://localhost:4242/store/success?session_id={CHECKOUT_SESSION_ID}',
      cancel_url: 'http://localhost:4242/store',
    });
    res.send({
      data: {
        ...session,
        sessionKey: STRIPE_PUBLISHABLE_KEY,
      },
    });
  } catch (err) {
    console.error(err);
  }
});

router.get('/:resource', async (req, res) => {
  const results = await stripe[req.params.resource].list();
  res.send(results);
});

router.get('/:resource/:id', async (req, res) => {
  const { resource, id } = req.params;
  const result = await stripe[resource].retrieve(id);
  res.send(result);
});

module.exports = { router };
