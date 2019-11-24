import axios from 'axios';
import { parseAxiosError } from '../utils/error';

export const Type = {
  FETCH_PRODUCTS_REQUESTED: 'products/FETCH_PRODUCTS_REQUESTED',
  FETCH_PRODUCTS_SUCCEEDED: 'products/FETCH_PRODUCTS_SUCCEEDED',
  FETCH_PRODUCTS_FAILED: 'products/FETCH_PRODUCTS_FAILED',
};

export const fetchProducts = () => {
  return async (dispatch) => {
    dispatch({ type: Type.FETCH_PRODUCTS_REQUESTED });
    try {
      const response = await axios.get(`/api/stripe/products`);
      const products = response.data.data;
      dispatch({ type: Type.FETCH_PRODUCTS_SUCCEEDED, products });
      return products;
    } catch (err) {
      dispatch({ type: Type.FETCH_PRODUCTS_FAILED, error: parseAxiosError(err) });
      throw err;
    }
  };
};
