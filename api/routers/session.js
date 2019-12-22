const express = require('express');
const { hashIt } = require('../utils/api-helpers.js');

const router = express.Router();

router.post('/', (req, res) => {
  const userInfo = JSON.stringify({ ...req.body, time: Date.now() });
  const sessionToken = hashIt(userInfo);
  if (req.session === undefined) {
    req.session = {};
  }
  req.session[req.body.key] = req.body.data;
  return res.send({
    data: {
      ...req.body.data,
    },
    meta: {
      key: req.body.key,
      sessionId: sessionToken,
    },
  });
});

router.get('/', (req, res) => {
  const sessionData = req.session;
  if (sessionData) {
    return res.send({
      data: sessionData,
    });
  }
  return res.send({ data: {}, meta: {} });
});

module.exports = { router };
