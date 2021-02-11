const Stripe = require('stripe');
const { STRIPE_SECRET_KEY } = require('../utils/environment');

const adapter = Stripe(STRIPE_SECRET_KEY);

module.exports = { adapter };
