import React, { Fragment, useEffect } from 'react';
import styled from '@emotion/styled';
import { useDispatch, useSelector } from 'react-redux';
import { FormInput } from '../../common/Forms';
import { Checkbox } from '../../common/Checkbox';
import { Spinner } from '../../common/Spinner';
import { spacing } from '../../../constants/style-guide';
import { isInitial, isBusy } from '../../../redux/utils/meta-status';
import { fetchSession } from '../../../redux/session/actions';

const SignupWrapper = styled('div')`
  padding-top: ${spacing.double}px;
`;
const SignupMessage = styled('label')`
  cursor: pointer;
  margin-right: ${spacing.double}px;
`;

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

const getInputValue = (e) => e.target.value;

const isValidField = (value) => value?.length > 0;

const getIsValid = (values, sessionUser) => {
  if (sessionUser) {
    return true;
  }
  return Object.values(values).every(isValidField);
};

const Form = ({ values, handleChange, errors }) => (
  <Fragment>
    <FormInput
      name="email"
      type="email"
      value={values.email || ''}
      onChange={handleChange('email')}
      error={errors.email}
      isRequired={true}
    />
    <FormInput
      name="password"
      type="password"
      value={values.password || ''}
      onChange={handleChange('password')}
      error={errors.password}
      isRequired={true}
    />
    <FormInput
      name="confirmPassword"
      type="confirmPassword"
      value={values.confirmPassword || ''}
      onChange={handleChange('confirmPassword')}
      error={errors.confirmPassword}
      isRequired={true}
    />
  </Fragment>
);

const SignedInForm = ({ sessionUser, values, onUpdate }) => {
  if (values.email !== sessionUser.email) {
    onUpdate('email', sessionUser.email);
  }
  return (
    <FormInput
      name="email"
      type="email"
      disabled={true}
      value={sessionUser.email}
      onChange={null}
    />
  );
};

export const CreateAccount = (props) => {
  const dispatch = useDispatch();
  const sessionState = useSelector((state) => state.session);
  const sessionUser = sessionState.data.user;

  const _fetchSession = () => {
    if (!sessionUser && isInitial(sessionState.meta)) {
      dispatch(fetchSession());
    }
  };
  useEffect(_fetchSession, []);

  const { values, onUpdate, setIsValid } = props;

  const handleChange = (name, getValue = getInputValue) => (event) => {
    const newVal = getValue(event);
    onUpdate(name, newVal);
  };

  const errors = getErrors(values);

  if (isBusy(sessionState.meta)) {
    return <Spinner />;
  }

  setIsValid(getIsValid(values, sessionUser));

  return (
    <Fragment>
      {sessionUser ? (
        <SignedInForm values={values} sessionUser={sessionUser} onUpdate={onUpdate} />
      ) : (
        <Form handleChange={handleChange} values={values} errors={errors} />
      )}
      <SignupWrapper>
        <SignupMessage htmlFor="newsletterSignup">Sign up for our newletter?</SignupMessage>
        <Checkbox
          checked={values.newsletterSignup}
          name="newsletterSignup"
          onChange={handleChange('newsletterSignup', (e) => e.target.checked)}
        />
      </SignupWrapper>
    </Fragment>
  );
};
