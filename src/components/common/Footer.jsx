import React from 'react';
import styled from '@emotion/styled';
import { Content } from './Structure';
import { sizes } from '../../constants/style-guide';

const Wrapper = styled('nav')`
  position: relative;
  min-height: ${sizes.rowHeight}px;
  background-color: black;
  color: white;
  display: flex;
  align-items: center;
`;

export const Footer = () => {
  return (
    <Wrapper>
      <Content>Join our mailing list!</Content>
    </Wrapper>
  );
};
