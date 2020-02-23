import React, { useState, useRef, useLayoutEffect, useEffect } from 'react';
import styled from '@emotion/styled';
import { useSelector, useDispatch } from 'react-redux';
import { LogoFilled } from '../common/LogoFilled';
import { fetchMany as fetchUsers } from '../../redux/users/actions';

const Wrapper = styled('div')`
  height: 100%;
`;

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
  animation: bumping 0.5s 4;
`;

const HomeContent = () => {
  return <div>home content</div>;
};

export const Home = () => {
  const [isBumping, setIsBumping] = useState(true);
  const [isAnimating, setIsAnimating] = useState(true);
  const heroRef = useRef();

  const listenForAnimation = () => {
    heroRef.current.addEventListener('animationend', () => {
      setIsBumping(false);
    });
    heroRef.current.addEventListener('transitionend', () => {
      setIsAnimating(true);
    });
  };

  useLayoutEffect(listenForAnimation, []);

  return isAnimating ? (
    <Wrapper>
      <Hero ref={heroRef} className={isBumping ? 'is-bumping' : 'done-bumping'}>
        <LogoWrapper>
          <LogoFilled className="grooving" />
        </LogoWrapper>
      </Hero>
    </Wrapper>
  ) : (
    <HomeContent />
  );
};
