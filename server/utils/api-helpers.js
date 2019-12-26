const crypto = require('crypto');

const parseError = (err, req) => {
  return {
    error: err,
    message: `unable to ${req.method}`,
    url: req.originalUrl,
  };
};

const readonlyRoutes = ['waitlist', 'userRoles', 'subscriptions', 'orders'];
const checkReadonly = (req, res, next) => {
  const { params, method } = req;
  const { tableName } = params;
  if (readonlyRoutes.includes(tableName) && method !== 'GET') {
    return res.send({
      error: 'unauthorized',
      message: `attempted to ${method} a readonly resource`,
    });
  }
  next();
};

const { SECRET_KEY, SECRET_KEY_LENGTH } = process.env;
const hashIt = (str) => {
  return crypto
    .pbkdf2Sync(str, SECRET_KEY, 1000, parseInt(SECRET_KEY_LENGTH, 10), 'sha512')
    .toString('hex');
};

module.exports = { parseError, checkReadonly, hashIt };
