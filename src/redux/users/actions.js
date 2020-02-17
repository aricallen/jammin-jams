import axios from 'axios';
import { parseAxiosError } from '../utils/error';

export const Type = {
  CREATE_ONE_REQUESTED: 'users/CREATE_ONE_REQUESTED',
  CREATE_ONE_SUCCEEDED: 'users/CREATE_ONE_SUCCEEDED',
  CREATE_ONE_FAILED: 'users/CREATE_ONE_FAILED',
};

export const createOne = (data) => {
  return async (dispatch) => {
    dispatch({ type: Type.CREATE_ONE_REQUESTED });
    try {
      const response = await axios.post(`/api/admin/users?upsert=true&uniqueBy=email`, data);
      const user = response.data.data;
      dispatch({ type: Type.CREATE_ONE_SUCCEEDED, user });
      return user;
    } catch (err) {
      dispatch({ type: Type.CREATE_ONE_FAILED, error: parseAxiosError(err) });
      throw err;
    }
  };
};
