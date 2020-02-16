import axios from 'axios';
import { parseAxiosError } from '../utils/error';

export const Type = {
  CREATE_SESSION_REQUEST: 'checkout-session/CREATE_SESSION_REQUEST',
  CREATE_SESSION_SUCCESS: 'checkout-session/CREATE_SESSION_SUCCESS',
  CREATE_SESSION_FAILURE: 'checkout-session/CREATE_SESSION_FAILURE',
};

export const submitCheckout = (formValues) => {
  return async (dispatch, getState) => {
    const cartItems = getState().cart.data;
    dispatch({ type: Type.CREATE_SESSION_REQUEST });
    try {
      const response = await axios.post(`/api/stripe/checkout`, { formValues, cartItems });
      const checkoutSession = response.data.data;
      dispatch({ type: Type.CREATE_SESSION_SUCCESS, checkoutSession });
      return checkoutSession;
    } catch (err) {
      dispatch({ type: Type.CREATE_SESSION_FAILURE, error: parseAxiosError(err) });
      throw err;
    }
  };
};
