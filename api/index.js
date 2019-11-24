require('dotenv').config();
const express = require('express');
const path = require('path');
const bodyParser = require('body-parser');
const { apiRouter } = require('./api-router');

const app = express();

app.use(bodyParser.json());
app.use(bodyParser.urlencoded({ extended: true }));
app.use('/api', apiRouter);

if (process.env.TARGET_ENV === 'production') {
  const staticDirPath = path.resolve(__dirname, '..', 'dist');
  const staticServer = express.static(staticDirPath);
  app.use('/', staticServer);
  app.get('*', (req, res) => {
    res.sendFile(path.join(staticDirPath, 'index.html'));
  });
}

const port = process.env.API_PORT || 5000;
console.log(`listening on ${port}`);
app.listen(port);