import axios from 'axios';
import { parseAxiosError } from '../utils/error';

export const Type = {
  FETCH_REQUESTED: 'app-meta/FETCH_REQUESTED',
  FETCH_SUCCEEDED: 'app-meta/FETCH_SUCCEEDED',
  FETCH_FAILED: 'app-meta/FETCH_FAILED',

  UPDATE_REQUESTED: 'app-meta/UPDATE_REQUESTED',
  UPDATE_SUCCEEDED: 'app-meta/UPDATE_SUCCEEDED',
  UPDATE_FAILED: 'app-meta/UPDATE_FAILED',
};

export const fetch = () => {
  return async (dispatch) => {
    dispatch({ type: Type.FETCH_REQUESTED });
    try {
      const response = await axios.get(`/api/app-meta`);
      const appMeta = response.data.data;
      dispatch({ type: Type.FETCH_SUCCEEDED, appMeta });
      return appMeta;
    } catch (err) {
      dispatch({ type: Type.FETCH_FAILED, error: parseAxiosError(err) });
      throw err;
    }
  };
};

export const update = (values) => {
  return async (dispatch) => {
    dispatch({ type: Type.UPDATE_REQUESTED });
    try {
      const response = await axios.post(`/api/app-meta`, values);
      const appMeta = response.data.data;
      dispatch({ type: Type.UPDATE_SUCCEEDED, appMeta });
      return appMeta;
    } catch (err) {
      dispatch({ type: Type.UPDATE_FAILED, error: parseAxiosError(err) });
      throw err;
    }
  };
};
