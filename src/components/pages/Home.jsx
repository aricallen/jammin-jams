import React from 'react';
import styled from '@emotion/styled';
import { LogoFilled } from '../common/LogoFilled';
import { pallet } from '../../constants/style-guide';

const Wrapper = styled('div')``;

const Hero = styled('div')`
  width: 100%;
  height: 512px;
  display: flex;
  align-items: center;
  justify-content: space-around;
  background-color: ${pallet.peach};

  svg {
    height: 256px;
    animation: bumping 0.5s infinite;
  }
`;

export const Home = () => {
  const colorMap = {
    headband: 'purple',
    earBar: 'orange',
    earEnd: 'red',
    peach: 'pink',
  };

  return (
    <Wrapper>
      <Hero>
        <LogoFilled colorMap={colorMap} />
      </Hero>
    </Wrapper>
  );
};