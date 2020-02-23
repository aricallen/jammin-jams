import axios from 'axios';
import { parseAxiosError } from '../utils/error';

export const Type = {
  FETCH_ONE_REQUESTED: 'coupons/FETCH_ONE_REQUESTED',
  FETCH_ONE_SUCCEEDED: 'coupons/FETCH_ONE_SUCCEEDED',
  FETCH_ONE_FAILED: 'coupons/FETCH_ONE_FAILED',
};

export const fetchCoupon = (couponCode, couponType = null) => {
  return async (dispatch) => {
    dispatch({ type: Type.FETCH_ONE_REQUESTED });
    try {
      const params = {
        key: 'name',
        value: couponCode,
        ...{ type: couponType },
      };
      const urlParams = new URLSearchParams(params);
      const response = await axios.get(`/api/stripe/coupons?${urlParams.toString()}`);
      const coupons = response.data.data;
      dispatch({ type: Type.FETCH_ONE_SUCCEEDED, coupons });
      return coupons;
    } catch (err) {
      dispatch({ type: Type.FETCH_ONE_FAILED, error: parseAxiosError(err) });
      throw err;
    }
  };
};
