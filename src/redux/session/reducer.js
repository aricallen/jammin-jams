import { combineReducers } from 'redux';
import { Type } from './actions';
import * as Users from '../users/actions';
import { MetaStatus } from '../../constants/meta-status';

const initialMeta = { status: MetaStatus.INITIAL, error: null };

const meta = (state = initialMeta, action) => {
  switch (action.type) {
    case Type.SIGN_IN_REQUESTED:
    case Type.SIGN_OUT_REQUESTED:
    case Type.CREATE_SESSION_REQUESTED:
    case Type.FETCH_SESSION_REQUESTED:
      return { ...state, status: MetaStatus.BUSY };
    case Type.SIGN_IN_FAILED:
    case Type.SIGN_OUT_FAILED:
    case Type.FETCH_SESSION_FAILED:
    case Type.CREATE_SESSION_FAILED:
      return { ...state, error: action.error, status: MetaStatus.ERRORED };
    case Type.SIGN_IN_SUCCEEDED:
    case Type.SIGN_OUT_SUCCEEDED:
    case Type.FETCH_SESSION_SUCCEEDED:
    case Type.CREATE_SESSION_SUCCEEDED:
      return { ...state, status: MetaStatus.RESOLVED };
    default:
      return { ...state };
  }
};

const initialData = { user: null };

const data = (state = initialData, action) => {
  switch (action.type) {
    case Type.SIGN_IN_SUCCEEDED:
    case Users.Type.CREATE_ONE_SUCCEEDED:
      return { ...state, user: action.user };
    case Type.SIGN_OUT_SUCCEEDED:
      return { ...state, user: action.user };
    case Type.FETCH_SESSION_SUCCEEDED:
      return { ...state, ...action.data };
    default:
      return { ...state };
  }
};

export const session = combineReducers({ meta, data });
