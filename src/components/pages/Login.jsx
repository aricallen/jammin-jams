import React, { useState } from 'react';
import { useDispatch } from 'react-redux';
import Color from 'color';
import axios from 'axios';
import styled from '@emotion/styled';
import { Input, Button, Fieldset, Label, FormError } from '../common/Forms';
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
  const [error, setError] = useState();
  const dispatch = useDispatch();

  const handleChange = name => event => {
    setValues({ ...values, [name]: event.target.value });
  };

  const handleSubmit = async () => {
    try {
      await dispatch(loginUser(values));
      history.push('/logo-builder');
    } catch (err) {
      if (err.response.status === 401) {
        setError('Invalid credentials');
      } else {
        setError('Unable to login: unknown error');
      }
    }
    // try {
    //   const response = await axios.post('/api/login', values);
    //   if (!response || !response.data) {
    //     setError('Invalid credentials');
    //   } else {
    //     history.push('/logo-builder');
    //   }
    // } catch (err) {
    // }
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
            <Input onChange={handleChange('email')} />
          </Fieldset>

          <Fieldset>
            <Label>Password</Label>
            <Input type="password" onChange={handleChange('password')} />
          </Fieldset>

          {error && <FormError>{error}</FormError>}

          <ButtonWrapper>
            <Button onClick={handleSubmit}>Log in</Button>
          </ButtonWrapper>
        </LoginForm>
      </LoginWrapper>
    </Wrapper>
  );
};
