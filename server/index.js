const express = require('express');
const session = require('express-session');
const morgan = require('morgan');
const helmet = require('helmet');
const bodyParser = require('body-parser');
const { notify } = require('./middleware/notify');
const { router: apiRouter } = require('./routers/api');
const { router: staticRouter } = require('./routers/static');
const { TARGET_ENV, SENTRY_URL, SESSION_SECRET, API_PORT } = require('./utils/environment');

if (TARGET_ENV === 'production') {
  const Sentry = require('@sentry/node');
  const dsn = SENTRY_URL;
  Sentry.init({ dsn });
}

const app = express();

app.use(helmet());
app.use(morgan('tiny'));
app.use(bodyParser.json());
app.use(bodyParser.urlencoded({ extended: true }));
app.use(
  session({
    secret: SESSION_SECRET,
    resave: false,
    saveUninitialized: false,
  })
);
app.use(notify);
app.use('/api', apiRouter);
app.use('/', staticRouter);

const port = API_PORT || 5000;
console.log(`listening on ${port}`);
app.listen(port);
