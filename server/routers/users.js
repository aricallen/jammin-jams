const express = require('express');
const { omit } = require('lodash');
const { getConnection, getRecordBy, upsertRecord } = require('../utils/db-helpers');
const { hashIt } = require('../utils/hash-it.js');
const { updateSession } = require('../utils/session');

const router = express.Router();

router.post('/', async (req, res) => {
  const { password: rawPassword } = req.body;
  const password = hashIt(rawPassword || '');
  const conn = await getConnection();
  try {
    const values = { ...req.body, password };
    const result = await upsertRecord(conn, 'users', values, 'email');
    // also "sign in" user by updating session
    const data = omit(result, ['password']);
    updateSession(req, 'user', data);
    return res.send({ data });
  } catch (err) {
    return res.status(400).send({
      error: err,
      message: 'Unable to create new user',
    });
  }
});

router.get('/email/:email', async (req, res) => {
  const { email } = req.params;
  try {
    const conn = await getConnection();
    const userRecord = await getRecordBy(conn, 'users', 'email', email);
    // also "sign in" user by updating session
    if (req.query.updateSession === 'true' || req.query.updateSession === true) {
      updateSession(req, 'user');
    }
    res.send({
      data: omit(userRecord, ['password']),
    });
  } catch (err) {
    res.status(400).send({
      error: err,
      message: `Error fetching user by email '${email}'`,
    });
  }
});

module.exports = { router };
