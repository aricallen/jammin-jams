const { snakeCase, camelCase } = require('lodash');
const pmysql = require('promise-mysql');

const { DATABASE_URL } = process.env;

const getConnection = async (dbUrl = DATABASE_URL) => {
  const [user, password, host, _dbPort, database] = dbUrl.replace('mysql://', '').split(/\/|:|@/g);
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
