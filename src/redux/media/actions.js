import axios from 'axios';
import { parseAxiosError } from '../utils/error';

export const Type = {
  CREATE_MANY_REQUESTED: 'media/CREATE_MANY_REQUESTED',
  CREATE_MANY_SUCCEEDED: 'media/CREATE_MANY_SUCCEEDED',
  CREATE_MANY_FAILED: 'media/CREATE_MANY_FAILED',

  FETCH_MANY_MEDIA_REQUESTED: 'media/FETCH_MANY_MEDIA_REQUESTED',
  FETCH_MANY_MEDIA_SUCCEEDED: 'media/FETCH_MANY_MEDIA_SUCCEEDED',
  FETCH_MANY_MEDIA_FAILED: 'media/FETCH_MANY_MEDIA_FAILED',

  FETCH_ONE_MEDIA_REQUESTED: 'media/FETCH_ONE_MEDIA_REQUESTED',
  FETCH_ONE_MEDIA_SUCCEEDED: 'media/FETCH_ONE_MEDIA_SUCCEEDED',
  FETCH_ONE_MEDIA_FAILED: 'media/FETCH_ONE_MEDIA_FAILED',

  UPDATE_ONE_REQUESTED: 'media/UPDATE_ONE_REQUESTED',
  UPDATE_ONE_SUCCEEDED: 'media/UPDATE_ONE_SUCCEEDED',
  UPDATE_ONE_FAILED: 'media/UPDATE_ONE_FAILED',

  DELETE_ONE_REQUESTED: 'media/DELETE_ONE_REQUESTED',
  DELETE_ONE_SUCCEEDED: 'media/DELETE_ONE_SUCCEEDED',
  DELETE_ONE_FAILED: 'media/DELETE_ONE_FAILED',
};

export const uploadMedia = (fileData) => {
  return async (dispatch) => {
    dispatch({ type: Type.CREATE_MANY_REQUESTED });
    try {
      const response = await axios.post('/api/admin/media', fileData);
      dispatch({ type: Type.CREATE_MANY_SUCCEEDED, media: response.data.data });
      return response.data.data;
    } catch (err) {
      dispatch({ type: Type.CREATE_MANY_FAILED, error: parseAxiosError(err) });
      throw err;
    }
  };
};

export const fetchAllMedia = () => {
  return async (dispatch) => {
    dispatch({ type: Type.FETCH_MANY_MEDIA_REQUESTED });
    try {
      const response = await axios.get(`/api/admin/media`);
      dispatch({ type: Type.FETCH_MANY_MEDIA_SUCCEEDED, media: response.data.data });
      return response.data.data;
    } catch (err) {
      dispatch({ type: Type.FETCH_MANY_MEDIA_FAILED, error: parseAxiosError(err) });
      throw err;
    }
  };
};

export const fetchMedia = (id) => {
  return async (dispatch) => {
    dispatch({ type: Type.FETCH_ONE_MEDIA_REQUESTED });
    try {
      const response = await axios.get(`/api/admin/media/${id}`);
      dispatch({ type: Type.FETCH_ONE_MEDIA_SUCCEEDED, media: response.data.data });
      return response.data.data;
    } catch (err) {
      dispatch({ type: Type.FETCH_ONE_MEDIA_FAILED, error: parseAxiosError(err) });
      throw err;
    }
  };
};

export const updateMedia = (id, values) => {
  return async (dispatch) => {
    dispatch({ type: Type.UPDATE_ONE_REQUESTED });
    try {
      const response = await axios.get(`/api/admin/media/${id}`, values);
      dispatch({ type: Type.UPDATE_ONE_SUCCEEDED, media: response.data.data });
      return response.data.data;
    } catch (err) {
      dispatch({ type: Type.UPDATE_ONE_FAILED, error: parseAxiosError(err) });
      throw err;
    }
  };
};

export const deleteMedia = (id) => {
  return async (dispatch) => {
    dispatch({ type: Type.DELETE_ONE_REQUESTED });
    try {
      const response = await axios.delete(`/api/admin/media/${id}`);
      dispatch({ type: Type.DELETE_ONE_SUCCEEDED, media: response.data.data });
      return response.data.data;
    } catch (err) {
      dispatch({ type: Type.DELETE_ONE_FAILED, error: parseAxiosError(err) });
      throw err;
    }
  };
};
