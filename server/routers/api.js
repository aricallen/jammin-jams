const express = require('express');
const { router: crudRouter } = require('./crud');
const { router: sessionRouter } = require('./session');
const { router: stripeRouter } = require('./stripe');
const { router: mailchimpRouter } = require('./mailchimp');
const { controller: loginController } = require('../controllers/login');
const { controller: waitlistController } = require('../controllers/waitlist');
const { getConnection } = require('../utils/db-helpers');
const { router: mediaRouter } = require('./media');
const schemas = require('../schemas');

// /api
const router = express.Router();

router.use('/admin/media', mediaRouter);
router.use('/admin', crudRouter);
router.use('/stripe', stripeRouter);
router.use('/session', sessionRouter);
router.use('/mailchimp', mailchimpRouter);

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

router.post('/log-in', loginController);

router.post('/log-out', (req, res) => {
  req.session.destroy();
  res.status(200).send({});
});

router.get('/schemas/:tableName', (req, res) => {
  res.send({
    data: schemas[req.params.tableName].schema,
  });
});

router.post('/waitlist', waitlistController);

module.exports = { router };
