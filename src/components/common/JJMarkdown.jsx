import React from 'react';
import styled from '@emotion/styled';
import ReactMarkdown from 'react-markdown';
import { spacing } from '../../constants/style-guide';

const Wrapper = styled('div')`
  ul {
    padding-left: ${spacing.quadruple}px;
  }
`;

export const JJMarkdown = (props) => {
  return (
    <Wrapper>
      <ReactMarkdown {...props} />
    </Wrapper>
  );
};
