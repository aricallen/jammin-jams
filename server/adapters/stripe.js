const Stripe = require('stripe');
const { STRIPE_SECRET_KEY } = require('../../common/environment');

const adapter = Stripe(STRIPE_SECRET_KEY);

module.exports = { adapter };
