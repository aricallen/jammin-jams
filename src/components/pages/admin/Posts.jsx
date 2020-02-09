import React, { useEffect } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { isResolved, isInitial } from '../../../redux/utils/meta-status';
import { Spinner } from '../../common/Spinner';
import { fetchPosts } from '../../../redux/posts/actions';
import { Content } from '../../common/Structure';

export const Posts = () => {
  const dispatch = useDispatch();
  const postsState = useSelector((state) => state.posts);

  const fetch = () => {
    if (isInitial(postsState.meta)) {
      dispatch(fetchPosts());
    }
  };
  useEffect(fetch, []);

  if (isResolved(postsState.meta)) {
    return <Content>{JSON.stringify(postsState.data)}</Content>;
  }

  if (!isResolved(postsState.meta)) {
    return <Spinner variant="large" />;
  }
};
