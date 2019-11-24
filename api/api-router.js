const express = require('express');

const apiRouter = express.Router();

apiRouter.get('/status', (req, res) => res.send({ status: 'ok' }));

module.exports = { apiRouter };
