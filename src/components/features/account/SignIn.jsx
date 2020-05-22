import React, { useState } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import styled from '@emotion/styled';
import { Input, Fieldset, Label, FormError } from '../../common/Forms';
import { Button } from '../../common/Button';
import { spacing } from '../../../constants/style-guide';
import { media } from '../../../utils/media';
import { logInUser } from '../../../redux/session/actions';
import { isBusy } from '../../../utils/meta-status';
import { useHistory } from 'react-router-dom';

const Wrapper = styled('div')`
  width: 100%;
`;

const GoBackWrapper = styled('div')`
  padding: ${spacing.double}px;
  padding-left: ${spacing.quadruple}px;
`;

const SignInWrapper = styled('div')`
  margin: 0 auto;
  padding-top: 6%;
  ${media.mobile()} {
    width: 50%;
  }
  width: 80%;
  padding: ${spacing.quadruple}px;
  max-width: 480px;
`;

const SignInForm = styled('form')``;

const ButtonWrapper = styled('div')`
  margin-top: ${spacing.double}px;
`;

export const SignIn = () => {
  const history = useHistory();
  const [values, setValues] = useState({});
  const sessionState = useSelector((state) => state.session);
  const loginError = useSelector((state) => state.session.meta.error);
  const dispatch = useDispatch();

  const errorMessage = loginError && loginError.message;

  const handleChange = (name) => (event) => {
    setValues({ ...values, [name]: event.target.value });
  };

  const handleSubmit = async () => {
    try {
      const user = await dispatch(logInUser(values));
      if (user.isAdmin) {
        return history.push('/admin/dashboard');
      }
      if (history.length > 1) {
        return history.goBack();
      }
      return history.push('/account/orders');
    } catch (err) {
      console.error(err);
    }
  };

  return (
    <Wrapper>
      {history.length > 0 && (
        <GoBackWrapper>
          <Button variant="secondary" onClick={() => history.goBack()}>
            Go back
          </Button>
        </GoBackWrapper>
      )}
      <SignInWrapper>
        <SignInForm
          onSubmit={(e) => {
            e.preventDefault();
            handleSubmit();
          }}
        >
          <Fieldset>
            <Label>Email</Label>
            <Input type="email" onChange={handleChange('email')} autoComplete="email" />
          </Fieldset>

          <Fieldset>
            <Label>Password</Label>
            <Input
              type="password"
              onChange={handleChange('password')}
              autoComplete="current-password"
            />
          </Fieldset>

          {errorMessage && <FormError>{errorMessage}</FormError>}

          <ButtonWrapper>
            <Button isBusy={isBusy(sessionState.meta)}>Log in</Button>
          </ButtonWrapper>
        </SignInForm>
      </SignInWrapper>
    </Wrapper>
  );
};
