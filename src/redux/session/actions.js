import axios from 'axios';
import { parseAxiosError } from '../utils/error';

export const Type = {
  LOGIN_REQUEST: 'session/LOGIN_REQUEST',
  LOGIN_SUCCESS: 'session/LOGIN_SUCCESS',
  LOGIN_FAILURE: 'session/LOGIN_FAILURE',
};

export const loginUser = ({ email, password }) => {
  return async dispatch => {
    dispatch({ type: Type.LOGIN_REQUEST });
    try {
      const response = await axios.post('/api/login', { email, password });
      const user = response.data.data;
      dispatch({ type: Type.LOGIN_SUCCESS, user });
      return user;
    } catch (err) {
      dispatch({ type: Type.LOGIN_FAILURE, error: parseAxiosError(err) });
      throw err;
    }
  };
};
