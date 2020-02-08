import axios from 'axios';
import { stringify } from 'query-string';
import { parseAxiosError } from '../utils/error';

export const Type = {
  LOGIN_REQUEST: 'session/LOGIN_REQUEST',
  LOGIN_SUCCESS: 'session/LOGIN_SUCCESS',
  LOGIN_FAILURE: 'session/LOGIN_FAILURE',

  CREATE_SESSION_REQUEST: 'session/CREATE_SESSION_REQUEST',
  CREATE_SESSION_SUCCESS: 'session/CREATE_SESSION_SUCCESS',
  CREATE_SESSION_FAILURE: 'session/CREATE_SESSION_FAILURE',

  FETCH_SESSION_REQUEST: 'session/FETCH_SESSION_REQUEST',
  FETCH_SESSION_SUCCESS: 'session/FETCH_SESSION_SUCCESS',
  FETCH_SESSION_FAILURE: 'session/FETCH_SESSION_FAILURE',
};

export const loginUser = ({ email, password }) => {
  return async (dispatch) => {
    dispatch({ type: Type.LOGIN_REQUEST });
    try {
      const response = await axios.post('/api/login', { email, password, key: 'user' });
      const user = response.data.data;
      dispatch({ type: Type.LOGIN_SUCCESS, user });
      return user;
    } catch (err) {
      dispatch({ type: Type.LOGIN_FAILURE, error: parseAxiosError(err) });
      throw err;
    }
  };
};

export const createSession = ({ data, key }) => {
  return async (dispatch) => {
    dispatch({ type: Type.CREATE_SESSION_REQUEST });
    try {
      const response = await axios.post('/api/session', { data, key });
      dispatch({ type: Type.CREATE_SESSION_SUCCESS, data: response.data.data, key });
    } catch (err) {
      dispatch({ type: Type.CREATE_SESSION_FAILURE, error: parseAxiosError(err) });
      throw err;
    }
  };
};

export const fetchSession = () => {
  return async (dispatch) => {
    dispatch({ type: Type.FETCH_SESSION_REQUEST });
    try {
      const response = await axios.get(`/api/session`);
      dispatch({ type: Type.FETCH_SESSION_SUCCESS, data: response.data.data });
    } catch (err) {
      dispatch({ type: Type.FETCH_SESSION_FAILURE, error: parseAxiosError(err) });
      throw err;
    }
  };
};
