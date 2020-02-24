import styled from '@emotion/styled';
import { spacing, pallet, animation } from '../../constants/style-guide';

export const Row = styled('div')`
  display: flex;
  align-items: center;
  padding: ${spacing.double}px;
  border-bottom: 1px solid ${pallet.light.charcoal};
  cursor: pointer;
  transition: background-color ${animation};
  &:hover {
    background-color: ${pallet.light.strawberry};
  }
`;
