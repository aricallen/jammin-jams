import React from 'react';
import styled from '@emotion/styled';
import { sizes, spacing } from '../../constants/style-guide';
import { Input } from './Forms';

const Wrapper = styled('div')`
  width: 100%;
  min-height: ${sizes.rowHeight}px;
  background-color: black;
  color: white;
  display: flex;
  align-items: center;
`;

const FormWrapper = styled('div')`
  width: 100%;
  display: flex;
  justify-content: center;
`;

const FieldsWrapper = styled('div')`
  display: flex;
  align-items: center;
  justify-content: center;
  flex-grow: 1;
  max-width: 70%;
  input {
    flex-grow: 1;
    margin-right: ${spacing.regular}px;
    &:last-child {
      flex-grow: 2;
    }
  }
`;

const Span = styled('span')`
  margin-right: ${spacing.regular}px;
`;

export const Footer = () => {
  return (
    <Wrapper>
      <FormWrapper>
        <FieldsWrapper>
          <Span>Join our mailing list!</Span>
          <Input placeholder="first name" />
          <Input placeholder="last name" />
          <Input placeholder="email address" />
        </FieldsWrapper>
      </FormWrapper>
    </Wrapper>
  );
};
