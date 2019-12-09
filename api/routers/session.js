const express = require('express');
const { hashIt } = require('../utils/api-helpers.js');

const router = express.Router();

const TOKEN_NAME = 'jj-token';

router.post('/', (req, res) => {
  const userInfo = JSON.stringify({ ...req.body, time: Date.now() });
  const sessionToken = hashIt(userInfo);
  req.session[sessionToken] = req.body;
  res.cookie(TOKEN_NAME, sessionToken, { maxAge: 1000 * 60 * 10, httpOnly: true });
  return res.send({
    data: {
      ...req.body,
    },
    meta: {
      sessionId: sessionToken,
    },
  });
});

router.get('/', (req, res) => {
  const sessionId = req.cookies[TOKEN_NAME];
  const sessionData = req.session[sessionId];
  if (sessionData) {
    return res.send({
      data: sessionData,
    });
  }
  return res.state(400).send({
    error: 'Unknown sessionId',
    message: `No session was found with id: "${sessionId}"`,
  });
});

module.exports = { router };
