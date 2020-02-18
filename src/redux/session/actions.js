import axios from 'axios';
import { parseAxiosError } from '../utils/error';

export const Type = {
  LOG_IN_REQUESTED: 'session/LOG_IN_REQUESTED',
  LOG_IN_SUCCEEDED: 'session/LOG_IN_SUCCEEDED',
  LOG_IN_FAILED: 'session/LOG_IN_FAILED',

  LOG_OUT_REQUESTED: 'session/LOG_OUT_REQUESTED',
  LOG_OUT_SUCCEEDED: 'session/LOG_OUT_SUCCEEDED',
  LOG_OUT_FAILED: 'session/LOG_OUT_FAILED',

  CREATE_SESSION_REQUESTED: 'session/CREATE_SESSION_REQUESTED',
  CREATE_SESSION_SUCCEEDED: 'session/CREATE_SESSION_SUCCEEDED',
  CREATE_SESSION_FAILED: 'session/CREATE_SESSION_FAILED',

  FETCH_SESSION_REQUESTED: 'session/FETCH_SESSION_REQUESTED',
  FETCH_SESSION_SUCCEEDED: 'session/FETCH_SESSION_SUCCEEDED',
  FETCH_SESSION_FAILED: 'session/FETCH_SESSION_FAILED',
};

export const logInUser = ({ email, password }) => {
  return async (dispatch) => {
    dispatch({ type: Type.LOG_IN_REQUESTED });
    try {
      const response = await axios.post('/api/log-in', { email, password, key: 'user' });
      const user = response.data.data;
      dispatch({ type: Type.LOG_IN_SUCCEEDED, user });
      return user;
    } catch (err) {
      dispatch({ type: Type.LOG_IN_FAILED, error: parseAxiosError(err) });
      throw err;
    }
  };
};

export const logOutUser = () => {
  return async (dispatch) => {
    dispatch({ type: Type.LOG_OUT_REQUESTED });
    try {
      await axios.post('/api/log-out');
      dispatch({ type: Type.LOG_OUT_SUCCEEDED, user: null });
      return null;
    } catch (err) {
      dispatch({ type: Type.LOG_OUT_FAILED, error: parseAxiosError(err) });
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
