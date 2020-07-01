import axios from 'axios';
import { parseAxiosError } from '../utils/error';

export const Type = {
  FETCH_MANY_REQUESTED: 'orders/FETCH_MANY_REQUESTED',
  FETCH_MANY_SUCCEEDED: 'orders/FETCH_MANY_SUCCEEDED',
  FETCH_MANY_FAILED: 'orders/FETCH_MANY_FAILED',
};

export const fetchMany = (sessionUser) => {
  return async (dispatch) => {
    dispatch({ type: Type.FETCH_MANY_REQUESTED });
    try {
      let customerId = sessionUser.paymentCustomerId;
      // may be stale from store
      if (!customerId) {
        const user = await axios.get(`/api/admin/users/${sessionUser.id}`);
        customerId = user.data.data.paymentCustomerId;
      }
      // because of way we setup the products, these are actually paymentIntents rather than orders
      const response = await axios.get(
        `/api/stripe/paymentIntents?key=customer&value=${customerId}`
      );
      const orders = response.data.data;
      dispatch({ type: Type.FETCH_MANY_SUCCEEDED, orders });
      return orders;
    } catch (err) {
      dispatch({ type: Type.FETCH_MANY_FAILED, error: parseAxiosError(err) });
      throw err;
    }
  };
};
