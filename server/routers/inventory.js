const express = require('express');
const { pick } = require('lodash');
const { getConnection, updateRecordBy } = require('../utils/db-helpers');

const router = express.Router();

router.put('/inventory', async (req, res) => {
  const { body: newRows } = req;
  try {
    const conn = await getConnection();
    const allUpdated = [];
    for (const newRow of newRows) {
      const updated = await updateRecordBy(conn, 'inventory', 'productId', newRow.id, {
        quantity: newRow.quantity,
      });
      allUpdated.push({ ...newRow, ...pick(updated, ['productId', 'quantity']) });
    }
    res.send({ data: allUpdated });
  } catch (err) {
    const message = 'error updating product inventory';
    res.status(400).send({ error: err, message });
    throw new Error(message);
  }
});

module.exports = { router };
