import { combineReducers } from 'redux';
import { Type } from './actions';

const initialMeta = { isFetching: false, error: null };

const meta = (state = initialMeta, action) => {
  switch (action.type) {
    case Type.LOGIN_REQUEST:
      return { ...state, isFetching: true };
    case Type.LOGIN_FAILURE:
      return { ...state, error: action.error, isFetching: false };
    default:
      return { ...state, isFetching: false };
  }
};

const initialData = { user: null };

const data = (state = initialData, action) => {
  switch (action.type) {
    case Type.LOGIN_SUCCESS:
      return { ...state, user: action.user };
    default:
      return { ...state };
  }
};

export const session = combineReducers({ meta, data });
