const updateSession = (req, key, data) => {
  if (req.session === undefined) {
    req.session = {};
  }
  req.session[key] = data;
  return req;
};

module.exports = { updateSession };
