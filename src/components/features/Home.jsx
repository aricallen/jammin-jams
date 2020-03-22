import React, { useState, useRef, useLayoutEffect, useEffect, Fragment } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { Link } from 'react-router-dom';
import styled from '@emotion/styled';
import { LogoFilled } from '../common/LogoFilled';
import { Section, Emoji } from '../common/Structure';
import { Spinner } from '../common/Spinner';
import { Introduction } from './about/Introduction';
import { CameraRoll } from '../common/CameraRoll';
import { Article } from '../common/Article';
import { Blurb } from './blog/Blurb';
import { ExpandableSection } from '../common/ExpandableSection';
import { HowItWorksList } from './about/HowItWorks';
import { fetchMany as fetchPosts } from '../../redux/posts/actions';
import { isResolved } from '../../redux/utils/meta-status';
import * as SessionStorage from '../../utils/session-storage';

const ANIMATION_TIMEOUT = 1000 * 60 * 15; // 15 mins
const ANIMATION_STORAGE_KEY = 'homeAnimationDisabledUntil';

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

const MainContentWrapper = styled('div')`
  animation: fade-in 0.5s 1;
`;

const BlurbIntroText = styled('div')``;

const BlurbIntro = () => {
  return (
    <BlurbIntroText>
      Here is the latest from <Link to="/posts">Jam Journeys</Link> featuring the latest{' '}
      <Link to="/store">Jam of the Month</Link> DJ set. <br />
      Enjoy <Emoji label="headphones">🎧</Emoji>.
    </BlurbIntroText>
  );
};

const JamJourneysSection = ({ post, isBusy }) => {
  if (isBusy) {
    return <Spinner />;
  }
  return (
    <ExpandableSection
      headerText="Jam Journeys"
      Content={() => (
        <Fragment>
          <BlurbIntro />
          <Blurb post={post} />
        </Fragment>
      )}
    />
  );
};

const MainContent = () => {
  const dispatch = useDispatch();
  const postsState = useSelector((state) => state.posts);

  const latestPost = postsState.data[0];
  const _fetchPosts = () => {
    if (!latestPost) {
      dispatch(fetchPosts());
    }
  };
  useEffect(_fetchPosts, []);

  return (
    <MainContentWrapper>
      <Section style={{ marginTop: 0 }}>
        <Introduction />
      </Section>
      <Section>
        <ExpandableSection headerText="How It Works" Content={HowItWorksList} />
      </Section>
      <Section>
        <JamJourneysSection post={latestPost} isBusy={!isResolved(postsState.meta.many)} />
      </Section>
    </MainContentWrapper>
  );
};

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
        <Hero ref={heroRef} className={isBumping ? 'is-bumping' : 'done-bumping'}>
          <LogoWrapper>
            <LogoFilled className="grooving" />
          </LogoWrapper>
        </Hero>
      </Wrapper>
    );
  }

  return (
    <Wrapper>
      <CameraRoll />
      <Article Middle={MainContent} />
    </Wrapper>
  );
};
