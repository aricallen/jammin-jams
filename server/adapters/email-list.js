const axios = require('axios');

const { MAILCHIMP_API_HOST, MAILCHIMP_API_KEY } = process.env;

const headers = {
  'Content-Type': 'application/json',
  Authorization: `Bearer ${MAILCHIMP_API_KEY}`,
};

const adapter = axios.create({
  headers,
  baseURL: MAILCHIMP_API_HOST,
});

module.exports = { adapter };
