const express = require('express');

const { serialize, deserialize } = require('./utils/db-helpers');

const apiRouter = express.Router();

apiRouter.get('/status', (req, res) => res.send({ status: 'ok' }));

apiRouter.post('/waitlist', async (req, res) => {
  const { body, db } = req;
  const row = serialize(body);
  try {
    const result = await db.query('INSERT INTO waitlist SET ?', row);
    console.log('inserted!', JSON.stringify(result));
    res.send({ message: 'inserted!' });
  } catch (err) {
    res.status(400).send({
      error: err,
      message: 'unable to insert',
    });
  }
});

module.exports = { apiRouter };
