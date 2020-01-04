import React from 'react';
import styled from '@emotion/styled';
import Color from 'color';
import { omit, startCase } from 'lodash';
import ReactSelect from 'react-select';
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
  .react-select__option--is-selected {
    background-color: ${Color(pallet.strawberry)
      .lighten(0.2)
      .toString()};
  }
  .react-select__option--is-selected:hover {
    background-color: ${Color(pallet.strawberry)
      .lighten(0.4)
      .toString()};
  }
  .react-select__option:hover,
  .react-select__option--is-focused {
    background-color: ${pallet.strawberry};
  }

  .react-select__single-value {
    overflow: visible;
  }
`;

export const Select = (props) => {
  const otherProps = omit(props, ['required']);
  return <SelectElem {...otherProps} classNamePrefix="react-select" />;
};

export const FormInput = (props) => {
  const { name, label, error, isRequired = false } = props;
  const inputProps = omit(props, ['isRequired', 'label', 'error']);
  return (
    <Fieldset className={isRequired ? 'required' : null}>
      <Label>{label || startCase(name)}</Label>
      <Input {...inputProps} required={isRequired} />
      {error && <FormError>{error}</FormError>}
    </Fieldset>
  );
};
