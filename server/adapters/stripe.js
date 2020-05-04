const Stripe = require('stripe');

const { STRIPE_SECRET_KEY } = process.env;
const adapter = Stripe(STRIPE_SECRET_KEY);

module.exports = { adapter };
