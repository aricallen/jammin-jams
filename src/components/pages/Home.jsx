import React, { useState, useRef, useLayoutEffect } from 'react';
import styled from '@emotion/styled';
import { LogoFilled } from '../common/LogoFilled';
import { Introduction } from './about/Introduction';

const Wrapper = styled('div')`
  height: 100%;
`;

const Hero = styled('div')`
  width: 100%;
  height: 512px;
  display: flex;
  align-items: center;
  justify-content: space-around;
  background-color: white;
  transition: opacity 1s ease-out;
  opacity: 1;
  &.done-bumping {
    opacity: 0;
  }
`;

const LogoWrapper = styled('div')`
  height: 256px;
  width: 100%;
  animation: bumping 0.5s 4;
`;

export const Home = () => {
  const [isBumping, setIsBumping] = useState(true);
  const [isAnimating, setIsAnimating] = useState(true);
  const heroRef = useRef();

  const initAnimationListeners = () => {
    heroRef.current.addEventListener('animationend', () => {
      setIsBumping(false);
    });
    heroRef.current.addEventListener('transitionend', () => {
      setIsAnimating(false);
    });
  };

  useLayoutEffect(initAnimationListeners, []);

  return isAnimating ? (
    <Wrapper>
      <Hero ref={heroRef} className={isBumping ? 'is-bumping' : 'done-bumping'}>
        <LogoWrapper>
          <LogoFilled className="grooving" />
        </LogoWrapper>
      </Hero>
    </Wrapper>
  ) : (
    <Introduction />
  );
};
