import React from 'react';
import styled from '@emotion/styled';
import { omit, startCase } from 'lodash';
import { spacing, pallet } from '../../constants/style-guide';
import { fontSizes } from '../../utils/style-helpers';
import { media } from '../../utils/media';

export const Input = styled('input')`
  padding: ${spacing.regular}px;
  border-radius: ${spacing.regular}px;
  border-width: 1px;
  border-color: ${pallet.strawberry};
  width: 100%;
  ${fontSizes('regular')}
  &:active,
  &:focus,
  &:focus-within,
  &:hover {
    outline: none;
    box-shadow: 0 0 4px ${pallet.strawberry};
  }
`;

export const TextArea = styled('textarea')`
  border-radius: ${spacing.regular}px;
  border-width: 1px;
  border-color: ${pallet.strawberry};
  width: 100%;
`;

export const Fieldset = styled('fieldset')`
  margin-bottom: ${spacing.regular}px;
  ${media.mobile()} {
    margin-bottom: ${spacing.quadruple}px;
  }
  &.required {
    label::after {
      color: red;
      content: ' *';
    }
  }
`;

export const Label = styled('label')`
  display: block;
  margin-bottom: ${spacing.regular}px;
`;

export const Form = styled('form')``;

export const FormError = styled('span')`
  color: red;
  font-family: sans-serif;
  ${fontSizes('small')}
`;

/**
 * best guess as to type
 */
const getType = (name) => {
  if (name.includes('email')) {
    return 'email';
  }
  if (name.includes('password')) {
    return 'password';
  }
  if (name.includes('phone')) {
    return 'tel';
  }
  return 'text';
};

export const FormInput = (props) => {
  const { name, label, error, isRequired = false } = props;
  const inputProps = omit(props, ['isRequired', 'label', 'error']);
  const type = inputProps.type || getType(inputProps.name);
  return (
    <Fieldset className={isRequired ? 'required' : null}>
      <Label>{label || startCase(name)}</Label>
      <Input {...inputProps} type={type} required={isRequired} />
      {error && <FormError>{error}</FormError>}
    </Fieldset>
  );
};
