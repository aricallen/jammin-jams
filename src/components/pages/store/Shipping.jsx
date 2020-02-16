import React, { Fragment } from 'react';
import { startCase } from 'lodash';
import { FormInput } from '../../common/Forms';

const FIELDS = ['firstName', 'lastName', 'address', 'address2', 'zipCode'];

export const Shipping = (props) => {
  const { values, onUpdate } = props;

  const handleChange = (name, getValue) => (event) => {
    const newVal = getValue(event);
    const newValues = { ...values, [name]: newVal };
    const isValid = FIELDS.every((field) => newValues[field] && newValues[field].length > 0);
    onUpdate(name, newVal, isValid);
  };

  return (
    <Fragment>
      {FIELDS.map((field) => (
        <FormInput
          key={field}
          name={field}
          value={values[field] || ''}
          onChange={handleChange(field, (e) => e.target.value)}
          label={field === 'address2' ? 'Address 2' : startCase(field)}
          isRequired={true}
        />
      ))}
    </Fragment>
  );
};
