import axios from 'axios';
import { parseAxiosError } from '../utils/error';

export const Type = {
  FETCH_MANY_REQUESTED: 'skus/FETCH_REQUESTED',
  FETCH_MANY_SUCCEEDED: 'skus/FETCH_SUCCEEDED',
  FETCH_MANY_FAILED: 'skus/FETCH_FAILED',
};

export const fetchSkus = () => {
  return async (dispatch) => {
    dispatch({ type: Type.FETCH_MANY_REQUESTED });
    try {
      const response = await axios.get(`/api/stripe/skus`);
      const skus = response.data.data;
      dispatch({ type: Type.FETCH_MANY_SUCCEEDED, skus });
      return skus;
    } catch (err) {
      dispatch({ type: Type.FETCH_MANY_FAILED, error: parseAxiosError(err) });
      throw err;
    }
  };
};
