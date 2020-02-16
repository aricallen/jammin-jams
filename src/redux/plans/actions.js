import axios from 'axios';
import { parseAxiosError } from '../utils/error';

export const Type = {
  FETCH_PLANS_REQUESTED: 'plans/FETCH_PLANS_REQUESTED',
  FETCH_PLANS_SUCCEEDED: 'plans/FETCH_PLANS_SUCCEEDED',
  FETCH_PLANS_FAILED: 'plans/FETCH_PLANS_FAILED',
};

export const fetchPlans = () => {
  return async (dispatch) => {
    dispatch({ type: Type.FETCH_PLANS_REQUESTED });
    try {
      const response = await axios.get(`/api/stripe/plans`);
      const plans = response.data.data;
      dispatch({ type: Type.FETCH_PLANS_SUCCEEDED, plans });
      return plans;
    } catch (err) {
      dispatch({ type: Type.FETCH_PLANS_FAILED, error: parseAxiosError(err) });
      throw err;
    }
  };
};
