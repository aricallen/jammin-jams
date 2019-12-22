import { combineReducers } from 'redux';
import { Type } from './actions';

const initialMeta = { isFetching: false, isCreating: false, error: null };

const meta = (state = initialMeta, action) => {
  switch (action.type) {
    case Type.LOGIN_REQUEST:
    case Type.CREATE_SESSION_REQUEST:
      return { ...state, isCreating: true };
    case Type.FETCH_SESSION_REQUEST:
      return { ...state, isFetching: true };
    case Type.LOGIN_FAILURE:
    case Type.FETCH_SESSION_FAILURE:
    case Type.CREATE_SESSION_FAILURE:
      return { ...state, error: action.error, isFetching: false, isCreating: false };
    default:
      return { ...state, isFetching: false, isCreating: false };
  }
};

const initialData = { user: null };

const data = (state = initialData, action) => {
  switch (action.type) {
    case Type.LOGIN_SUCCESS:
      return { ...state, user: action.user };
    case Type.FETCH_SESSION_SUCCESS:
      return { ...state, ...action.data };
    case Type.CREATE_SESSION_SUCCESS:
      return { ...state, [action.key]: action.data };
    default:
      return { ...state };
  }
};

export const session = combineReducers({ meta, data });
