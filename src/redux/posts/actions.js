import axios from 'axios';
import { parseAxiosError } from '../utils/error';
import { fetchOne as fetchUpload } from '../uploads/actions';

export const Type = {
  FETCH_MANY_REQUESTED: 'posts/FETCH_MANY_REQUESTED',
  FETCH_MANY_SUCCEEDED: 'posts/FETCH_MANY_SUCCEEDED',
  FETCH_MANY_FAILED: 'posts/FETCH_MANY_FAILED',

  FETCH_ONE_REQUESTED: 'posts/FETCH_ONE_REQUESTED',
  FETCH_ONE_SUCCEEDED: 'posts/FETCH_ONE_SUCCEEDED',
  FETCH_ONE_FAILED: 'posts/FETCH_ONE_FAILED',

  CREATE_ONE_REQUESTED: 'posts/CREATE_ONE_REQUESTED',
  CREATE_ONE_SUCCEEDED: 'posts/CREATE_ONE_SUCCEEDED',
  CREATE_ONE_FAILED: 'posts/CREATE_ONE_FAILED',

  UPDATE_ONE_REQUESTED: 'posts/UPDATE_ONE_REQUESTED',
  UPDATE_ONE_SUCCEEDED: 'posts/UPDATE_ONE_SUCCEEDED',
  UPDATE_ONE_FAILED: 'posts/UPDATE_ONE_FAILED',
};

export const fetchMany = () => {
  return async (dispatch) => {
    dispatch({ type: Type.FETCH_MANY_REQUESTED });
    try {
      const response = await axios.get(`/api/admin/posts`);
      dispatch({ type: Type.FETCH_MANY_SUCCEEDED, posts: response.data.data });
      return response.data.data;
    } catch (err) {
      dispatch({ type: Type.FETCH_MANY_FAILED, error: parseAxiosError(err) });
      throw err;
    }
  };
};

export const fetchOne = (id) => {
  return async (dispatch) => {
    dispatch({ type: Type.FETCH_ONE_REQUESTED });
    try {
      const response = await axios.get(`/api/admin/posts/${id}`);
      dispatch({ type: Type.FETCH_ONE_SUCCEEDED, post: response.data.data });
      return response.data.data;
    } catch (err) {
      dispatch({ type: Type.FETCH_ONE_FAILED, error: parseAxiosError(err) });
      throw err;
    }
  };
};

export const updateOne = (post) => {
  return async (dispatch) => {
    dispatch({ type: Type.UPDATE_ONE_REQUESTED });
    try {
      const response = await axios.put(`/api/admin/posts/${post.id}`, post);
      dispatch({ type: Type.UPDATE_ONE_SUCCEEDED, post: response.data.data });
      return response.data.data;
    } catch (err) {
      dispatch({ type: Type.UPDATE_ONE_FAILED, error: parseAxiosError(err) });
      throw err;
    }
  };
};

export const createOne = (post) => {
  return async (dispatch) => {
    dispatch({ type: Type.CREATE_ONE_REQUESTED });
    try {
      const response = await axios.post('/api/admin/posts', post);
      dispatch({ type: Type.CREATE_ONE_SUCCEEDED, post: response.data.data });
      return response.data.data;
    } catch (err) {
      dispatch({ type: Type.CREATE_ONE_FAILED, error: parseAxiosError(err) });
      throw err;
    }
  };
};

/**
 * fetches both a post and the associated upload
 */
export const fetchPostContent = (postId) => {
  return async (dispatch) => {
    const post = await dispatch(fetchOne(postId));
    if (post.uploadsId) {
      const upload = await dispatch(fetchUpload(post.uploadsId));
      return {
        ...post,
        upload,
      };
    }
    return { post, upload: null };
  };
};
