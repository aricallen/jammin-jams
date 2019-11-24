import styled from '@emotion/styled';
import { spacing, pallet } from '../../../constants/style-guide';

export const Header = styled('div')`
  display: flex;
  justify-content: space-between;
  align-items: center;
  padding: ${spacing.regular}px;
  border-bottom: 1px solid ${pallet.light.charcoal};
`;

export const HeaderActions = styled('div')`
  display: flex;
  align-items: center;
  & > button {
    margin-left: ${spacing.double}px;
  }
`;
