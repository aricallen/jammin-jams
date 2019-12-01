const express = require('express');
const { router: crudRouter } = require('./crud');

// /api
const router = express.Router();

router.use('/admin', crudRouter);

// general api
router.get('/status', (req, res) => res.send({ status: 'ok' }));

module.exports = { router };
