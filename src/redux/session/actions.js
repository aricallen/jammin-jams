import axios from 'axios';

export const Type = {
  LOGIN_REQUEST: 'session/LOGIN_REQUEST',
  LOGIN_SUCCESS: 'session/LOGIN_SUCCESS',
  LOGIN_FAILURE: 'session/LOGIN_FAILURE',
};

export const loginUser = ({ email, password }) => {
  return async dispatch => {
    dispatch({ type: Type.LOGIN_REQUEST });
    try {
      const user = await axios.post('/api/login', { email, password });
      dispatch({ type: Type.LOGIN_SUCCESS, user });
    } catch (err) {
      dispatch({ type: Type.LOGIN_FAILURE, error: err });
    }
  };
};
