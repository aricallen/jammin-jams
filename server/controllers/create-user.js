const { omit } = require('lodash');
const { getConnection, upsertRecord } = require('../utils/db-helpers');
const { hashIt } = require('../utils/hash-it.js');
const { updateSession } = require('../utils/session');

const controller = async (req, res) => {
  const { password: rawPassword } = req.body;
  const password = hashIt(rawPassword || '');
  const conn = await getConnection();
  try {
    const values = { ...req.body, password };
    const result = await upsertRecord(conn, 'users', values, 'email');
    // also "log in" user by updating session
    updateSession(req, 'user', omit(result[0], ['password']));
    return res.send({ data: result[0] });
  } catch (err) {
    return res.status(400).send({
      error: err,
      message: 'Unable to create new user',
    });
  }
};

module.exports = { controller };
