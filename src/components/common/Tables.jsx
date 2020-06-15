import styled from '@emotion/styled';
import { spacing, pallet, animation, border } from '../../constants/style-guide';

export const Row = styled('div')`
  display: flex;
  align-items: center;
  padding: ${spacing.double}px;
  border-bottom: ${border};
  cursor: pointer;
  transition: background-color ${animation};
  &:hover {
    background-color: ${pallet.sky};
  }
  &:last-child {
    border-bottom: 0;
  }
`;
