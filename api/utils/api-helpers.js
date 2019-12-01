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
      message: 'attempted to edit a readonly resource',
    });
  }
  next();
};

module.exports = { parseError, checkReadonly };
