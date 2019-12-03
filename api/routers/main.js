const express = require('express');
const { router: crudRouter } = require('./crud');
const { loginController } = require('../controllers/login');

// /api
const router = express.Router();

router.use('/admin', crudRouter);

// general api
router.get('/status', (req, res) => res.send({ status: 'ok' }));

router.post('/login', loginController);

module.exports = { router };
