import { combineReducers } from 'redux';
import { Type } from './actions';

const initialMeta = { isFetching: false };

const meta = (state = initialMeta, action) => {
  switch (action.type) {
    case Type.LOGIN_REQUEST:
      return { ...state, isFetching: true };
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
