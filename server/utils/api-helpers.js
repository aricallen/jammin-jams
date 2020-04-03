const { omit, snakeCase } = require('lodash');
const { getConnection, getRecords, getRecord } = require('./db-helpers');

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

const createGetController = (tableName) => {
  return async (req, res) => {
    const conn = await getConnection();
    try {
      const records = await getRecords(conn, tableName);
      res.send({
        data: records,
      });
    } catch (err) {
      res.status(400).send({
        error: err,
        message: `Unable to fetch rows for ${tableName}`,
      });
    }
    conn.end();
  };
};

const createGetOneController = (tableName) => {
  return async (req, res) => {
    const conn = await getConnection();
    try {
      const record = await getRecord(conn, tableName, req.params.resourceId);
      res.send({
        data: record,
      });
    } catch (err) {
      res.status(400).send({
        error: err,
        message: `Unable to fetch rows for ${tableName}`,
      });
    }
    conn.end();
  };
};

const createUpdateController = (tableName) => {
  return async (req, res) => {
    const { resourceId } = req.params;
    const conn = await getConnection();
    try {
      await conn.query(
        `UPDATE ${tableName} SET ? WHERE id = ${resourceId}`,
        omit(req.body, ['id'])
      );
      const updated = await conn.query(`SELECT * from ${tableName} WHERE id = ${resourceId}`);
      res.send({
        data: updated[0],
      });
    } catch (err) {
      res.status(400).send(parseError(err, req));
    }
    conn.end();
  };
};

const serialize = (payload) => {
  return Object.entries(payload).reduce((acc, curr) => {
    const [key, val] = curr;
    acc[snakeCase(key)] = val;
    return acc;
  }, {});
};

module.exports = {
  parseError,
  checkReadonly,
  createGetController,
  createGetOneController,
  createUpdateController,
  serialize,
};
