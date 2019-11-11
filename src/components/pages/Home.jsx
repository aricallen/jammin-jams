import React, { useState } from 'react';
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
  }

  svg.dropping {
    height: 256px;
    transition: height 0.1s ease-in;
  }

  svg.kicked {
    height: 512px;
  }
`;

export const Home = () => {
  const colorMap = {
    headband: 'purple',
    earBar: 'orange',
    earEnd: 'red',
    peach: 'pink',
  };

  const [logoClass, setLogoClass] = useState(null);

  const BPM = 120;
  const secondsPerMinute = 60;
  const beatsPerSecond = BPM / secondsPerMinute; // 2 beats per second
  const kickInterval = 1000 / beatsPerSecond;

  // window.setInterval(() => {
  //   if (logoClass !== 'kicked') {
  //     setLogoClass('kicked');
  //   }

  //   setTimeout(() => {
  //     if (logoClass !== 'dropping') {
  //       setLogoClass('dropping');
  //     }
  //   }, 100);
  // }, kickInterval);

  return (
    <Wrapper>
      <Hero>
        <LogoFilled className={logoClass} colorMap={colorMap} />
      </Hero>
    </Wrapper>
  );
};