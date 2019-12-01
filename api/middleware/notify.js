const { sendEmail, serializeForEmail } = require('../utils/email-helpers');

const recipients = ['aric.allen2@gmail.com','celestetretto@gmail.com'];

const notify = (req, res, next) => {
  if (req.method === 'POST' && req.path.includes('waitlist') && process.env.TARGET_ENV === 'production') {
    recipients.forEach((to) => {
      sendEmail({ message: serializeForEmail(req.body), to, subject: 'Someone Joined the waitlist for Jammin Jams!' });
    });
  }
  next();
};

module.exports = { notify };
