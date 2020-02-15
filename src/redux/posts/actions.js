import axios from 'axios';
import { parseAxiosError } from '../utils/error';

export const Type = {
  FETCH_POSTS_REQUEST: 'posts/FETCH_POSTS_REQUEST',
  FETCH_POSTS_SUCCESS: 'posts/FETCH_POSTS_SUCCESS',
  FETCH_POSTS_FAILURE: 'posts/FETCH_POSTS_FAILURE',

  FETCH_POST_REQUEST: 'posts/FETCH_POST_REQUEST',
  FETCH_POST_SUCCESS: 'posts/FETCH_POST_SUCCESS',
  FETCH_POST_FAILURE: 'posts/FETCH_POST_FAILURE',

  SAVE_POST_REQUEST: 'posts/SAVE_POST_REQUEST',
  SAVE_POST_SUCCESS: 'posts/SAVE_POST_SUCCESS',
  SAVE_POST_FAILURE: 'posts/SAVE_POST_FAILURE',
};

export const fetchPosts = () => {
  return async (dispatch) => {
    dispatch({ type: Type.FETCH_POSTS_REQUEST });
    try {
      const response = await axios.get(`/api/admin/posts`);
      dispatch({ type: Type.FETCH_POSTS_SUCCESS, posts: response.data.data });
      return response.data.data;
    } catch (err) {
      dispatch({ type: Type.FETCH_POSTS_FAILURE, error: parseAxiosError(err) });
      throw err;
    }
  };
};

export const fetchPost = (id) => {
  return async (dispatch) => {
    dispatch({ type: Type.FETCH_POST_REQUEST });
    try {
      const response = await axios.get(`/api/admin/posts/${id}`);
      dispatch({ type: Type.FETCH_POST_SUCCESS, post: response.data.data });
      return response.data.data;
    } catch (err) {
      dispatch({ type: Type.FETCH_POST_FAILURE, error: parseAxiosError(err) });
      throw err;
    }
  };
};

export const savePost = (post) => {
  return async (dispatch) => {
    dispatch({ type: Type.SAVE_POST_REQUEST });
    try {
      const isNew = post.id === undefined;
      const save = () => {
        if (isNew) {
          return axios.post('/api/admin/posts', post);
        }
        return axios.put(`/api/admin/posts/${post.id}`, post);
      };
      const response = await save();
      dispatch({ type: Type.SAVE_POST_SUCCESS, post: response.data.data });
      return response.data.data;
    } catch (err) {
      dispatch({ type: Type.SAVE_POST_FAILURE, error: parseAxiosError(err) });
      throw err;
    }
  };
};
