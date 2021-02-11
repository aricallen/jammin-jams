const express = require('express');
const { omit } = require('lodash');
const { getConnection, getRecords, upsertRecordBy } = require('../utils/db-helpers');

const router = express.Router();

/**
 * check current subscription count to see if we are at full capacity
 * and return rest of app meta
 */
router.get('/', async (req, res) => {
  try {
    const conn = await getConnection();
    const users = await getRecords(conn, 'users');
    const appMetaRows = await getRecords(conn, 'appMeta');
    const maxSubscribers = appMetaRows.find((row) => row.key === 'maxSubscribers');
    const appMeta = appMetaRows.reduce((acc, row) => {
      acc[row.key] = row.value;
      return acc;
    }, {});
    const data = {
      ...omit(appMeta, ['maxSubscribers']),
      isFull: users.length >= +maxSubscribers.value,
    };
    res.send({ data });
  } catch (err) {
    if (err.fatal) {
      await getConnection();
    }
  }
});

/**
 * update app meta rows
 */
router.post('/', async (req, res) => {
  try {
    const conn = await getConnection();
    const data = req.body;
    const entries = Object.entries(data);
    for (const entry of entries) {
      const [key, value] = entry;
      await upsertRecordBy(conn, 'appMeta', 'key', key, { key, value });
    }
    const all = await getRecords(conn, 'appMeta');
    res.send({
      data: all,
    });
  } catch (err) {
    if (err.fatal) {
      await getConnection();
    }
  }
});

module.exports = { router };
