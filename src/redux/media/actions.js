import axios from 'axios';
import { parseAxiosError } from '../utils/error';

export const Type = {
  UPLOAD_MEDIA_REQUESTED: 'schemas/UPLOAD_MEDIA_REQUESTED',
  UPLOAD_MEDIA_SUCCEEDED: 'schemas/UPLOAD_MEDIA_SUCCEEDED',
  UPLOAD_MEDIA_FAILED: 'schemas/UPLOAD_MEDIA_FAILED',

  FETCH_ALL_MEDIA_REQUESTED: 'schemas/FETCH_ALL_MEDIA_REQUESTED',
  FETCH_ALL_MEDIA_SUCCEEDED: 'schemas/FETCH_ALL_MEDIA_SUCCEEDED',
  FETCH_ALL_MEDIA_FAILED: 'schemas/FETCH_ALL_MEDIA_FAILED',

  FETCH_ONE_MEDIA_REQUESTED: 'schemas/FETCH_ONE_MEDIA_REQUESTED',
  FETCH_ONE_MEDIA_SUCCEEDED: 'schemas/FETCH_ONE_MEDIA_SUCCEEDED',
  FETCH_ONE_MEDIA_FAILED: 'schemas/FETCH_ONE_MEDIA_FAILED',

  UPDATE_MEDIA_REQUESTED: 'schemas/UPDATE_MEDIA_REQUESTED',
  UPDATE_MEDIA_SUCCEEDED: 'schemas/UPDATE_MEDIA_SUCCEEDED',
  UPDATE_MEDIA_FAILED: 'schemas/UPDATE_MEDIA_FAILED',

  DELETE_MEDIA_REQUESTED: 'schemas/DELETE_MEDIA_REQUESTED',
  DELETE_MEDIA_SUCCEEDED: 'schemas/DELETE_MEDIA_SUCCEEDED',
  DELETE_MEDIA_FAILED: 'schemas/DELETE_MEDIA_FAILED',
};

export const uploadMedia = (fileData) => {
  return async (dispatch) => {
    dispatch({ type: Type.FETCH_ALL_MEDIA_REQUESTED });
    try {
      const response = await axios.post('/api/admin/media', fileData);
      dispatch({ type: Type.FETCH_ALL_MEDIA_SUCCEEDED, media: response.data.data });
      return response.data.data;
    } catch (err) {
      dispatch({ type: Type.FETCH_ALL_MEDIA_FAILED, error: parseAxiosError(err) });
      throw err;
    }
  };
};

export const fetchAllMedia = () => {
  return async (dispatch) => {
    dispatch({ type: Type.FETCH_ALL_MEDIA_REQUESTED });
    try {
      const response = await axios.get(`/api/admin/media`);
      dispatch({ type: Type.FETCH_ALL_MEDIA_SUCCEEDED, media: response.data.data });
      return response.data.data;
    } catch (err) {
      dispatch({ type: Type.FETCH_ALL_MEDIA_FAILED, error: parseAxiosError(err) });
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
    dispatch({ type: Type.UPDATE_MEDIA_REQUESTED });
    try {
      const response = await axios.get(`/api/admin/media/${id}`, values);
      dispatch({ type: Type.UPDATE_MEDIA_SUCCEEDED, media: response.data.data });
      return response.data.data;
    } catch (err) {
      dispatch({ type: Type.UPDATE_MEDIA_FAILED, error: parseAxiosError(err) });
      throw err;
    }
  };
};

export const deleteMedia = (id) => {
  return async (dispatch) => {
    dispatch({ type: Type.DELETE_MEDIA_REQUESTED });
    try {
      const response = await axios.delete(`/api/admin/media/${id}`);
      dispatch({ type: Type.DELETE_MEDIA_SUCCEEDED, media: response.data.data });
      return response.data.data;
    } catch (err) {
      dispatch({ type: Type.DELETE_MEDIA_FAILED, error: parseAxiosError(err) });
      throw err;
    }
  };
};
