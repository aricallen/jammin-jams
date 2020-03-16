import React, { Fragment, useEffect } from 'react';
import styled from '@emotion/styled';
import { Link } from 'react-router-dom';
import { useDispatch, useSelector } from 'react-redux';
import { FormInput } from '../../common/Forms';
import { Checkbox } from '../../common/Checkbox';
import { Spinner } from '../../common/Spinner';
import { Button } from '../../common/Button';
import { Emphasis } from '../../common/Structure';
import { spacing } from '../../../constants/style-guide';
import * as MetaStatus from '../../../redux/utils/meta-status';
import { fetchSession } from '../../../redux/session/actions';
import { createOne as createUser } from '../../../redux/users/actions';

const SignupWrapper = styled('div')`
  padding-top: ${spacing.double}px;
`;
const SignupMessage = styled('label')`
  cursor: pointer;
  margin-right: ${spacing.double}px;
`;

const Text = styled('div')`
  margin-bottom: ${spacing.double}px;
`;

const ButtonWrapper = styled('div')`
  margin-top: ${spacing.double}px;
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

const CreateForm = ({ values, handleChange, errors, onSubmitCreate, isBusy }) => (
  <Fragment>
    <Text>
      Already have an account? <Link to="/account/sign-in">Sign in</Link>
    </Text>
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
      type="password"
      value={values.confirmPassword || ''}
      onChange={handleChange('confirmPassword')}
      error={errors.confirmPassword}
      isRequired={true}
    />
    <ButtonWrapper>
      <Button onClick={onSubmitCreate} type="button" isBusy={isBusy}>
        Create Account
      </Button>
    </ButtonWrapper>
  </Fragment>
);

const SignedInForm = ({ sessionUser, values, onUpdate }) => {
  if (values.email !== sessionUser.email) {
    onUpdate('email', sessionUser.email);
  }
  if (!sessionUser.email) {
    return <Text>Uh oh... something is not right... please try again later.</Text>;
  }
  return (
    <Text>
      Signed in as <Emphasis>{sessionUser.email}</Emphasis>
    </Text>
  );
};

export const CreateAccount = (props) => {
  const dispatch = useDispatch();
  const sessionState = useSelector((state) => state.session);
  const usersState = useSelector((state) => state.users);
  const sessionUser = sessionState.data.user;

  const _fetchSession = () => {
    if (!sessionUser && MetaStatus.isInitial(sessionState.meta)) {
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

  if (MetaStatus.isBusy(sessionState.meta)) {
    return <Spinner />;
  }

  setIsValid(!!sessionUser);

  const onSubmitCreate = (e) => {
    e.preventDefault();
    const { email, password } = values;
    dispatch(createUser({ email, password, userRolesId: 2, isActive: false }));
  };

  return (
    <Fragment>
      {sessionUser ? (
        <SignedInForm values={values} sessionUser={sessionUser} onUpdate={onUpdate} />
      ) : (
        <CreateForm
          handleChange={handleChange}
          values={values}
          errors={errors}
          onSubmitCreate={onSubmitCreate}
          isBusy={MetaStatus.isBusy(usersState.meta)}
        />
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
