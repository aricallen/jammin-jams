import axios from 'axios';
import { parseAxiosError } from '../utils/error';

export const Type = {
  FETCH_MANY_REQUESTED: 'camera-roll/FETCH_REQUESTED',
  FETCH_MANY_SUCCEEDED: 'camera-roll/FETCH_SUCCEEDED',
  FETCH_MANY_FAILED: 'camera-roll/FETCH_FAILED',
};

export const fetchMany = () => {
  return async (dispatch) => {
    dispatch({ type: Type.FETCH_MANY_REQUESTED });
    try {
      const response = await axios.get(`/api/camera-roll`);
      const cameraRoll = response.data.data;
      dispatch({ type: Type.FETCH_MANY_SUCCEEDED, cameraRoll });
      return cameraRoll;
    } catch (err) {
      dispatch({ type: Type.FETCH_MANY_FAILED, error: parseAxiosError(err) });
      throw err;
    }
  };
};
