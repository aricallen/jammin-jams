const schema = {
  name: 'users',
  fields: [
    {
      attrs: {
        type: 'text',
        name: 'firstName',
        required: true,
        placeholder: 'Jane',
      },
      props: {
        label: 'First Name',
        type: 'text',
      },
    },
    {
      attrs: {
        type: 'text',
        name: 'lastName',
        required: true,
        placeholder: 'Awesome',
      },
      props: {
        label: 'Last Name',
        type: 'text',
      },
    },
    {
      attrs: {
        type: 'email',
        name: 'email',
        required: true,
        placeholder: 'jane.awesome@somemail.com',
      },
      props: {
        label: 'Email',
        type: 'text',
      },
    },
  ],
};

module.exports = { schema };
