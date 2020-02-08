import axios from 'axios';
import { parseAxiosError } from '../utils/error';

export const Type = {
  FETCH_POSTS_REQUEST: 'schemas/FETCH_POSTS_REQUEST',
  FETCH_POSTS_SUCCESS: 'schemas/FETCH_POSTS_SUCCESS',
  FETCH_POSTS_FAILURE: 'schemas/FETCH_POSTS_FAILURE',
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
