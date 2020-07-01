const { snakeCase, camelCase, pick, omit } = require('lodash');
const pmysql = require('promise-mysql');

const { DATABASE_URL } = process.env;

const getConnection = async (dbUrl = DATABASE_URL) => {
  // eslint-disable-next-line
  const [user, password, host, _, database] = dbUrl.replace('mysql://', '').split(/\/|:|@/g);
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

const createRecord = async (conn, tableName, values) => {
  const row = await parseInsertValues(conn, tableName, values);
  const result = await conn.query(`INSERT INTO ${tableName} SET ?`, row);
  const inserted = await conn.query(`SELECT * FROM ${tableName} WHERE id = ${result.insertId}`);
  return inserted[0];
};

const getRecords = async (conn, tableName) => {
  const results = await conn.query(`SELECT * FROM ${tableName}`);
  return results;
};

const getRecord = async (conn, tableName, resourceId) => {
  try {
    const results = await conn.query(`SELECT * FROM ${tableName} WHERE \`id\` = ?`, resourceId);
    return results[0];
  } catch (err) {
    console.log(err);
    throw err;
  }
};

const getRecordBy = async (conn, tableName, key, value) => {
  try {
    const results = await conn.query(`SELECT * FROM ${tableName} WHERE \`${key}\` = ?`, value);
    return results[0];
  } catch (err) {
    console.log(err);
    throw err;
  }
};

const updateRecord = async (conn, tableName, resourceId, values) => {
  try {
    await conn.query(
      `UPDATE ${tableName} SET ? WHERE id = ${resourceId}`,
      omit(values, ['id', 'dateCreated', 'dateModified'])
    );
    const updated = await conn.query(`SELECT * FROM ${tableName} WHERE \`id\` = ${resourceId}`);
    return updated[0];
  } catch (err) {
    console.log(err);
    throw err;
  }
};

const updateRecordBy = async (conn, tableName, whereKey, whereValue, values) => {
  try {
    await conn.query(
      `UPDATE ${tableName} SET ? WHERE \`${whereKey}\` = "${whereValue}"`,
      omit(values, ['id', 'dateCreated', 'dateModified'])
    );
    const updated = await conn.query(
      `SELECT * FROM ${tableName} WHERE \`${whereKey}\` = "${whereValue}"`
    );
    return updated[0];
  } catch (err) {
    console.log(err);
    throw err;
  }
};

const insertRecord = async (conn, tableName, values) => {
  try {
    const result = await conn.query(`INSERT INTO ${tableName} SET ?`, values);
    const inserted = await conn.query(`SELECT * FROM ${tableName} WHERE id = ${result.insertId}`);
    return inserted[0];
  } catch (err) {
    console.log(err);
    throw err;
  }
};

const upsertRecord = async (conn, tableName, values, uniqueBy = 'id') => {
  // check for existance first
  const existing = await conn.query(
    `SELECT * FROM ${tableName} WHERE \`${uniqueBy}\` = ?`,
    values[uniqueBy]
  );
  if (existing.length > 0) {
    return updateRecord(conn, tableName, existing[0].id, values);
  }
  return insertRecord(conn, tableName, values);
};

const upsertRecordBy = async (conn, tableName, key, value, updatedValues) => {
  // check for existance first
  const existing = await conn.query(`SELECT * FROM ${tableName} WHERE \`${key}\` = ?`, value);
  if (existing.length > 0) {
    return updateRecord(conn, tableName, existing[0].id, updatedValues);
  }
  return insertRecord(conn, tableName, updatedValues);
};

const deleteRecord = async (conn, tableName, resourceId) => {
  try {
    const existing = await getRecord(conn, tableName, resourceId);
    if (!existing) {
      throw new Error(`Unknown '${tableName}' record with id '${resourceId}'`);
    }
    const result = await conn.query(`DELETE FROM ${tableName} WHERE \`id\` = ?`, [resourceId]);
    if (result.affectedRows) {
      return existing;
    }

    throw new Error(`Nothing was deleted from ${tableName}`);
  } catch (err) {
    console.log(err);
    throw err;
  }
};

module.exports = {
  serialize,
  deserialize,
  getConnection,
  getColumnNames,
  parseInsertValues,
  createRecord,
  getRecords,
  getRecord,
  updateRecord,
  insertRecord,
  upsertRecord,
  deleteRecord,
  getRecordBy,
  updateRecordBy,
  upsertRecordBy,
};
