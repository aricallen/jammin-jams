import React from 'react';
import styled from '@emotion/styled';
import { Logo } from '../common/Logo';
import { LogoFilled } from '../common/LogoFilled';
import { LogoOutline } from '../common/LogoOutline';
import { pallet } from '../../constants/style-guide';

const Wrapper = styled('div')``;

const Hero = styled('div')`
  width: 100%;
  height: 512px;
  display: flex;
  align-items: center;
  justify-content: space-around;
  background-color: ${pallet.strawberry};
`;

export const Home = () => {
  return (
    <Wrapper>
      <Hero>
        <Logo />
        <LogoOutline />
        <LogoFilled />
      </Hero>
    </Wrapper>
  );
};