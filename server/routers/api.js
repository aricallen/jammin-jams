const express = require('express');
const { router: crudRouter } = require('./crud');
const { router: sessionRouter } = require('./session');
const { router: stripeRouter } = require('./stripe');
const { router: emailRouter } = require('./email');
const { controller: signInController } = require('../controllers/sign-in');
const { controller: waitlistController } = require('../controllers/waitlist');
const { controller: qrCodeController } = require('../controllers/qr-code');
const { getConnection } = require('../utils/db-helpers');
const { router: uploadsRouter } = require('./uploads');
const { router: appMetaRouter } = require('./app-meta');
const { router: usersRouter } = require('./users');
const { router: cameraRollRouter } = require('./camera-roll');
const { router: checkoutRouter } = require('./checkout');
const { router: inventoryRouter } = require('./inventory');
const { router: productsRouter } = require('./products');

// /api
const router = express.Router();

router.use('/admin/uploads', uploadsRouter);
router.use('/admin', crudRouter);
router.use('/stripe', stripeRouter);
router.use('/checkout', checkoutRouter);
router.use('/session', sessionRouter);
router.use('/email', emailRouter);
router.use('/app-meta', appMetaRouter);
router.use('/users', usersRouter);
router.use('/camera-roll', cameraRollRouter);
router.use('/inventory', inventoryRouter);
router.use('/products', productsRouter);

// general api
router.get('/status', async (req, res) => {
  try {
    await getConnection();
    console.log('db connection ok!');
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

router.post('/sign-in', signInController);

router.post('/log-out', (req, res) => {
  req.session.destroy();
  res.status(200).send({});
});

router.post('/waitlist', waitlistController);
router.post('/qr-code/generate', qrCodeController);

router.all('*', (req, res) => {
  res.status(404).send({
    error: 'route not found',
    message: `unable to ${req.method}`,
    url: req.originalUrl,
  });
});

module.exports = { router };
