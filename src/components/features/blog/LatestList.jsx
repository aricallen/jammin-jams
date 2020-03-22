import React, { useEffect } from 'react';
import styled from '@emotion/styled';
import { Link } from 'react-router-dom';
import { useDispatch, useSelector } from 'react-redux';
import { Blurb } from './Blurb';
import { fetchMany as fetchPosts } from '../../../redux/posts/actions';
import { isResolved } from '../../../redux/utils/meta-status';
import { Spinner } from '../../common/Spinner';
import { Emoji } from '../../common/Structure';

const Wrapper = styled('div')``;

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

const BlurbList = ({ posts, isBusy }) => {
  if (isBusy) {
    return <Spinner />;
  }
  return posts.map((post) => <Blurb key={post.title} post={post} />);
};

export const LatestList = () => {
  const dispatch = useDispatch();
  const postsState = useSelector((state) => state.posts);

  const latestPosts = postsState.data?.slice(0, 5);
  const _fetchPosts = () => {
    if (!latestPosts || latestPosts.length === 0) {
      dispatch(fetchPosts());
    }
  };
  useEffect(_fetchPosts, []);

  return (
    <Wrapper>
      <BlurbIntro />
      <BlurbList posts={latestPosts} isBusy={!isResolved(postsState.meta.many)} />
    </Wrapper>
  );
};
