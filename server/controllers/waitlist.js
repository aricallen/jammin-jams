const { getConnection } = require('../utils/db-helpers');
const { parseError } = require('../utils/api-helpers');

const controller = async (req, res) => {
  const conn = await getConnection();
  const tableName = 'waitlist';
  try {
    const result = await conn.query(`INSERT INTO ${tableName} SET ?`, req.body);
    const inserted = await conn.query(`SELECT * from ${tableName} WHERE id = ${result.insertId}`);
    res.send({
      data: inserted,
    });
  } catch (err) {
    res.status(400).send(parseError(err, req));
  }
  conn.end();
};

module.exports = { controller };
