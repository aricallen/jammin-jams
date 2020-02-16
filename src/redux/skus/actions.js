import axios from 'axios';
import { parseAxiosError } from '../utils/error';

export const Type = {
  FETCH_REQUEST: 'skus/FETCH_REQUEST',
  FETCH_SUCCESS: 'skus/FETCH_SUCCESS',
  FETCH_FAILURE: 'skus/FETCH_FAILURE',
};

export const fetchPlans = () => {
  return async (dispatch) => {
    dispatch({ type: Type.FETCH_REQUEST });
    try {
      const response = await axios.get(`/api/stripe/skus`);
      const skus = response.data.data;
      dispatch({ type: Type.FETCH_SUCCESS, skus });
      return skus;
    } catch (err) {
      dispatch({ type: Type.FETCH_FAILURE, error: parseAxiosError(err) });
      throw err;
    }
  };
};
