require('dotenv').config();
const express = require('express');
const pmysql = require('promise-mysql');
const path = require('path');
const bodyParser = require('body-parser');
const { apiRouter } = require('./api-router');

const { DATABASE_URL } = process.env;

const [user, password, host, _dbPort, database] = DATABASE_URL.replace('mysql://', '').split(/\/|:|@/g);

const app = express();

app.use(bodyParser.json());
app.use(bodyParser.urlencoded({ extended: true }));

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

const injectDb = async () => {
  const connection = await pmysql.createConnection({ host, user, password, database });
  app.use((req, res, next) => {
    req.db = connection;
    return next();
  });
  app.use('/api', apiRouter);
};
injectDb();
