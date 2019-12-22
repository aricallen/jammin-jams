const express = require('express');
const { omit } = require('lodash');

const router = express.Router();

router.post('/', (req, res) => {
  if (req.session === undefined) {
    req.session = {};
  }
  req.session[req.body.key] = req.body.data;
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
