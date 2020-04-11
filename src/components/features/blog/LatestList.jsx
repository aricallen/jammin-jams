import React, { useEffect } from 'react';
import styled from '@emotion/styled';
import { Link } from 'react-router-dom';
import { useDispatch, useSelector } from 'react-redux';
import { Blurb } from './Blurb';
import { fetchMany as fetchPosts } from '../../../redux/posts/actions';
import { isResolved, isBusy, isInitial } from '../../../redux/utils/meta-status';
import { Spinner } from '../../common/Spinner';
import { Emoji, Emphasis } from '../../common/Structure';
import { spacing } from '../../../constants/style-guide';
import { isLive } from '../../../utils/post-helpers';

const Wrapper = styled('div')``;

const BlurbIntroText = styled('div')``;

const Message = styled('div')`
  text-align: center;
  padding: ${spacing.double}px;
`;

const BlurbIntro = () => {
  return (
    <BlurbIntroText>
      Here is the latest from <Link to="/posts">Jam Journeys</Link> featuring the latest{' '}
      <Link to="/store">Jam of the Month</Link> DJ set. <br />
      Enjoy <Emoji label="headphones">🎧</Emoji>.
    </BlurbIntroText>
  );
};

const BlurbList = ({ posts }) => {
  if (posts.length === 0) {
    return (
      <Message>
        <Emphasis>Coming soon!</Emphasis>
      </Message>
    );
  }
  return posts.map((post) => <Blurb key={post.title} post={post} />);
};

export const LatestList = () => {
  const dispatch = useDispatch();
  const postsState = useSelector((state) => state.posts);

  const latestPosts = postsState.data.filter(isLive).slice(0, 5) || [];
  const _fetchPosts = () => {
    if (isInitial(postsState.meta.many) && postsState.data.length === 0) {
      dispatch(fetchPosts());
    }
  };
  useEffect(_fetchPosts, []);

  return (
    <Wrapper>
      <BlurbIntro />
      <BlurbList posts={latestPosts} />
    </Wrapper>
  );
};
