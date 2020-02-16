import axios from 'axios';
import { parseAxiosError } from '../utils/error';

export const Type = {
  CREATE_SESSION_REQUESTED: 'checkout-session/CREATE_SESSION_REQUESTED',
  CREATE_SESSION_SUCCEEDED: 'checkout-session/CREATE_SESSION_SUCCEEDED',
  CREATE_SESSION_FAILED: 'checkout-session/CREATE_SESSION_FAILED',
};

export const submitCheckout = (formValues) => {
  return async (dispatch, getState) => {
    const cartItems = getState().cart.data;
    dispatch({ type: Type.CREATE_SESSION_REQUESTED });
    try {
      const response = await axios.post(`/api/stripe/checkout`, { formValues, cartItems });
      const checkoutSession = response.data.data;
      dispatch({ type: Type.CREATE_SESSION_SUCCEEDED, checkoutSession });
      return checkoutSession;
    } catch (err) {
      dispatch({ type: Type.CREATE_SESSION_FAILED, error: parseAxiosError(err) });
      throw err;
    }
  };
};
