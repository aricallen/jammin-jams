import React, { useEffect, Fragment } from 'react';
import styled from '@emotion/styled';
import { Link } from 'react-router-dom';
import { useSelector, useDispatch } from 'react-redux';
import { fetchMany as fetchPosts } from '../../../redux/posts/actions';
import { isResolved } from '../../../redux/utils/meta-status';
import { Spinner } from '../../common/Spinner';
import { Blurb } from './Blurb';
import { Header1, Emoji } from '../../common/Structure';
import { Article } from '../../common/Article';
import { spacing } from '../../../constants/style-guide';

const Wrapper = styled('div')``;
const IntroText = styled('div')`
  margin-bottom: ${spacing.double}px;
`;

const BlurbList = ({ posts, isBusy }) => {
  if (isBusy) {
    return <Spinner variant="large" />;
  }
  return posts.map((post) => <Blurb key={post.id} post={post} />);
};

const Intro = () => {
  return (
    <Fragment>
      <Header1>Jam Journeys</Header1>
      <IntroText>
        Here is the latest from <Link to="/posts">Jam Journeys</Link> featuring the latest{' '}
        <Link to="/store">Jam of the Month</Link> DJ set. <br />
        Enjoy <Emoji label="headphones">🎧</Emoji>.
      </IntroText>
    </Fragment>
  );
};

export const Blog = () => {
  const dispatch = useDispatch();
  const postsState = useSelector((state) => state.posts);

  const _fetchPosts = () => {
    dispatch(fetchPosts());
  };
  useEffect(_fetchPosts, []);

  return (
    <Article
      Middle={() => (
        <Wrapper>
          <Intro />
          <BlurbList posts={postsState.data} isBusy={!isResolved(postsState.meta.many)} />
        </Wrapper>
      )}
    />
  );
};
