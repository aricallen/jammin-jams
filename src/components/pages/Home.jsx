import React, { useState, useRef, useLayoutEffect } from 'react';
import styled from '@emotion/styled';
import { LogoFilled } from '../common/LogoFilled';

// const steps = [{
//   earBar: 'yellow',
// }, {
//   earBar: 'orange',
// }, {
//   earBar: 'purple',
// }, {
//   earBar: 'red',
// }];

const Wrapper = styled('div')`
  height: 100%;
`;

// animation: grooving 0.5s 4;
// const Logo = styled(LogoFilled, {
//   shouldForwardProp: p => p !== 'stepIndex',
// })`
//   .ear-bar {
//     fill: ${p => steps[p.stepIndex].earBar};
//   }
//   .headband, .ear-bar, .ear-end, .peach {
//     transition: fill 0.1s ease-in-out;
//   }
// `;

const FADE_OUT = 1;

const Hero = styled('div')`
  width: 100%;
  height: 512px;
  display: flex;
  align-items: center;
  justify-content: space-around;
  background-color: white;
  transition: opacity ${FADE_OUT}s ease-in-out;
  opacity: 1;
  &.done-bumping {
    opacity: 0;
  }
`;

const LogoWrapper = styled('div')`
  height: 256px;
  width: 100%;
  // animation: bumping 0.5s 4;
  animation: bumping 0.5s 4;
`;

export const Home = ({ history }) => {
  const [isBumping, setIsBumping] = useState(true);

  const heroRef = useRef();

  // const listenForAnimation = () => {
  //   heroRef.current.addEventListener('animationend', () => {
  //     setIsBumping(false);
  //   });
  //   heroRef.current.addEventListener('transitionend', () => {
  //     history.push('/waitlist');
  //   });
  // };

  // useLayoutEffect(listenForAnimation, []);

  return (
    <Wrapper>
      <Hero ref={heroRef} className={isBumping ? 'is-bumping' : 'done-bumping'}>
        <LogoWrapper>
          <LogoFilled />
        </LogoWrapper>
      </Hero>
    </Wrapper>
  );
};