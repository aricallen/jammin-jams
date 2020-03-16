const express = require('express');
const { omit } = require('lodash');
const { getConnection, getRecordBy } = require('../utils/db-helpers');
const { controller: createUserController } = require('../controllers/create-user');

const router = express.Router();

router.post('/', createUserController);

router.get('/email/:email', async (req, res) => {
  const { email } = req.params;
  try {
    const conn = await getConnection();
    const userRecord = await getRecordBy(conn, 'users', 'email', email);
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
