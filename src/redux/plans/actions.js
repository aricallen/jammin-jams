import axios from 'axios';
import { parseAxiosError } from '../utils/error';

export const Type = {
  FETCH_PLANS_REQUEST: 'plans/FETCH_PLANS_REQUEST',
  FETCH_PLANS_SUCCESS: 'plans/FETCH_PLANS_SUCCESS',
  FETCH_PLANS_FAILURE: 'plans/FETCH_PLANS_FAILURE',
};

export const fetchPlans = () => {
  return async (dispatch) => {
    dispatch({ type: Type.FETCH_PLANS_REQUEST });
    try {
      const response = await axios.get(`/api/stripe/plans`);
      const plans = response.data.data;
      dispatch({ type: Type.FETCH_PLANS_SUCCESS, plans });
      return plans;
    } catch (err) {
      dispatch({ type: Type.FETCH_PLANS_FAILURE, error: parseAxiosError(err) });
      throw err;
    }
  };
};
