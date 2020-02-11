import axios from 'axios';
import { parseAxiosError } from '../utils/error';

export const Type = {
  UPLOAD_MEDIA_REQUEST: 'schemas/UPLOAD_MEDIA_REQUEST',
  UPLOAD_MEDIA_SUCCESS: 'schemas/UPLOAD_MEDIA_SUCCESS',
  UPLOAD_MEDIA_FAILURE: 'schemas/UPLOAD_MEDIA_FAILURE',

  FETCH_ALL_MEDIA_REQUEST: 'schemas/FETCH_ALL_MEDIA_REQUEST',
  FETCH_ALL_MEDIA_SUCCESS: 'schemas/FETCH_ALL_MEDIA_SUCCESS',
  FETCH_ALL_MEDIA_FAILURE: 'schemas/FETCH_ALL_MEDIA_FAILURE',

  FETCH_ONE_MEDIA_REQUEST: 'schemas/FETCH_ONE_MEDIA_REQUEST',
  FETCH_ONE_MEDIA_SUCCESS: 'schemas/FETCH_ONE_MEDIA_SUCCESS',
  FETCH_ONE_MEDIA_FAILURE: 'schemas/FETCH_ONE_MEDIA_FAILURE',

  UPDATE_MEDIA_REQUEST: 'schemas/UPDATE_MEDIA_REQUEST',
  UPDATE_MEDIA_SUCCESS: 'schemas/UPDATE_MEDIA_SUCCESS',
  UPDATE_MEDIA_FAILURE: 'schemas/UPDATE_MEDIA_FAILURE',

  DELETE_MEDIA_REQUEST: 'schemas/DELETE_MEDIA_REQUEST',
  DELETE_MEDIA_SUCCESS: 'schemas/DELETE_MEDIA_SUCCESS',
  DELETE_MEDIA_FAILURE: 'schemas/DELETE_MEDIA_FAILURE',
};

export const uploadMedia = (fileData) => {
  return async (dispatch) => {
    dispatch({ type: Type.FETCH_ALL_MEDIA_REQUEST });
    try {
      const response = await axios.post('/api/admin/media', fileData);
      dispatch({ type: Type.FETCH_ALL_MEDIA_SUCCESS, media: response.data.data });
      return response.data.data;
    } catch (err) {
      dispatch({ type: Type.FETCH_ALL_MEDIA_FAILURE, error: parseAxiosError(err) });
      throw err;
    }
  };
};

export const fetchAllMedia = () => {
  return async (dispatch) => {
    dispatch({ type: Type.FETCH_ALL_MEDIA_REQUEST });
    try {
      const response = await axios.get(`/api/admin/media`);
      dispatch({ type: Type.FETCH_ALL_MEDIA_SUCCESS, media: response.data.data });
      return response.data.data;
    } catch (err) {
      dispatch({ type: Type.FETCH_ALL_MEDIA_FAILURE, error: parseAxiosError(err) });
      throw err;
    }
  };
};

export const fetchMedia = (id) => {
  return async (dispatch) => {
    dispatch({ type: Type.FETCH_ONE_MEDIA_REQUEST });
    try {
      const response = await axios.get(`/api/admin/media/${id}`);
      dispatch({ type: Type.FETCH_ONE_MEDIA_SUCCESS, media: response.data.data });
      return response.data.data;
    } catch (err) {
      dispatch({ type: Type.FETCH_ONE_MEDIA_FAILURE, error: parseAxiosError(err) });
      throw err;
    }
  };
};

export const updateMedia = (id, values) => {
  return async (dispatch) => {
    dispatch({ type: Type.UPDATE_MEDIA_REQUEST });
    try {
      const response = await axios.get(`/api/admin/media/${id}`, values);
      dispatch({ type: Type.UPDATE_MEDIA_SUCCESS, media: response.data.data });
      return response.data.data;
    } catch (err) {
      dispatch({ type: Type.UPDATE_MEDIA_FAILURE, error: parseAxiosError(err) });
      throw err;
    }
  };
};

export const deleteMedia = (id) => {
  return async (dispatch) => {
    dispatch({ type: Type.DELETE_MEDIA_REQUEST });
    try {
      const response = await axios.delete(`/api/admin/media/${id}`);
      dispatch({ type: Type.DELETE_MEDIA_SUCCESS, media: response.data.data });
      return response.data.data;
    } catch (err) {
      dispatch({ type: Type.DELETE_MEDIA_FAILURE, error: parseAxiosError(err) });
      throw err;
    }
  };
};
