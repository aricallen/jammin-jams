import axios from 'axios';
import { parseAxiosError } from '../utils/error';

export const Type = {
  FETCH_POSTS_REQUESTED: 'posts/FETCH_POSTS_REQUESTED',
  FETCH_POSTS_SUCCEEDED: 'posts/FETCH_POSTS_SUCCEEDED',
  FETCH_POSTS_FAILED: 'posts/FETCH_POSTS_FAILED',

  FETCH_POST_REQUESTED: 'posts/FETCH_POST_REQUESTED',
  FETCH_POST_SUCCEEDED: 'posts/FETCH_POST_SUCCEEDED',
  FETCH_POST_FAILED: 'posts/FETCH_POST_FAILED',

  SAVE_POST_REQUESTED: 'posts/SAVE_POST_REQUESTED',
  SAVE_POST_SUCCEEDED: 'posts/SAVE_POST_SUCCEEDED',
  SAVE_POST_FAILED: 'posts/SAVE_POST_FAILED',
};

export const fetchPosts = () => {
  return async (dispatch) => {
    dispatch({ type: Type.FETCH_POSTS_REQUESTED });
    try {
      const response = await axios.get(`/api/admin/posts`);
      dispatch({ type: Type.FETCH_POSTS_SUCCEEDED, posts: response.data.data });
      return response.data.data;
    } catch (err) {
      dispatch({ type: Type.FETCH_POSTS_FAILED, error: parseAxiosError(err) });
      throw err;
    }
  };
};

export const fetchPost = (id) => {
  return async (dispatch) => {
    dispatch({ type: Type.FETCH_POST_REQUESTED });
    try {
      const response = await axios.get(`/api/admin/posts/${id}`);
      dispatch({ type: Type.FETCH_POST_SUCCEEDED, post: response.data.data });
      return response.data.data;
    } catch (err) {
      dispatch({ type: Type.FETCH_POST_FAILED, error: parseAxiosError(err) });
      throw err;
    }
  };
};

export const savePost = (post) => {
  return async (dispatch) => {
    dispatch({ type: Type.SAVE_POST_REQUESTED });
    try {
      const isNew = post.id === undefined;
      const save = () => {
        if (isNew) {
          return axios.post('/api/admin/posts', post);
        }
        return axios.put(`/api/admin/posts/${post.id}`, post);
      };
      const response = await save();
      dispatch({ type: Type.SAVE_POST_SUCCEEDED, post: response.data.data });
      return response.data.data;
    } catch (err) {
      dispatch({ type: Type.SAVE_POST_FAILED, error: parseAxiosError(err) });
      throw err;
    }
  };
};
