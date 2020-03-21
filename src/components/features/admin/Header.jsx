import React from 'react';
import styled from '@emotion/styled';
import { spacing, pallet } from '../../../constants/style-guide';
import { Header1 } from '../../common/Structure';

const Wrapper = styled('div')`
  display: flex;
  justify-content: space-between;
  align-items: center;
  padding: ${spacing.regular}px;
  border-bottom: 1px solid ${pallet.light.charcoal};
`;

const HeaderActions = styled('div')`
  display: flex;
  align-items: center;
  & > button {
    margin-left: ${spacing.double}px;
  }
`;

export const Header = ({ title, Controls = null }) => {
  return (
    <Wrapper>
      <Header1 style={{ marginBottom: 0 }}>{title}</Header1>
      <HeaderActions>{Controls && <Controls />}</HeaderActions>
    </Wrapper>
  );
};
