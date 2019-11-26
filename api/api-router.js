const express = require('express');
const { serialize, getConnection } = require('./utils/db-helpers');
const { sendEmail, serializeForEmail } = require('./utils/email-helpers');

const recipients = ['aric.allen2@gmail.com','celestetretto@gmail.com'];

const apiRouter = express.Router();

apiRouter.get('/status', (req, res) => res.send({ status: 'ok' }));

apiRouter.post('/waitlist', async (req, res) => {
  const { body } = req;
  const connection = await getConnection();
  const row = serialize(body);
  try {
    const result = await connection.query('INSERT INTO waitlist SET ?', row);
    console.log('inserted!', JSON.stringify(result));
    recipients.forEach((to) => {
      sendEmail({ message: serializeForEmail(row), to, subject: 'Someone Joined the waitlist for Jammin Jams!' });
    });
    res.send({ message: 'inserted!' });
  } catch (err) {
    res.status(400).send({
      error: err,
      message: 'unable to insert',
    });
  }
});

module.exports = { apiRouter };
