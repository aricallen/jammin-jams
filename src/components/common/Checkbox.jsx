import React from 'react';
import styled from '@emotion/styled';
import { pallet } from '../../constants/style-guide';
import { fontSizes } from '../../utils/style-helpers';

export const CheckboxInput = styled('input')`
  cursor: pointer;
  border-color: ${pallet.strawberry};
  ${fontSizes('regular')}
  &:checked {
    background-color: ${pallet.strawberry};
  }
  &:active,
  &:focus,
  &:focus-within,
  &:hover {
    outline: none;
    box-shadow: 0 0 4px ${pallet.strawberry};
  }
`;

export const Checkbox = ({ checked = false, name, onChange }) => {
  return (
    <CheckboxInput name={name} id={name} type="checkbox" checked={checked} onChange={onChange} />
  );
};
