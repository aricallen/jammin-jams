const express = require('express');
const { router: crudRouter } = require('./crud');
const { router: sessionRouter } = require('./session');
const { controller: loginController } = require('../controllers/login');
const { controller: waitlistController } = require('../controllers/waitlist');
const { controller: subscriptionController } = require('../controllers/subscription');
const { getConnection } = require('../utils/db-helpers');
const schemas = require('../schemas');

// /api
const router = express.Router();

router.use('/admin', crudRouter);
router.use('/session', sessionRouter);

// general api
router.get('/status', async (req, res) => {
  try {
    const conn = await getConnection();
    conn.end();
  } catch (err) {
    return res.send({
      api: 'ok',
      db: 'not connected',
      error: err,
    });
  }
  return res.send({
    api: 'ok',
    db: 'ok',
  });
});

router.post('/login', loginController);

router.get('/schemas/:tableName', (req, res) => {
  res.send({
    data: schemas[req.params.tableName].schema,
  });
});

router.post('/waitlist', waitlistController);

router.post('/process-subscription', subscriptionController);

module.exports = { router };
