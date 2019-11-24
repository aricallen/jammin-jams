import styled from '@emotion/styled';
import { spacing, pallet } from '../../constants/style-guide';

export const Input = styled('input')`
  padding: ${spacing.regular}px;
  border-radius: ${spacing.regular}px;
  border-color: ${pallet.strawberry};
  &:active,
  &:focus,
  &:focus-within,
  &:hover {
    outline: none;
    box-shadow: 0 0 4px ${pallet.strawberry}
  }
`;