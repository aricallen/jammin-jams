import React, { useState, useRef, useLayoutEffect } from 'react';
import styled from '@emotion/styled';
import { LogoFilled } from '../../common/LogoFilled';
import { FullPageWrapper } from '../../common/Structure';
import { CameraRoll } from '../../common/CameraRoll';
import { AboutSwitcher } from './AboutSwitcher';
import { HeroSection } from './HeroSection';
import * as SessionStorage from '../../../utils/session-storage';

const ANIMATION_TIMEOUT = 1000 * 60 * 15; // 15 mins
const ANIMATION_STORAGE_KEY = 'homeAnimationDisabledUntil';

const Wrapper = styled('div')`
  height: 100%;
`;

const AnimatedLogo = styled('div')`
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

const MainContentWrapper = styled('div')`
  animation: fade-in 0.5s 1;
`;

const disableAnimation = () => {
  const disabledUntil = Date.now() + ANIMATION_TIMEOUT;
  SessionStorage.setItem(ANIMATION_STORAGE_KEY, disabledUntil);
};

const shouldAnimate = () => {
  const disabledUntil = SessionStorage.getItem(ANIMATION_STORAGE_KEY);
  if (!disabledUntil) {
    return true;
  }
  return Date.now() > +disabledUntil;
};

export const Home = () => {
  const [isBumping, setIsBumping] = useState(true);
  const [isAnimating, setIsAnimating] = useState(true);
  const heroRef = useRef();

  const initAnimationListeners = () => {
    if (shouldAnimate()) {
      heroRef.current.addEventListener('animationend', () => {
        setIsBumping(false);
        disableAnimation();
      });
      heroRef.current.addEventListener('transitionend', () => {
        setIsAnimating(false);
      });
    }
  };

  useLayoutEffect(initAnimationListeners, []);

  if (shouldAnimate() && isAnimating) {
    return (
      <Wrapper>
        <AnimatedLogo ref={heroRef} className={isBumping ? 'is-bumping' : 'done-bumping'}>
          <LogoWrapper>
            <LogoFilled className="grooving" />
          </LogoWrapper>
        </AnimatedLogo>
      </Wrapper>
    );
  }

  return (
    <Wrapper>
      <MainContentWrapper>
        <HeroSection />
        <FullPageWrapper>
          <AboutSwitcher />
        </FullPageWrapper>
        <CameraRoll />
      </MainContentWrapper>
    </Wrapper>
  );
};
