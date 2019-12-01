const express = require('express');
const { getConnection } = require('./utils/db-helpers');
const { sendEmail, serializeForEmail } = require('./utils/email-helpers');

const recipients = ['aric.allen2@gmail.com','celestetretto@gmail.com'];
const adminRouter = express.Router();

const getError = (err, req) => {
  return {
    error: err,
    message: `unable to ${req.method}`,
    url: req.originalUrl,
  };
};

adminRouter.get('/:tableName/:resourceId', async (req, res) => {
  const { tableName, resourceId } = req.params;
  try {
    const conn = await getConnection();
    const results = await conn.query(`select * from ${tableName} where id = ?`, resourceId);
    res.send({
      data: results[0],
    });
  } catch (err) {
    res.status(400).send(getError(err, req));
  }
});

adminRouter.get('/:tableName', async (req, res) => {
  const { tableName } = req.params;
  try {
    const conn = await getConnection();
    const results = await conn.query(`select * from ${tableName}`);
    res.send({
      data: results,
    });
  } catch (err) {
    res.status(400).send(getError(err, req));
  }
});


adminRouter.post('/waitlist', async (req, res) => {
  const { body: row } = req;
  const connection = await getConnection();

  try {
    await connection.query('INSERT INTO waitlist SET ?', row);
    recipients.forEach((to) => {
      sendEmail({ message: serializeForEmail(row), to, subject: 'Someone Joined the waitlist for Jammin Jams!' });
    });
    res.send({ message: 'inserted!' });
    connection.release();
  } catch (err) {
    res.status(400).send({
      error: err,
      message: 'unable to insert',
    });
  }
});

module.exports = { adminRouter };
