import { combineReducers } from 'redux';
import { Type } from './actions';
import { MetaStatus } from '../../constants/meta-status';
import { deserialize } from '../utils/deserialize';

const initialMeta = { status: MetaStatus.INITIAL, error: null };

const meta = (state = initialMeta, action) => {
  switch (action.type) {
    case Type.CREATE_ONE_REQUESTED:
    case Type.FETCH_MANY_REQUESTED:
      return { ...state, status: MetaStatus.BUSY };
    case Type.CREATE_ONE_SUCCEEDED:
    case Type.FETCH_MANY_SUCCEEDED:
      return { ...state, status: MetaStatus.RESOLVED };
    case Type.CREATE_ONE_FAILED:
    case Type.FETCH_MANY_FAILED:
      return { ...state, error: action.error, status: MetaStatus.ERRORED };
    default:
      return state;
  }
};

const initialData = [];

const deserializeUser = (user) => {
  return deserialize({
    ...user,
    isSubscriber: user.paymentCustomerId !== null,
  });
};

const data = (state = initialData, action) => {
  switch (action.type) {
    case Type.CREATE_ONE_SUCCEEDED:
      return deserialize(action.user);
    case Type.FETCH_MANY_SUCCEEDED:
      return action.users.map(deserializeUser);
    default:
      return state;
  }
};

export const users = combineReducers({ meta, data });
