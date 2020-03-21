const express = require('express');
const { getConnection, getRecords } = require('../utils/db-helpers');

const router = express.Router();

const { MAX_SUBSCRIBERS } = process.env;

/**
 * check current subscription count to see if we are at full capacity
 * may eventually include other data
 */
router.get('/', async (req, res) => {
  const conn = await getConnection();
  const users = await getRecords(conn, 'users');
  res.send({
    data: {
      isFull: users.length >= +MAX_SUBSCRIBERS,
    },
  });
});

module.exports = { router };
