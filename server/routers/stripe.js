const express = require('express');
const { adapter: stripe } = require('../adapters/stripe');

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

router.get('/orders', async (req, res) => {
  const { customerId } = req.query;
  try {
    // because of way we setup the products, these are actually paymentIntents rather than orders
    const paymentIntents = await stripe.paymentIntents.list();
    const forCustomer = paymentIntents.data.filter((pi) => pi.customer === customerId);
    res.send({ data: forCustomer });
  } catch (err) {
    console.error('unable to fetch payments for customer', err);
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
