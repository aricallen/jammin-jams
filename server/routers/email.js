const express = require('express');
const axios = require('axios');
const { sendEmail, serializeForEmail } = require('../utils/email-helpers');

const { MAILCHIMP_API_HOST, MAILCHIMP_API_KEY, MAILCHIMP_LIST_ID, DEBUG_EMAIL } = process.env;

const router = express.Router();

const headers = {
  'Content-Type': 'application/json',
  Authorization: `Bearer ${MAILCHIMP_API_KEY}`,
};

const adapter = axios.create({
  headers,
  baseURL: MAILCHIMP_API_HOST,
});

router.post('/lists/add-member', async (req, res) => {
  const { tags, email, firstName, lastName } = req.body;
  try {
    // get lists to find id
    const response = await adapter.get('lists');
    const listId = response.data.lists.length > 1 ? MAILCHIMP_LIST_ID : response.data.lists[0].id;

    // add member to new list
    const members = [
      {
        email_address: email,
        email_type: 'html',
        status: 'subscribed',
        merge_fields: {
          FNAME: firstName,
          LNAME: lastName,
        },
        tags,
      },
    ];
    const addResponse = await adapter.post(`lists/${listId}`, { members, update_existing: true });
    return res.send({ data: addResponse });
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
  const message = serializeForEmail(req.body);
  sendEmail({ message, subject: 'JmnJams Error Debug', to: DEBUG_EMAIL });
  res.status(200).send({ ack: true });
});

module.exports = { router };
