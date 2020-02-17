import React, { Fragment } from 'react';
import styled from '@emotion/styled';
import { FormInput } from '../../common/Forms';
import { Checkbox } from '../../common/Checkbox';
import { spacing } from '../../../constants/style-guide';

const SignupWrapper = styled('div')`
  padding-top: ${spacing.double}px;
`;
const SignupMessage = styled('label')`
  cursor: pointer;
  margin-right: ${spacing.double}px;
`;

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
      <SignupWrapper>
        <SignupMessage htmlFor="newsletterSignup">Sign up for our newletter?</SignupMessage>
        <Checkbox
          checked={values.newsletterSignup}
          name="newsletterSignup"
          onClick={(e) => onUpdate('newsletterSignup', e.target.checked)}
        />
      </SignupWrapper>
    </Fragment>
  );
};
