const { snakeCase, camelCase } = require('lodash');

const serialize = (obj) => {
  return Object.entries(obj).reduce((acc, curr) => {
    const [key, val] = curr;
    acc[snakeCase(key)] = val;
    return acc;
  }, {});
};

const deserialize = (row) => {
  return Object.entries(row).reduce((acc, curr) => {
    const [key, val] = curr;
    acc[camelCase(key)] = val;
    return acc;
  }, {});
};

module.exports = { serialize, deserialize };
