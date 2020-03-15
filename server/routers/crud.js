const express = require('express');
const {
  getConnection,
  getRecord,
  getRecords,
  upsertRecord,
  updateRecord,
  insertRecord,
  deleteRecord,
} = require('../utils/db-helpers');
const { parseError, checkReadonly } = require('../utils/api-helpers');

const router = express.Router();

/**
 * READ ONE
 */

router.get('/:tableName/:resourceId', async (req, res) => {
  const { tableName, resourceId } = req.params;
  const conn = await getConnection();
  try {
    const row = await getRecord(conn, tableName, resourceId);
    res.send({
      data: row,
    });
  } catch (err) {
    res.status(400).send(parseError(err, req));
  }
  conn.end();
});

/**
 * READ MANY
 */

router.get('/:tableName', async (req, res) => {
  const { tableName } = req.params;
  const conn = await getConnection();
  try {
    const results = await getRecords(conn, tableName);
    res.send({
      data: results,
    });
  } catch (err) {
    res.status(400).send(parseError(err, req));
  }
  conn.end();
});

/**
 * UPDATE
 */

router.put('/:tableName/:resourceId', checkReadonly, async (req, res) => {
  const { tableName, resourceId } = req.params;
  const conn = await getConnection();
  try {
    const updated = await updateRecord(conn, tableName, resourceId, req.body);
    res.send({
      data: updated,
    });
  } catch (err) {
    res.status(400).send(parseError(err, req));
  }
  conn.end();
});

/**
 * CREATE
 */

router.post('/:tableName', checkReadonly, async (req, res) => {
  const { tableName } = req.params;
  const { upsert, uniqueBy } = req.query;
  const conn = await getConnection();
  try {
    if (upsert) {
      const updated = await upsertRecord(conn, tableName, req.body, uniqueBy);
      return res.send({
        data: updated[0],
      });
    }
    const inserted = await insertRecord(conn, tableName, req.body);
    return res.send({
      data: inserted,
    });
  } catch (err) {
    res.status(400).send(parseError(err, req));
  }
  conn.end();
});

/**
 * DELETE
 */

router.delete('/:tableName/:resourceId', checkReadonly, async (req, res) => {
  const { tableName, resourceId } = req.params;
  const conn = await getConnection();
  try {
    const results = await deleteRecord(conn, tableName, resourceId);
    res.send({
      data: results[0],
    });
  } catch (err) {
    res.status(400).send(parseError(err, req));
  }
  conn.end();
});

module.exports = { router };
