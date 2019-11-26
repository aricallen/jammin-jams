const { snakeCase, camelCase } = require('lodash');
const pmysql = require('promise-mysql');

const { DATABASE_URL } = process.env;
const [user, password, host, _dbPort, database] = DATABASE_URL.replace('mysql://', '').split(/\/|:|@/g);

const getConnection = async () => {
  const connection = await pmysql.createConnection({ host, user, password, database });
  return connection;
};

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

module.exports = { serialize, deserialize, getConnection };
