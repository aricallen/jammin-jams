const express = require('express');
const { serialize, deserialize } = require('./utils/db-helpers');

const apiRouter = express.Router();

apiRouter.get('/status', (req, res) => res.send({ status: 'ok' }));

apiRouter.post('/waitlist', (req, res) => {
  const { body } = req;
  const row = serialize(body);
  console.log('insert into table', JSON.stringify(row));
  res.send(row);
});

module.exports = { apiRouter };
