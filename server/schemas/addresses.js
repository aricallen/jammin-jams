const schema = {
  name: 'addresses',
  fields: [
    {
      attrs: {
        type: 'text',
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
        type: 'text',
        name: 'address2',
        required: false,
        placeholder: 'Unit B',
      },
      props: {
        type: 'input',
        label: 'Address 2',
      },
    },
    // {
    //   attrs: {
    //     type: 'text',
    //     name: 'zipCode',
    //     required: true,
    //     placeholder: '98765',
    //   },
    //   props: {
    //     type: 'input',
    //     label: 'Zip Code',
    //   },
    // },
    {
      attrs: {
        type: 'text',
        name: 'city',
        required: true,
        placeholder: 'Awesomeville',
      },
      props: {
        type: 'input',
        label: 'City',
      },
    },
    {
      attrs: {
        type: 'text',
        name: 'state',
        required: true,
        placeholder: 'CA',
      },
      props: {
        type: 'input',
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
