const crypto = require('crypto');
const { SECRET_KEY, SECRET_KEY_LENGTH } = require('../utils/environment');

const hashIt = (str) => {
  return crypto
    .pbkdf2Sync(str, SECRET_KEY, 1000, parseInt(SECRET_KEY_LENGTH, 10), 'sha512')
    .toString('hex');
};

module.exports = { hashIt };
