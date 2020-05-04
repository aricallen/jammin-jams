const { omit } = require('lodash');
const { getConnection } = require('../utils/db-helpers');
const { hashIt } = require('../utils/hash-it.js');
const { updateSession } = require('../utils/session');
const { adapter: stripe } = require('../adapters/stripe');

const getStripeUserInfo = async (user) => {
  if (!user.paymentCustomerId) {
    return {};
  }
  try {
    const stripeUser = await stripe.customers.retrieve(user.paymentCustomerId);
    return stripeUser;
  } catch (err) {
    console.log('Unable to fetch stripe customer', err);
  }
};

const controller = async (req, res) => {
  const { email, password: rawPassword, key } = req.body;
  const password = hashIt(rawPassword || '');
  const conn = await getConnection();
  try {
    const results = await conn.query(`SELECT * FROM users WHERE email = ? AND password = ?`, [
      email,
      password,
    ]);
    if (rawPassword && rawPassword.length && results.length === 1) {
      const user = omit(results[0], 'password');
      const stripeUser = await getStripeUserInfo(user);
      const data = {
        ...user,
        paymentCustomer: stripeUser,
        isAdmin: user.userRolesId === 1,
      };
      updateSession(req, key, data);
      return res.send({ data });
    }
    return res.status(401).send({
      error: 'unauthorized',
      message: 'Invalid username or password',
    });
  } catch (err) {
    res.status(400).send({
      error: 'unable to login',
      message: 'Unknown error attempting to login',
    });
  }
};

module.exports = { controller };
