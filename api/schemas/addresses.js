const schema = {
  name: 'addresses',
  fields: [
    {
      attrs: {
        name: 'address',
        required: true,
        placeholder: '123 Jam Dr.',
      },
      props: {
        label: 'Address',
        type: 'text',
      },
    },
    {
      attrs: {
        name: 'address2',
        required: false,
        placeholder: 'Unit B',
      },
      props: {
        type: 'text',
        label: 'Address 2',
      },
    },
    {
      attrs: {
        name: 'zipCode',
        required: true,
        placeholder: '98765',
      },
      props: {
        type: 'text',
        label: 'Zip Code',
      },
    },
    {
      attrs: {
        name: 'city',
        required: true,
        placeholder: 'Awesomeville',
      },
      props: {
        type: 'text',
        label: 'City',
      },
    },
    {
      attrs: {
        name: 'state',
        required: true,
        placeholder: 'CA',
      },
      props: {
        type: 'text',
        label: 'State',
      },
    },
    {
      attrs: {
        name: 'country',
        required: true,
      },
      props: {
        type: 'select',
        label: 'Country',
        options: [
          {
            label: 'USA',
            value: 'USA',
          },
        ],
        value: {},
      },
    },
  ],
};

module.exports = { schema };
