require('dotenv').config();
const express = require('express');
const session = require('express-session');
const helmet = require('helmet');
const path = require('path');
const bodyParser = require('body-parser');
const { router } = require('./routers/api');
const { notify } = require('./middleware/notify');

const app = express();

app.use(helmet());
app.use(bodyParser.json());
app.use(bodyParser.urlencoded({ extended: true }));
app.use(
  session({
    secret: process.env.SESSION_SECRET,
    resave: false,
    saveUninitialized: false,
  })
);
app.use(notify);
app.use('/api', router);
app.use('/api*', (req, res) => {
  res.status(404).send({
    error: 'route not found',
    message: `unable to ${req.method}`,
    url: req.originalUrl,
  });
});

if (process.env.TARGET_ENV === 'production') {
  const staticDirPath = path.resolve(__dirname, '..', 'dist');
  const staticServer = express.static(staticDirPath);
  app.use('/', staticServer);
  app.get('*', (req, res) => {
    if (req.originalUrl.includes('api') === false) {
      res.sendFile(path.join(staticDirPath, 'index.html'));
    }
  });
}

const port = process.env.API_PORT || 5000;
console.log(`listening on ${port}`);
app.listen(port);
