import React from 'react';
import styled from '@emotion/styled';
import ReactMarkdown from 'react-markdown';
import { spacing } from '../../constants/style-guide';

const Wrapper = styled('div')`
  padding: ${spacing.double}px;
  text-align: center;
`;

export const AlertMessage = ({ content = '' }) => {
  return (
    <Wrapper>
      <ReactMarkdown source={content} escapeHtml={false} />
    </Wrapper>
  );
};
