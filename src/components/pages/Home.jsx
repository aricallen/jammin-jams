import React, { useState } from 'react';
import styled from '@emotion/styled';
import { LogoFilled } from '../common/LogoFilled';
// import { pallet } from '../../constants/style-guide';

const steps = [{
  earBar: 'yellow',
}, {
  earBar: 'orange',
}, {
  earBar: 'purple',
}, {
  earBar: 'red',
}];

const Wrapper = styled('div')`
  background-color: black;
  height: 100vh;
`;

// animation: grooving 0.5s 4;
const Logo = styled(LogoFilled, {
  shouldForwardProp: p => p !== 'stepIndex',
})`
  .ear-bar {
    fill: ${p => steps[p.stepIndex].earBar};
  }
  .headband, .ear-bar, .ear-end, .peach {
    transition: fill 0.1s ease-in-out;
  }
`;

const Hero = styled('div')`
  width: 100%;
  height: 512px;
  display: flex;
  align-items: center;
  justify-content: space-around;
  background-color: white;
`;

const LogoWrapper = styled('div')`
  height: 256px;
  width: 100%;
  animation: bumping 0.5s 4;
`;

const Body = styled('div')`
  background-color: black;
  color: white;
  min-height: 100%;
`;

export const Home = () => {
  const [stepIndex, setStepIndex] = useState(0);
  const [className, setClassName] = useState('grooving');
  setTimeout(() => {
    setClassName('done-grooving');
  }, 2 * 1000);

  // const props = className === 'grooving' ? {} : { colorMap };

  const increment = () => {
    if (stepIndex < steps.length - 1) {
      setStepIndex(stepIndex + 1);
      setTimeout(increment, 2000);
    }
  };
  increment();

  return (
    <Wrapper>
      <Hero>
        <LogoWrapper>
          <Logo className={className} stepIndex={stepIndex} />
        </LogoWrapper>
      </Hero>
      <Body>
        some text
      </Body>
    </Wrapper>
  );
};