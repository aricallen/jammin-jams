import axios from 'axios';
import { parseAxiosError } from '../utils/error';

export const Type = {
  FETCH_REQUESTED: 'products/FETCH_REQUESTED',
  FETCH_SUCCEEDED: 'products/FETCH_SUCCEEDED',
  FETCH_FAILED: 'products/FETCH_FAILED',
};

export const fetchProducts = () => {
  return async (dispatch) => {
    dispatch({ type: Type.FETCH_REQUESTED });
    try {
      const response = await axios.get(`/api/products`);
      const products = response.data.data;
      dispatch({ type: Type.FETCH_SUCCEEDED, products });
      return products;
    } catch (err) {
      dispatch({ type: Type.FETCH_FAILED, error: parseAxiosError(err) });
      throw err;
    }
  };
};
