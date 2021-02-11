const express = require('express');
const axios = require('axios');
const ms = require('ms');
const { format } = require('date-fns');
const { sendDebugEmail } = require('../utils/email-helpers');
const { INSTAGRAM_ACCESS_TOKEN } = require('../utils/environment');

const router = express.Router();

const NAMESPACE = 'https://graph.instagram.com';
const MEDIA_ENDPOINT = `${NAMESPACE}/me/media`;
const REFRESH_ENDPOINT = `${NAMESPACE}/refresh_access_token`;
const UPDATE_TIMEOUT = ms('10d');

let _lastUpdatedMs = null;

const parseError = (axiosError) => {
  try {
    const message = axiosError.response.data.error.message;
    const error = axiosError.message;
    return { message, error };
  } catch (err) {
    return { message: 'Unknown error', error: err };
  }
};

const shouldRefreshToken = () => {
  // server restarted
  if (_lastUpdatedMs === null) {
    return true;
  }
  // 10 days have passed
  const msSinceLastUpdate = Date.now() - _lastUpdatedMs;
  return msSinceLastUpdate > UPDATE_TIMEOUT;
};

/**
 * refreshes insta token
 */
const refreshToken = async () => {
  if (!shouldRefreshToken()) {
    console.log('skipping token refresh');
    return null;
  }

  try {
    const queryParams = { grant_type: 'ig_refresh_token', access_token: INSTAGRAM_ACCESS_TOKEN };
    const queryString = new URLSearchParams(queryParams).toString();
    const url = `${REFRESH_ENDPOINT}?${queryString}`;
    const response = await axios.get(url);
    const expiresInMs = response.data.expires_in * 1000;
    const humanExpires = ms(expiresInMs, { long: true });
    const expiredDate = new Date(Date.now() + expiresInMs);
    const humanExpiredDate = format(expiredDate, 'MM-dd HH:mm:ss');
    console.log(`token refreshed successfully. Expires in: ${humanExpires} -- ${humanExpiredDate}`);
    _lastUpdatedMs = Date.now();
  } catch (err) {
    const { message, error } = parseError(err);
    console.log(`Unable to refresh token: ${error}`);
    console.log(`Error: ${message}`);
    sendDebugEmail({ message, error }, 'Unable to refresh token', false);
  }
};

/**
 * fetch camera roll
 */
router.get('/', async (req, res) => {
  try {
    const queryParams = { fields: 'media_url', access_token: INSTAGRAM_ACCESS_TOKEN };
    const queryString = new URLSearchParams(queryParams).toString();
    const url = `${MEDIA_ENDPOINT}?${queryString}`;
    const response = await axios.get(url);
    const urls = response.data.data.map((item) => item.media_url);
    res.send({ data: urls });
    refreshToken();
  } catch (err) {
    console.error(err);
    res.status(400).send({
      error: err.message,
      message: 'Unable to fetch camera roll',
    });
  }
});

module.exports = { router };
