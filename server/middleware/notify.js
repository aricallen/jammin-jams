const { sendEmail, serializeForEmail } = require('../utils/email-helpers');
const { TARGET_ENV } = require('../utils/environment');

const recipients = ['jam@jmnjams.com', 'aric.allen2@gmail.com', 'celestetretto@gmail.com'];

const notify = (req, res, next) => {
  if (req.method === 'POST' && req.path.includes('waitlist') && TARGET_ENV === 'production') {
    recipients.forEach((to) => {
      sendEmail({
        message: serializeForEmail(req.body),
        to,
        subject: 'Someone Joined the waitlist for Jmn Jams!',
      });
    });
  }
  next();
};

module.exports = { notify };
