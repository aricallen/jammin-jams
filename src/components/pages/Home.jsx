import React, { useState, useRef, useLayoutEffect, useEffect } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import styled from '@emotion/styled';
import { LogoFilled } from '../common/LogoFilled';
import { Section } from '../common/Structure';
import { Spinner } from '../common/Spinner';
import { Introduction } from './about/Introduction';
import { CameraRoll } from '../common/CameraRoll';
import { Article } from '../common/Article';
import { Blurb } from './blog/Blurb';
import { ExpandableSection } from '../common/ExpandableSection';
import { HowItWorksList } from './about/HowItWorks';
import { fetchMany as fetchPosts } from '../../redux/posts/actions';
import { isResolved } from '../../redux/utils/meta-status';

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

const JamJourneysSection = ({ post, isBusy }) => {
  if (isBusy) {
    return <Spinner />;
  }
  return (
    <ExpandableSection
      headerText="Jam Journeys"
      defaultIsExpanded={true}
      Content={() => <Blurb post={post} />}
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
      <Section>
        <Introduction />
      </Section>
      <Section>
        <ExpandableSection headerText="How It Works" Content={HowItWorksList} />
      </Section>
      <Section>
        <JamJourneysSection post={latestPost} isBusy={!isResolved(postsState.meta)} />
      </Section>
    </MainContentWrapper>
  );
};

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

  if (isAnimating) {
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
