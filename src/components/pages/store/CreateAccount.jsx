import React, { Fragment } from 'react';
import { FormInput } from '../../common/Forms';

const FIELDS = ['email', 'password', 'confirmPassword'];

const getErrors = (values) => {
  const errors = {};
  const { password, confirmPassword } = values;

  if (!password || password.length === 0 || !confirmPassword || confirmPassword.length === 0) {
    return errors;
  }

  if (password !== confirmPassword) {
    errors.confirmPassword = 'Passwords do not match';
  }

  if (password && password.length < 8) {
    errors.password = 'Password must be more than 8 characters';
  }
  return errors;
};

export const CreateAccount = (props) => {
  const { values, onUpdate, setIsValid } = props;

  const handleChange = (name, getValue) => (event) => {
    const newVal = getValue(event);
    onUpdate(name, newVal);
  };

  const errors = getErrors(values);

  const isValid =
    Object.keys(errors).length === 0 &&
    FIELDS.every((field) => values[field] && values[field].length > 0);
  setIsValid(isValid);

  return (
    <Fragment>
      {FIELDS.map((field) => (
        <FormInput
          key={field}
          name={field}
          type={field === 'email' ? 'email' : 'password'}
          value={values[field] || ''}
          onChange={handleChange(field, (e) => e.target.value)}
          error={errors[field]}
          isRequired={true}
        />
      ))}
    </Fragment>
  );
};
