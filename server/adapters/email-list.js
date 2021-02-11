const axios = require('axios');

const { MAILCHIMP_API_HOST, MAILCHIMP_API_KEY } = require('../../common/environment');

const headers = {
  'Content-Type': 'application/json',
  Authorization: `Bearer ${MAILCHIMP_API_KEY}`,
};

const adapter = axios.create({
  headers,
  baseURL: MAILCHIMP_API_HOST,
});

module.exports = { adapter };
