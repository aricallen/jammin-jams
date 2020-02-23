import React, { useState } from 'react';
import styled from '@emotion/styled';
import { useDispatch, useSelector } from 'react-redux';
import { Button as ButtonBase } from './Button';
import { Input, FormError } from './Forms';
import { isBusy, isResolved } from '../../redux/utils/meta-status';
import { addMember } from '../../redux/email/actions';
import { spacing } from '../../constants/style-guide';

const Wrapper = styled('div')`
  display: flex;
  align-items: center;
`;

const InputSection = styled('div')`
  width: 50%;
  padding-right: ${spacing.regular}px;
  &:last-child {
    padding-right: 0;
  }
`;

const Button = styled(ButtonBase)`
  width: 100%;
`;

const Message = styled('div')``;
const Form = styled('form')``;

export const NewsletterForm = () => {
  const dispatch = useDispatch();
  const emailState = useSelector((state) => state.email);
  const [values, setValues] = useState({ email: '', firstName: '', lastName: '' });
  const [errors, setErrors] = useState({ email: null });

  const handleChange = (name) => (event) => {
    setValues({ ...values, [name]: event.target.value });
  };

  const onSubmit = (e) => {
    e.preventDefault();
    if (/[a-z0-9._%+-]+@[a-z0-9.-]+\.[a-z]{2,4}$/.test(values.email)) {
      dispatch(addMember({ ...values, tags: ['Newsletter'] }));
    } else {
      setErrors({ ...errors, email: 'Invalid email address' });
    }
  };

  if (isResolved(emailState.meta)) {
    return <Message>Signed up successfully 🎉</Message>;
  }

  return (
    <Form onSubmit={onSubmit}>
      <Wrapper>
        <InputSection>
          <Input
            type="email"
            name="email"
            value={values.email}
            placeholder="you@awesome.org"
            onChange={handleChange('email')}
          />
        </InputSection>
        <InputSection>
          <Button onClick={onSubmit} isBusy={isBusy(emailState.meta)} type="submit">
            Sign up
          </Button>
        </InputSection>
      </Wrapper>
      {errors.email && <FormError>{errors.email}</FormError>}
    </Form>
  );
};
