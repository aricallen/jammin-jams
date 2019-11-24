const email = require('emailjs/email');

const { EMAIL_USERNAME, EMAIL_PASSWORD, EMAIL_HOST } = process.env;

const server = email.server.connect({
  user: EMAIL_USERNAME,
  password: EMAIL_PASSWORD,
  host: EMAIL_HOST,
  ssl: true,
});

const sendEmail = ({ message, to, subject }) => {
  server.send(
    { text: message, from: 'solstice.sebastian@gmail.com', to, subject, attachment: [] },
    (err) => {
      if (err) {
        console.error('unable to send email');
      } else {
        console.log('message sent!');
      }
    }
  );
};

const serializeForEmail = (row) => {
  return Object.entries(row)
    .reduce((acc, curr) => {
      const [field, value] = curr;
      acc.push(`${field}: ${value}`);
      return acc;
    }, [])
    .join('\n');
};

module.exports = { sendEmail, serializeForEmail };
