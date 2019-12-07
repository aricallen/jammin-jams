import React, { useState } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import Color from 'color';
import styled from '@emotion/styled';
import { Input, Fieldset, Label, FormError } from '../common/Forms';
import { Button } from '../common/Button';
import { spacing, ScreenSizes, pallet } from '../../constants/style-guide';
import { media } from '../../utils/media';
import { loginUser } from '../../redux/session/actions';

const Wrapper = styled('div')`
  width: 100%;
  display: flex;
  justify-content: center;
  padding-top: 6%;
`;

const LoginWrapper = styled('div')`
  ${media.min(ScreenSizes.TABLET)} {
    width: 50%;
  }
  width: 80%;
  padding: ${spacing.quadruple}px;
  max-width: 480px;
  background-color: ${Color(pallet.blueberry)
    .alpha(0.2)
    .string()};
`;

const LoginForm = styled('form')``;

const ButtonWrapper = styled('div')`
  margin-top: ${spacing.double}px;
`;

export const Login = ({ history }) => {
  const [values, setValues] = useState({});
  const loginError = useSelector(state => state.session.meta.error);
  const isFetching = useSelector(state => state.session.meta.isFetching);
  const dispatch = useDispatch();
  const errorMessage = loginError && loginError.message;

  const handleChange = name => event => {
    setValues({ ...values, [name]: event.target.value });
  };

  const handleSubmit = async () => {
    try {
      await dispatch(loginUser(values));
      history.push('/logo-builder');
    } catch (err) {
      console.error(err);
    }
  };

  return (
    <Wrapper>
      <LoginWrapper>
        <LoginForm
          onSubmit={e => {
            e.preventDefault();
            handleSubmit();
          }}
        >
          <Fieldset>
            <Label>Email</Label>
            <Input type="email" onChange={handleChange('email')} />
          </Fieldset>

          <Fieldset>
            <Label>Password</Label>
            <Input type="password" onChange={handleChange('password')} />
          </Fieldset>

          {errorMessage && <FormError>{errorMessage}</FormError>}

          <ButtonWrapper>
            <Button isBusy={isFetching}>Log in</Button>
          </ButtonWrapper>
        </LoginForm>
      </LoginWrapper>
    </Wrapper>
  );
};
