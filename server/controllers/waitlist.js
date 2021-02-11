const { getConnection, insertRecord } = require('../utils/db-helpers');
const { parseError } = require('../utils/api-helpers');

const controller = async (req, res) => {
  const conn = await getConnection();
  try {
    const inserted = await insertRecord(conn, 'waitlist', req.body);
    res.send({
      data: inserted,
    });
  } catch (err) {
    if (err.fatal) {
      await getConnection();
    }
    res.status(400).send(parseError(err, req));
  }
};

module.exports = { controller };
