/* eslint-disable camelcase */
const express = require('express');
const { adapter } = require('../adapters/email-list');
const { sendDebugEmail, addMember } = require('../utils/email-helpers');

const router = express.Router();

router.post('/lists/add-member', async (req, res) => {
  try {
    const response = await addMember(req.body, adapter);
    return res.send({ data: response });
  } catch (err) {
    return res.status(400).send({
      error: err,
      message: 'Unable to add to mailing lists',
    });
  }
});

router.get('/lists', async (req, res) => {
  const response = await adapter.get('lists');
  res.send({ data: response.data.lists });
});

router.post('/debug', (req, res) => {
  sendDebugEmail(req.body);
  res.status(200).send({ ack: true });
});

module.exports = { router };
