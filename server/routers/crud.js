const express = require('express');
const { getConnection } = require('../utils/db-helpers');
const { parseError, checkReadonly } = require('../utils/api-helpers');

const router = express.Router();

/**
 * READ ONE
 */

router.get('/:tableName/:resourceId', async (req, res) => {
  const { tableName, resourceId } = req.params;
  const conn = await getConnection();
  try {
    const results = await conn.query(`SELECT * FROM ${tableName} WHERE id = ?`, resourceId);
    res.send({
      data: results[0],
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
    const results = await conn.query(`SELECT * FROM ${tableName}`);
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
    const results = await conn.query(
      `UPDATE ${tableName} SET ? WHERE id = ?`,
      req.body,
      resourceId
    );
    res.send({
      data: results[0],
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
  const conn = await getConnection();
  try {
    const result = await conn.query(`INSERT INTO ${tableName} SET ?`, req.body);
    const inserted = await conn.query(`SELECT * from ${tableName} WHERE id = ${result.insertId}`);
    res.send({
      data: inserted[0],
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
    const results = await conn.query(`DELETE FROM ${tableName} WHERE id = ?`, resourceId);
    res.send({
      data: results[0],
    });
  } catch (err) {
    res.status(400).send(parseError(err, req));
  }
  conn.end();
});

module.exports = { router };
