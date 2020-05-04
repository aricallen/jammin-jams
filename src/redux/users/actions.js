import axios from 'axios';
import { omit } from 'lodash';
import { parseAxiosError } from '../utils/error';

export const Type = {
  CREATE_ONE_REQUESTED: 'users/CREATE_ONE_REQUESTED',
  CREATE_ONE_SUCCEEDED: 'users/CREATE_ONE_SUCCEEDED',
  CREATE_ONE_FAILED: 'users/CREATE_ONE_FAILED',

  UPDATE_ONE_REQUESTED: 'users/UPDATE_ONE_REQUESTED',
  UPDATE_ONE_SUCCEEDED: 'users/UPDATE_ONE_SUCCEEDED',
  UPDATE_ONE_FAILED: 'users/UPDATE_ONE_FAILED',

  FETCH_MANY_REQUESTED: 'users/FETCH_MANY_REQUESTED',
  FETCH_MANY_SUCCEEDED: 'users/FETCH_MANY_SUCCEEDED',
  FETCH_MANY_FAILED: 'users/FETCH_MANY_FAILED',
};

export const createOne = (data) => {
  return async (dispatch) => {
    dispatch({ type: Type.CREATE_ONE_REQUESTED });
    try {
      const response = await axios.post(`/api/users`, data);
      const user = response.data.data;
      dispatch({ type: Type.CREATE_ONE_SUCCEEDED, user });
      return user;
    } catch (err) {
      dispatch({ type: Type.CREATE_ONE_FAILED, error: parseAxiosError(err) });
      throw err;
    }
  };
};

export const updateOne = (values) => {
  return async (dispatch) => {
    dispatch({ type: Type.UPDATE_ONE_REQUESTED });
    try {
      const response = await axios.put(`/api/admin/users/${values.id}`, omit(values, ['isAdmin']));
      const user = response.data.data;
      dispatch({ type: Type.UPDATE_ONE_SUCCEEDED, user });
      return user;
    } catch (err) {
      dispatch({ type: Type.UPDATE_ONE_FAILED, error: parseAxiosError(err) });
      throw err;
    }
  };
};

export const fetchMany = () => {
  return async (dispatch) => {
    dispatch({ type: Type.FETCH_MANY_REQUESTED });
    try {
      const response = await axios.get(`/api/admin/users`);
      const users = response.data.data;
      dispatch({ type: Type.FETCH_MANY_SUCCEEDED, users });
      return users;
    } catch (err) {
      dispatch({ type: Type.FETCH_MANY_FAILED, error: parseAxiosError(err) });
      throw err;
    }
  };
};
