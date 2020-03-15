import axios from 'axios';
import { parseAxiosError } from '../utils/error';

export const Type = {
  SIGN_IN_REQUESTED: 'session/SIGN_IN_REQUESTED',
  SIGN_IN_SUCCEEDED: 'session/SIGN_IN_SUCCEEDED',
  SIGN_IN_FAILED: 'session/SIGN_IN_FAILED',

  SIGN_OUT_REQUESTED: 'session/SIGN_OUT_REQUESTED',
  SIGN_OUT_SUCCEEDED: 'session/SIGN_OUT_SUCCEEDED',
  SIGN_OUT_FAILED: 'session/SIGN_OUT_FAILED',

  CREATE_SESSION_REQUESTED: 'session/CREATE_SESSION_REQUESTED',
  CREATE_SESSION_SUCCEEDED: 'session/CREATE_SESSION_SUCCEEDED',
  CREATE_SESSION_FAILED: 'session/CREATE_SESSION_FAILED',

  FETCH_SESSION_REQUESTED: 'session/FETCH_SESSION_REQUESTED',
  FETCH_SESSION_SUCCEEDED: 'session/FETCH_SESSION_SUCCEEDED',
  FETCH_SESSION_FAILED: 'session/FETCH_SESSION_FAILED',
};

export const logInUser = ({ email, password }) => {
  return async (dispatch) => {
    dispatch({ type: Type.SIGN_IN_REQUESTED });
    try {
      const response = await axios.post('/api/sign-in', { email, password, key: 'user' });
      const user = response.data.data;
      dispatch({ type: Type.SIGN_IN_SUCCEEDED, user });
      return user;
    } catch (err) {
      dispatch({ type: Type.SIGN_IN_FAILED, error: parseAxiosError(err) });
      throw err;
    }
  };
};

export const logOutUser = () => {
  return async (dispatch) => {
    dispatch({ type: Type.SIGN_OUT_REQUESTED });
    try {
      await axios.post('/api/log-out');
      dispatch({ type: Type.SIGN_OUT_SUCCEEDED, user: null });
      return null;
    } catch (err) {
      dispatch({ type: Type.SIGN_OUT_FAILED, error: parseAxiosError(err) });
      throw err;
    }
  };
};

export const fetchSession = () => {
  return async (dispatch) => {
    dispatch({ type: Type.FETCH_SESSION_REQUESTED });
    try {
      const response = await axios.get(`/api/session`);
      dispatch({ type: Type.FETCH_SESSION_SUCCEEDED, data: response.data.data });
    } catch (err) {
      dispatch({ type: Type.FETCH_SESSION_FAILED, error: parseAxiosError(err) });
      throw err;
    }
  };
};
