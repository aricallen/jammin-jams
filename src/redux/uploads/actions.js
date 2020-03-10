import axios from 'axios';
import { parseAxiosError } from '../utils/error';

export const Type = {
  CREATE_MANY_REQUESTED: 'uploads/CREATE_MANY_REQUESTED',
  CREATE_MANY_SUCCEEDED: 'uploads/CREATE_MANY_SUCCEEDED',
  CREATE_MANY_FAILED: 'uploads/CREATE_MANY_FAILED',

  FETCH_MANY_REQUESTED: 'uploads/FETCH_MANY_REQUESTED',
  FETCH_MANY_SUCCEEDED: 'uploads/FETCH_MANY_SUCCEEDED',
  FETCH_MANY_FAILED: 'uploads/FETCH_MANY_FAILED',

  FETCH_ONE_REQUESTED: 'uploads/FETCH_ONE_REQUESTED',
  FETCH_ONE_SUCCEEDED: 'uploads/FETCH_ONE_SUCCEEDED',
  FETCH_ONE_FAILED: 'uploads/FETCH_ONE_FAILED',

  UPDATE_ONE_REQUESTED: 'uploads/UPDATE_ONE_REQUESTED',
  UPDATE_ONE_SUCCEEDED: 'uploads/UPDATE_ONE_SUCCEEDED',
  UPDATE_ONE_FAILED: 'uploads/UPDATE_ONE_FAILED',

  DELETE_ONE_REQUESTED: 'uploads/DELETE_ONE_REQUESTED',
  DELETE_ONE_SUCCEEDED: 'uploads/DELETE_ONE_SUCCEEDED',
  DELETE_ONE_FAILED: 'uploads/DELETE_ONE_FAILED',
};

const adapter = axios.create({
  headers: {
    'Content-Type': 'multipart/form-data; boundary=---XXX---',
  },
});

export const createMany = (formData) => {
  return async (dispatch) => {
    dispatch({ type: Type.CREATE_MANY_REQUESTED });
    try {
      const response = await adapter.post('/api/admin/uploads', formData);
      dispatch({ type: Type.CREATE_MANY_SUCCEEDED, uploads: response.data.data });
      return response.data.data;
    } catch (err) {
      dispatch({ type: Type.CREATE_MANY_FAILED, error: parseAxiosError(err) });
      throw err;
    }
  };
};

export const fetchMany = () => {
  return async (dispatch) => {
    dispatch({ type: Type.FETCH_MANY_REQUESTED });
    try {
      const response = await axios.get(`/api/admin/uploads`);
      dispatch({ type: Type.FETCH_MANY_SUCCEEDED, uploads: response.data.data });
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
      const response = await axios.get(`/api/admin/uploads/${id}`);
      dispatch({ type: Type.FETCH_ONE_SUCCEEDED, upload: response.data.data });
      return response.data.data;
    } catch (err) {
      dispatch({ type: Type.FETCH_ONE_FAILED, error: parseAxiosError(err) });
      throw err;
    }
  };
};

export const updateOne = (id, values) => {
  return async (dispatch) => {
    dispatch({ type: Type.UPDATE_ONE_REQUESTED });
    try {
      const response = await axios.put(`/api/admin/uploads/${id}`, values);
      dispatch({ type: Type.UPDATE_ONE_SUCCEEDED, upload: response.data.data });
      return response.data.data;
    } catch (err) {
      dispatch({ type: Type.UPDATE_ONE_FAILED, error: parseAxiosError(err) });
      throw err;
    }
  };
};

export const deleteOne = (id) => {
  return async (dispatch) => {
    dispatch({ type: Type.DELETE_ONE_REQUESTED });
    try {
      const response = await axios.delete(`/api/admin/uploads/${id}`);
      dispatch({ type: Type.DELETE_ONE_SUCCEEDED, uploads: response.data.data });
      return response.data.data;
    } catch (err) {
      dispatch({ type: Type.DELETE_ONE_FAILED, error: parseAxiosError(err) });
      throw err;
    }
  };
};
