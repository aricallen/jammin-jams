const express = require('express');
const { adminRouter } = require('./admin-router');

const apiRouter = express.Router();

apiRouter.use('/admin', adminRouter);

apiRouter.get('/status', (req, res) => res.send({ status: 'ok' }));

module.exports = { apiRouter };
