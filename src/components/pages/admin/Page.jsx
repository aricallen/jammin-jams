import React from 'react';
import styled from '@emotion/styled';
import { useSelector } from 'react-redux';
import { Sidebar } from './Sidebar';
import { spacing } from '../../../constants/style-guide';
import { Content } from '../../common/Structure';
import { isResolved } from '../../../redux/utils/meta-status';
import { Spinner } from '../../common/Spinner';

const TOOLBAR_WIDTH = spacing.quadruple * 3;

const Wrapper = styled('div')`
  display: grid;
  grid-template-areas: 'toolbar content';
  grid-template-columns: ${TOOLBAR_WIDTH}px auto;
`;

export const Page = (props) => {
  const sessionState = useSelector((state) => state.session);
  const { children, ...routeProps } = props;
  return (
    <Wrapper>
      <Sidebar {...routeProps} />
      {isResolved(sessionState.meta) ? <Content>{children}</Content> : <Spinner variant="large" />}
    </Wrapper>
  );
};
