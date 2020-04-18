const express = require('express');
const Stripe = require('stripe');

const { STRIPE_SECRET_KEY } = process.env;

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
  try {
    const results = await stripe[req.params.resource].list();
    const filteredData = results.data && results.data.filter((item) => item[key] === value);
    res.send({ ...results, data: filteredData || [] });
  } catch (err) {
    res.status(400).send({
      error: err,
      message: `Unable to fetch resource '${req.params.resource}'`,
    });
  }
});

router.get('/:resource/:id', async (req, res) => {
  const { resource, id } = req.params;
  const result = await stripe[resource].retrieve(id);
  res.send(result);
});

module.exports = { router };
