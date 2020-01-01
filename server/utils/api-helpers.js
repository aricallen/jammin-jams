const { getConnection, getAllRows } = require('./db-helpers');

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
      const records = await getAllRows(conn, tableName);
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

module.exports = { parseError, checkReadonly, createGetController };
