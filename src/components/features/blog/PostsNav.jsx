import React, { useEffect } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { Link } from 'react-router-dom';
import styled from '@emotion/styled';
import { fetchMany as fetchManyPosts } from '../../../redux/posts/actions';
import * as MetaStatus from '../../../utils/meta-status';
import { DisabledLink } from '../../common/Links';
import { getPostLink } from '../../../utils/post-helpers';
import { Spinner } from '../../common/Spinner';
import { spacing } from '../../../constants/style-guide';

const Wrapper = styled('div')`
  display: flex;
  align-items: center;
  justify-content: space-between;
  padding: ${spacing.double}px;
`;

const LinkWrapper = styled('div')``;

const NavLink = ({ post, text }) => {
  if (!post) {
    return (
      <LinkWrapper>
        <DisabledLink>{text}</DisabledLink>
      </LinkWrapper>
    );
  }
  return (
    <LinkWrapper>
      <Link to={getPostLink(post)}>{text}</Link>
    </LinkWrapper>
  );
};

export const PostsNav = ({ currentPostId }) => {
  const dispatch = useDispatch();
  const postsState = useSelector((state) => state.posts);
  const currentIndex = postsState.data.findIndex((p) => p.id === currentPostId);
  const prevPost = postsState.data[currentIndex - 1];
  const nextPost = postsState.data[currentIndex + 1];

  const _fetchAllPosts = () => {
    if (postsState.data.length === 0 && MetaStatus.isInitial(postsState.meta.many)) {
      dispatch(fetchManyPosts());
    }
  };
  useEffect(_fetchAllPosts, []);

  if (!MetaStatus.isResolved(postsState.meta.many)) {
    return <Spinner />;
  }

  return (
    <Wrapper>
      <NavLink post={prevPost} text="View Previous" />
      <LinkWrapper>
        <Link to="/jam-journeys">View All</Link>
      </LinkWrapper>
      <NavLink post={nextPost} text="View Next" />
    </Wrapper>
  );
};
