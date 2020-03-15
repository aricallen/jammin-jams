import axios from 'axios';
import { parseAxiosError } from '../utils/error';

export const Type = {
  FETCH_ONE_REQUESTED: 'app-status/FETCH_ONE_REQUESTED',
  FETCH_ONE_SUCCEEDED: 'app-status/FETCH_ONE_SUCCEEDED',
  FETCH_ONE_FAILED: 'app-status/FETCH_ONE_FAILED',
};

export const fetchOne = () => {
  return async (dispatch) => {
    dispatch({ type: Type.FETCH_ONE_REQUESTED });
    try {
      const response = await axios.get(`/api/app-status`);
      const appStatus = response.data.data;
      dispatch({ type: Type.FETCH_ONE_SUCCEEDED, appStatus });
      return appStatus;
    } catch (err) {
      dispatch({ type: Type.FETCH_ONE_FAILED, error: parseAxiosError(err) });
      throw err;
    }
  };
};
