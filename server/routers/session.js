const express = require('express');
const { omit } = require('lodash');
const { updateSession } = require('../utils/session');

const router = express.Router();

router.post('/', (req, res) => {
  const { key, data } = req.body;
  updateSession(req, key, data);
  return res.send({
    data: omit(req.body.data, ['cookie']),
  });
});

router.get('/', (req, res) => {
  const sessionData = req.session;
  if (sessionData) {
    return res.send({
      data: omit(sessionData, ['cookie']),
    });
  }
  return res.send({ data: {} });
});

module.exports = { router };
