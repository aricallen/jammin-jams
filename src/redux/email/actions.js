import axios from 'axios';
import { parseAxiosError } from '../utils/error';

export const Type = {
  ADD_MEMBER_REQUESTED: 'email/ADD_MEMBER_REQUESTED',
  ADD_MEMBER_SUCCEEDED: 'email/ADD_MEMBER_SUCCEEDED',
  ADD_MEMBER_FAILED: 'email/ADD_MEMBER_FAILED',

  SEND_DEBUG_REQUESTED: 'email/SEND_DEBUG_REQUESTED',
  SEND_DEBUG_SUCCEEDED: 'email/SEND_DEBUG_SUCCEEDED',
  SEND_DEBUG_FAILED: 'email/SEND_DEBUG_FAILED',
};

export const addMember = (data) => {
  return async (dispatch) => {
    dispatch({ type: Type.ADD_MEMBER_REQUESTED });
    try {
      const response = await axios.post(`/api/email/lists/add-member`, data);
      const emailList = response.data.data;
      dispatch({ type: Type.ADD_MEMBER_SUCCEEDED, emailList });
      return emailList;
    } catch (err) {
      dispatch({ type: Type.ADD_MEMBER_FAILED, error: parseAxiosError(err) });
      throw err;
    }
  };
};

export const sendDebug = (data) => {
  return async (dispatch, getState) => {
    dispatch({ type: Type.SEND_DEBUG_REQUESTED });
    try {
      await axios.post(`/api/email/debug`, { state: JSON.stringify(getState()), ...data });
      dispatch({ type: Type.SEND_DEBUG_SUCCEEDED });
    } catch (err) {
      dispatch({ type: Type.SEND_DEBUG_FAILED, error: parseAxiosError(err) });
      throw err;
    }
  };
};
