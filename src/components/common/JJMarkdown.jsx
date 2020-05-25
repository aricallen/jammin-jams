import React from 'react';
import styled from '@emotion/styled';
import ReactMarkdown from 'react-markdown';
import { spacing, pallet, border } from '../../constants/style-guide';

const Wrapper = styled('div')`
  ul {
    padding-left: ${spacing.quadruple}px;
  }

  blockquote {
    margin: ${spacing.double}px;
    padding-left: 1em;
    color: ${pallet.disabled};
    border-left: 0.25em solid #dfe2e5;
    font-style: italic;
  }

  .ingredients {
    margin-left: 2em;
    padding-left: 1em;
    border-left: 0.25em solid;
  }
`;

export const JJMarkdown = (props) => {
  return (
    <Wrapper>
      <ReactMarkdown {...props} />
    </Wrapper>
  );
};
