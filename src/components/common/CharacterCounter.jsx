import React from 'react';
import styled from '@emotion/styled';

const Wrapper = styled('span')`
  color: ${(p) => (p.isOverLimit ? 'red' : 'black')};
`;

export const CharacterCounter = (props) => {
  const { str, limit } = props;
  const safeStr = str || '';
  const { length } = safeStr;
  return <Wrapper isOverLimit={length > limit}>(Charecter Count: {length})</Wrapper>;
};
