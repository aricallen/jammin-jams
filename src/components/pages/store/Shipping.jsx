import React, { Fragment } from 'react';
import { startCase } from 'lodash';
import { FormInput } from '../../common/Forms';

const FIELDS = ['firstName', 'lastName', 'address', 'address2'];

const REQUIRED_FIELDS = FIELDS.filter((field) => field !== 'address2');

const isValid = (values) => {
  const filledFields = FIELDS.filter((field) => values[field] && values[field].length > 0);
  return REQUIRED_FIELDS.every((field) => filledFields.includes(field));
};

export const Shipping = (props) => {
  const { values, onUpdate, setIsValid } = props;

  const handleChange = (name, getValue) => (event) => {
    const newVal = getValue(event);
    onUpdate(name, newVal);
  };

  setIsValid(isValid(values));

  return (
    <Fragment>
      {FIELDS.map((field) => (
        <FormInput
          key={field}
          name={field}
          value={values[field] || ''}
          onChange={handleChange(field, (e) => e.target.value)}
          label={field === 'address2' ? 'Address 2' : startCase(field)}
          isRequired={field !== 'address2'}
        />
      ))}
    </Fragment>
  );
};
