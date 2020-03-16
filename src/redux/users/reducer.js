import { combineReducers } from 'redux';
import { Type } from './actions';
import { MetaStatus } from '../../constants/meta-status';
import { deserialize } from '../utils/deserialize';
import { replaceOne } from '../utils/reducer-helpers';

const initialMeta = { status: MetaStatus.INITIAL, error: null };

const meta = (state = initialMeta, action) => {
  switch (action.type) {
    case Type.CREATE_ONE_REQUESTED:
    case Type.FETCH_MANY_REQUESTED:
    case Type.UPDATE_ONE_REQUESTED:
      return { ...state, status: MetaStatus.BUSY };
    case Type.CREATE_ONE_SUCCEEDED:
    case Type.FETCH_MANY_SUCCEEDED:
    case Type.UPDATE_ONE_SUCCEEDED:
      return { ...state, status: MetaStatus.RESOLVED };
    case Type.CREATE_ONE_FAILED:
    case Type.FETCH_MANY_FAILED:
    case Type.UPDATE_ONE_FAILED:
      return { ...state, error: action.error, status: MetaStatus.ERRORED };
    default:
      return state;
  }
};

const initialData = [];

export const deserializeUser = (user) => {
  return deserialize({
    ...user,
    isActive: user.isActive === 1,
  });
};

const data = (state = initialData, action) => {
  switch (action.type) {
    case Type.CREATE_ONE_SUCCEEDED:
    case Type.UPDATE_ONE_SUCCEEDED:
      return replaceOne(deserializeUser(action.user), state);
    case Type.FETCH_MANY_SUCCEEDED:
      return action.users.map(deserializeUser);
    default:
      return state;
  }
};

export const users = combineReducers({ meta, data });
