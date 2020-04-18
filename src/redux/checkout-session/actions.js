import axios from 'axios';
import { parseAxiosError } from '../utils/error';

export const Type = {
  CREATE_ONE_REQUESTED: 'checkout-session/CREATE_ONE_REQUESTED',
  CREATE_ONE_SUCCEEDED: 'checkout-session/CREATE_ONE_SUCCEEDED',
  CREATE_ONE_FAILED: 'checkout-session/CREATE_ONE_FAILED',

  UPDATE_ONE_REQUESTED: 'checkout-session/UPDATE_ONE_REQUESTED',
  UPDATE_ONE_SUCCEEDED: 'checkout-session/UPDATE_ONE_SUCCEEDED',
  UPDATE_ONE_FAILED: 'checkout-session/UPDATE_ONE_FAILED',
};

export const createOne = (formValues) => {
  return async (dispatch, getState) => {
    const cartItems = getState().cart.data;
    const coupons = getState().coupons.data;
    const sessionUser = getState().session.data.user;
    dispatch({ type: Type.CREATE_ONE_REQUESTED });
    try {
      const response = await axios.post(`/api/checkout`, {
        formValues,
        cartItems,
        coupons,
        sessionUser,
      });
      const { checkoutSession, sessionKey } = response.data.data;
      dispatch({
        type: Type.CREATE_ONE_SUCCEEDED,
        checkoutSession: { ...checkoutSession, sessionKey },
      });
      return checkoutSession;
    } catch (err) {
      dispatch({ type: Type.CREATE_ONE_FAILED, error: parseAxiosError(err) });
      throw err;
    }
  };
};

export const updateOne = (formValues, sessionId, sessionUser) => {
  return async (dispatch) => {
    dispatch({ type: Type.UPDATE_ONE_REQUESTED });
    try {
      const response = await axios.post(`/api/checkout/success`, {
        formValues,
        sessionId,
        sessionUser,
      });
      const { checkoutSession } = response.data.data;
      dispatch({ type: Type.UPDATE_ONE_SUCCEEDED, checkoutSession });
      return checkoutSession;
    } catch (err) {
      dispatch({ type: Type.UPDATE_ONE_FAILED, error: parseAxiosError(err) });
      throw err;
    }
  };
};
