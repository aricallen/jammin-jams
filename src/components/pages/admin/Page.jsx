import React from 'react';
import styled from '@emotion/styled';
import { Toolbar } from './Toolbar';
import { spacing } from '../../../constants/style-guide';
import { Content } from '../../common/Structure';

const TOOLBAR_WIDTH = spacing.quadruple * 3;

const Wrapper = styled('div')`
  display: grid;
  grid-template-areas: 'toolbar content';
  grid-template-columns: ${TOOLBAR_WIDTH}px auto;
`;

export const Page = (props) => {
  const { children, ...routeProps } = props;
  return (
    <Wrapper>
      <Toolbar {...routeProps} />
      <Content>{children}</Content>
    </Wrapper>
  );
};
