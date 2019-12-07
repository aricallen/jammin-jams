const schema = {
  name: 'addresses',
  fields: [
    {
      name: 'address',
      type: 'text',
      required: true,
      placeholder: '123 Jam Dr.',
      value: '',
    },
    {
      name: 'address2',
      type: 'text',
      required: false,
      placeholder: 'Unit B',
    },
    {
      name: 'zipCode',
      type: 'text',
      required: true,
      placeholder: '98765',
    },
    {
      name: 'city',
      type: 'text',
      required: true,
      placeholder: 'Awesomeville',
    },
    {
      name: 'state',
      type: 'text',
      required: true,
      placeholder: 'CA',
    },
    {
      name: 'country',
      type: 'text',
      required: true,
      placeholder: 'USA',
      value: 'USA',
    },
  ],
};

module.exports = { schema };
