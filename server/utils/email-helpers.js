const email = require('emailjs/email');
const {
  EMAIL_USERNAME,
  EMAIL_PASSWORD,
  EMAIL_HOST,
  MAILCHIMP_LIST_ID,
  DEBUG_EMAIL,
  TARGET_ENV,
} = require('../../common/environment');

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

const serializeForEmail = (row = {}) => {
  return Object.entries(row)
    .reduce((acc, curr) => {
      const [field, value] = curr;
      if (
        typeof value === 'object' &&
        Array.isArray(value) === false &&
        Object.keys(value).length > 0
      ) {
        acc.push(serializeForEmail(value));
      } else {
        acc.push(`${field}: ${value}`);
      }
      return acc;
    }, [])
    .join('\n');
};

/**
 * serializes data to send to debug email
 */
const sendDebugEmail = (data, subject, productionOnly = true) => {
  const message = serializeForEmail(data);
  console.log(message);
  if (productionOnly && TARGET_ENV === 'production') {
    sendEmail({ message, subject: `JmnJams Error Debug -- ${subject}`, to: DEBUG_EMAIL });
  }
};

const addMember = async (values, adapter) => {
  const { tags, email: userEmail, firstName, lastName } = values;
  try {
    // get lists to find id
    const response = await adapter.get('lists');
    const listId = response.data.lists.length > 1 ? MAILCHIMP_LIST_ID : response.data.lists[0].id;

    // add member to new list
    const members = [
      {
        email_address: userEmail,
        email_type: 'html',
        status: 'subscribed',
        merge_fields: {
          FNAME: firstName,
          LNAME: lastName,
        },
        tags,
      },
    ];
    const addResponse = await adapter.post(`lists/${listId}`, { members, update_existing: true });
    const { new_members: newMembers = [], updated_members: updatedMembers = [] } = addResponse.data;
    return { newMembers, updatedMembers };
  } catch (err) {
    console.error('failed to add new member', err);
  }
};

module.exports = { sendEmail, serializeForEmail, addMember, sendDebugEmail };
