import React, { useEffect, useState, Fragment } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { Editor } from './Editor';
import { Button } from '../../../common/Button';
import { Header } from '../Header';
import { isBusy, isResolved } from '../../../../utils/meta-status';
import { createOne, updateOne, fetchOne } from '../../../../redux/posts/actions';
import { Spinner } from '../../../common/Spinner';

export const EditPage = ({ history, match }) => {
  const dispatch = useDispatch();
  const postsState = useSelector((state) => state.posts);
  const defaultPost = {
    title: '',
    content: '',
    status: 'DRAFT',
    excerpt: '',
    setLink: '',
    uploadsId: null,
  };
  const [post, setPost] = useState(defaultPost);

  const { postId } = match.params;
  const isExisting = postId !== undefined;

  const fetch = () => {
    if (isExisting) {
      dispatch(fetchOne(postId));
    }
  };
  useEffect(fetch, []);

  if (isResolved(postsState.meta.one)) {
    const existingPost = postsState.data.find((p) => p.id === +postId);
    if (existingPost && post.id !== existingPost.id) {
      setPost(existingPost);
    }
  }

  const onChange = (postValues) => setPost(postValues);

  const cancelCreate = () => {
    history.push('/admin/posts');
  };

  const onSavePost = async () => {
    if (isExisting) {
      await dispatch(updateOne(post));
    } else {
      await dispatch(createOne(post));
    }
    history.push('/admin/posts');
  };

  return (
    <Fragment>
      <Header
        title={isExisting ? 'Edit Post' : 'New Post'}
        Controls={() => (
          <Fragment>
            <Button
              variant="secondary"
              onClick={cancelCreate}
              isDisabled={isBusy(postsState.meta.one)}
            >
              Cancel
            </Button>
            <Button onClick={onSavePost} isBusy={isBusy(postsState.meta.one)}>
              Save
            </Button>
          </Fragment>
        )}
      />
      {isBusy(postsState.meta.one) ? (
        <Spinner variant="large" />
      ) : (
        <Editor post={post} onChange={onChange} />
      )}
    </Fragment>
  );
};
