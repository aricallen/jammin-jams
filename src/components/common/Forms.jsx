import styled from '@emotion/styled';
import { spacing, pallet, font } from '../../constants/style-guide';

export const Input = styled('input')`
  padding: ${spacing.regular}px;
  border-radius: ${spacing.regular}px;
  border-color: ${pallet.strawberry};
  width: 100%;
  &:active,
  &:focus,
  &:focus-within,
  &:hover {
    outline: none;
    box-shadow: 0 0 4px ${pallet.strawberry}
  }
`;

export const Fieldset = styled('fieldset')`
  margin-bottom: ${spacing.regular}px;
`;

export const Label = styled('label')`
  display: block;
  margin-bottom: ${spacing.regular}px;
`;

export const Button = styled('button')`
  padding: ${spacing.regular}px;
  background-color: ${pallet.strawberry};
  border-radius: ${spacing.regular}px;
  font-family: ${font.family.bold};
  font-size: ${font.size.regular}px;

  &:active,
  &:focus,
  &:focus-within,
  &:hover {
    outline: none;
    box-shadow: 0 0 4px ${pallet.strawberry}
  }
`;