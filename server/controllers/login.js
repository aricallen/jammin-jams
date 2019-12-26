const { omit } = require('lodash');
const { getConnection } = require('../utils/db-helpers');
const { hashIt } = require('../utils/api-helpers.js');

const controller = async (req, res) => {
  const { email, password: rawPassword } = req.body;
  const password = hashIt(rawPassword || '');
  const conn = await getConnection();
  try {
    const results = await conn.query(`SELECT * FROM users WHERE email = ? AND password = ?`, [
      email,
      password,
    ]);
    if (rawPassword && rawPassword.length && results.length === 1) {
      return res.send({
        data: omit(results[0], 'password'),
      });
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
