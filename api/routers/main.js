const express = require('express');
const { router: crudRouter } = require('./crud');
const { loginController } = require('../controllers/login');
const schemas = require('../schemas');

// /api
const router = express.Router();

router.use('/admin', crudRouter);

// general api
router.get('/status', (req, res) => res.send({ status: 'ok' }));

router.post('/login', loginController);

router.get('/schemas/:tableName', (req, res) => {
  res.send({
    data: schemas[req.params.tableName].schema,
  });
});

module.exports = { router };
