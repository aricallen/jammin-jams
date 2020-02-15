const express = require('express');
const Stripe = require('stripe');

const stripe = Stripe(process.env.STRIPE_SECRET_KEY);

const router = express.Router();

router.get('/products', async (req, res) => {
  const products = await stripe.products.list();
  res.send(products);
});

router.get('/products/:id', async (req, res) => {
  const product = await stripe.products.retrieve(req.params.id);
  res.send(product);
});

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

module.exports = { router };
