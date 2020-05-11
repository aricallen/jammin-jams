import React, { useEffect, Fragment } from 'react';
import styled from '@emotion/styled';
import { Link } from 'react-router-dom';
import { useSelector, useDispatch } from 'react-redux';
import { fetchMany as fetchPosts } from '../../../redux/posts/actions';
import { isBusy, isInitial } from '../../../utils/meta-status';
import { Spinner } from '../../common/Spinner';
import { Blurb } from './Blurb';
import { Header1, Emoji } from '../../common/Structure';
import { Article } from '../../common/Article';
import { spacing } from '../../../constants/style-guide';
import { isLive } from '../../../utils/post-helpers';
import { setMetaTags } from '../../../utils/set-meta-tags';

const Wrapper = styled('div')``;
const IntroText = styled('div')`
  margin-bottom: ${spacing.double}px;
`;

const Intro = () => {
  return (
    <Fragment>
      <Header1>Jam Journeys</Header1>
      <IntroText>
        Here is the latest from <Link to="/jam-journeys">Jam Journeys</Link> featuring the latest{' '}
        <Link to="/p/store">Jam of the Month</Link> DJ set. <br />
        Enjoy <Emoji label="headphones">🎧</Emoji>.
      </IntroText>
    </Fragment>
  );
};

export const Blog = () => {
  const dispatch = useDispatch();
  const postsState = useSelector((state) => state.posts);

  const _fetchPosts = () => {
    if (isInitial(postsState.meta.many) && postsState.data.length === 0) {
      dispatch(fetchPosts());
    }
  };
  useEffect(_fetchPosts, []);

  useEffect(() => {
    setMetaTags('/jam-journeys');
  }, []);

  const livePosts = postsState.data.filter(isLive);

  if (isBusy(postsState.meta.many)) {
    return <Spinner variant="large" />;
  }

  return (
    <Article
      Middle={() => (
        <Wrapper>
          <Intro />
          {livePosts.map((post) => (
            <Blurb key={post.id} post={post} />
          ))}
        </Wrapper>
      )}
    />
  );
};
