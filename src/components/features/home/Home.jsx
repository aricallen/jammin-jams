import React, { useState, useRef, useLayoutEffect } from 'react';
import styled from '@emotion/styled';
import Modal from 'react-modal';
import { LogoFilled } from '../../common/LogoFilled';
import { FullPageWrapper } from '../../common/Structure';
import { CameraRoll } from '../../common/CameraRoll';
import { Button } from '../../common/Button';
import { AboutSwitcher } from './AboutSwitcher';
import { HeroSection } from './HeroSection';
import * as SessionStorage from '../../../utils/session-storage';
import { NewsletterBlock } from '../../common/NewsletterBlock';
import { media } from '../../../utils/media';
import { spacing, pallet } from '../../../constants/style-guide';

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

const Text = styled('div')`
  background-color: ${pallet.sky};
  padding: ${spacing.double}px;
  text-align: center;
`;

const CameraRollWrapper = styled('div')`
  margin-top: ${spacing.quadruple}px;
`;

const CameraRollSection = () => {
  return (
    <CameraRollWrapper>
      <Text>
        Follow us on Instagram! <a href="https://www.instagram.com/jmn_jams/">@jmn_jams</a>
      </Text>
      <CameraRoll />
    </CameraRollWrapper>
  );
};

const SignUpSection = styled('div')`
  width: 50%;
  margin: 0 auto;
  ${media.mobile()} {
    width: 100%;
    padding: ${spacing.double}px;
  }
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

const Message = styled('div')`
  padding: ${spacing.quadruple}px;
  text-align: center;
`;

const Actions = styled('div')`
  display: flex;
  justify-content: flex-end;
`;

const Div = styled('div')``;

const isLiveNow = () => {
  const liveTimeFrom = new Date('2020-03-29 18:00:00').getTime();
  const liveTimeTo = new Date('2020-03-29 19:30:00').getTime();
  const currTime = Date.now();
  return currTime > liveTimeFrom && currTime < liveTimeTo;
};

const ModalContent = () => {
  if (isLiveNow()) {
    return (
      <Div>
        Hey there! We&apos;re streaming our jam making process live right now. Join us! The party is
        jammin&apos; (obviously).
      </Div>
    );
  }
  return (
    <Div>
      Hey there! We&apos;ll be streaming our jam making process live at 6pm PST. Join us! The party
      will be jammin&apos; (obviously).
    </Div>
  );
};

export const Home = () => {
  Modal.setAppElement('#app');
  const [isOpen, setIsOpen] = useState(true);
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
          <SignUpSection>
            <NewsletterBlock />
          </SignUpSection>
        </FullPageWrapper>
        <CameraRollSection />
      </MainContentWrapper>
      <Modal
        isOpen={isOpen}
        onRequestClose={() => setIsOpen(false)}
        contentLabel="Live Alert!"
        style={{
          content: {
            zIndex: 1000,
            margin: 'auto',
            marginTop: '64px',
            height: 'min-content',
            maxWidth: '48%',
          },
          overlay: {
            backgroundColor: 'rgba(0, 0, 0, 0.36)',
          },
        }}
      >
        <ModalContent />
        <Message>
          <a href="https://twitch.tv/jmnjams" target="_blank" rel="noopener noreferrer">
            Jammin&apos; Jams live on twitch
          </a>
          .
        </Message>
        <Actions>
          <Button variant="secondary" onClick={() => setIsOpen(false)}>
            Dismiss
          </Button>
        </Actions>
      </Modal>
    </Wrapper>
  );
};
