import { combineReducers } from 'redux';
import { Type } from './actions';
import { MetaStatus } from '../../constants/meta-status';

const initialMeta = { status: MetaStatus.INITIAL, error: null };

const meta = (state = initialMeta, action) => {
  switch (action.type) {
    case Type.LOGIN_REQUEST:
    case Type.CREATE_SESSION_REQUEST:
    case Type.FETCH_SESSION_REQUEST:
      return { ...state, status: MetaStatus.BUSY };
    case Type.LOGIN_FAILURE:
    case Type.FETCH_SESSION_FAILURE:
    case Type.CREATE_SESSION_FAILURE:
      return { ...state, error: action.error, status: MetaStatus.ERRORED };
    case Type.LOGIN_SUCCESS:
    case Type.FETCH_SESSION_SUCCESS:
    case Type.CREATE_SESSION_SUCCESS:
      return { ...state, status: MetaStatus.RESOLVED };
    default:
      return { ...state };
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
