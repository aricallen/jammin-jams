import React from 'react';
import styled from '@emotion/styled';
import { Logo } from '../common/Logo';
// import { pallet } from '../../constants/style-guide';

const Wrapper = styled('div')``;

const Hero = styled('div')`
  width: 100%;
  height: 512px;
  display: flex;
  align-items: center;
  justify-content: center;
`;

export const Home = () => {
  return (
    <Wrapper>
      <Hero>
        <Logo />
      </Hero>
    </Wrapper>
  );
};