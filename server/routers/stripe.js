const express = require('express');
const Stripe = require('stripe');
// const { parseError } = require('../utils/api-helpers');

const stripe = Stripe(process.env.STRIPE_SECRET_KEY);

const router = express.Router();

router.get('/products', async (req, res) => {
  const products = await stripe.products.list({ limit: 10 });
  res.send(products);
});

router.get('/products/:id', async (req, res) => {
  const product = await stripe.products.retrieve(req.params.id);
  res.send(product);
});

module.exports = { router };
