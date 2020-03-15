import React, { useState } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import styled from '@emotion/styled';
import { Input, Fieldset, Label, FormError } from '../../common/Forms';
import { Button } from '../../common/Button';
import { spacing } from '../../../constants/style-guide';
import { media } from '../../../utils/media';
import { logInUser } from '../../../redux/session/actions';
import { isBusy } from '../../../redux/utils/meta-status';

const Wrapper = styled('div')`
  width: 100%;
  display: flex;
  justify-content: center;
  padding-top: 6%;
`;

const SignInWrapper = styled('div')`
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

export const SignIn = ({ history }) => {
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
        history.push('/admin/dashboard');
      } else {
        history.push('/account/orders');
      }
    } catch (err) {
      console.error(err);
    }
  };

  return (
    <Wrapper>
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
