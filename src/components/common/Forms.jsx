import React from 'react';
import styled from '@emotion/styled';
import { omit, startCase } from 'lodash';
import ReactSelect from 'react-select';
import { spacing, pallet, font } from '../../constants/style-guide';

export const Input = styled('input')`
  padding: ${spacing.regular}px;
  border-radius: ${spacing.regular}px;
  border-width: 1px;
  border-color: ${pallet.strawberry};
  width: 100%;
  font-size: ${font.size.regular}px;
  &:active,
  &:focus,
  &:focus-within,
  &:hover {
    outline: none;
    box-shadow: 0 0 4px ${pallet.strawberry};
  }
`;

export const Fieldset = styled('fieldset')`
  margin-bottom: ${spacing.regular}px;
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
  font-size: ${font.size.small}px;
  font-family: sans-serif;
`;

export const SelectElem = styled(ReactSelect)`
  border-radius: ${spacing.regular}px;
  border-color: ${pallet.strawberry};
  width: 100%;
  &:active,
  &:focus,
  &:focus-within,
  &:hover {
    outline: none;
    box-shadow: 0 0 4px ${pallet.strawberry};
  }
  .react-select__control,
  .react-select__control:active,
  .react-select__control:focus,
  .react-select__control:focus-within,
  .react-select__control:hover {
    outline: none;
    border-radius: ${spacing.regular}px;
    border-color: ${pallet.strawberry};
  }
  .react-select__control:active,
  .react-select__control:focus,
  .react-select__control:focus-within {
    box-shadow: 0 0 4px ${pallet.strawberry};
  }
  .react-select__option:hover,
  .react-select__option--is-selected,
  .react-select__option--is-focused {
    background-color: ${pallet.strawberry};
  }
`;

export const Select = (props) => {
  const otherProps = omit(props, ['required']);
  return <SelectElem {...otherProps} classNamePrefix="react-select" />;
};

export const FormInput = ({ name, label, error, value, onChange, isRequired = false }) => {
  return (
    <Fieldset className={isRequired ? 'required' : null}>
      <Label>{label || startCase(name)}</Label>
      <Input type="text" value={value} onChange={onChange} />
      {error && <FormError>{error}</FormError>}
    </Fieldset>
  );
};
