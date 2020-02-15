import axios from 'axios';
import { parseAxiosError } from '../utils/error';

export const Type = {
  FETCH_PRODUCTS_REQUEST: 'products/FETCH_PRODUCTS_REQUEST',
  FETCH_PRODUCTS_SUCCESS: 'products/FETCH_PRODUCTS_SUCCESS',
  FETCH_PRODUCTS_FAILURE: 'products/FETCH_PRODUCTS_FAILURE',
};

export const fetchProducts = () => {
  return async (dispatch) => {
    dispatch({ type: Type.FETCH_PRODUCTS_REQUEST });
    try {
      const response = await axios.get(`/api/stripe/products`);
      const products = response.data.data;
      dispatch({ type: Type.FETCH_PRODUCTS_SUCCESS, products });
      return products;
    } catch (err) {
      dispatch({ type: Type.FETCH_PRODUCTS_FAILURE, error: parseAxiosError(err) });
      throw err;
    }
  };
};
