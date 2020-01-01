const { snakeCase, camelCase, omit, pick } = require('lodash');
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

const getColumnNames = async (conn, tableName) => {
  const columnNames = await conn.query(`SELECT COLUMN_NAME
    FROM INFORMATION_SCHEMA.COLUMNS
    WHERE TABLE_SCHEMA='${process.env.DB_NAME}'
    AND TABLE_NAME='${tableName}'`);
  return columnNames;
};

const OMITTED_INSERT_COLUMNS = ['id', 'dateModified', 'dateCreated'];

const parseInsertValues = async (conn, tableName, values) => {
  const columnNames = (await getColumnNames(conn, tableName)).map((packet) => packet.COLUMN_NAME);
  const validColumns = columnNames.filter(
    (column) => OMITTED_INSERT_COLUMNS.includes(column) === false
  );
  const validValues = pick(values, validColumns);
  return validValues;
};

const insertIntoTable = async (conn, tableName, values) => {
  const row = await parseInsertValues(conn, tableName, values);
  const result = await conn.query(`INSERT INTO ${tableName} SET ?`, row);
  const inserted = await conn.query(`SELECT * from ${tableName} WHERE id = ${result.insertId}`);
  return inserted[0];
};

const getAllRows = async (conn, tableName) => {
  const results = await conn.query(`SELECT * from ${tableName}`);
  return results;
};

module.exports = {
  serialize,
  deserialize,
  getConnection,
  getColumnNames,
  parseInsertValues,
  insertIntoTable,
  getAllRows,
};
