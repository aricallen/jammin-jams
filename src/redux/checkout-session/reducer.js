import { combineReducers } from 'redux';
import { Type } from './actions';
import { MetaStatus } from '../../constants/meta-status';
import { deserialize } from '../utils/deserialize';

const initialMeta = { status: MetaStatus.INITIAL, error: null };

const meta = (state = initialMeta, action) => {
  switch (action.type) {
    case Type.CREATE_ONE_REQUESTED:
    case Type.UPDATE_ONE_REQUESTED:
      return { ...state, status: MetaStatus.BUSY };
    case Type.CREATE_ONE_SUCCEEDED:
    case Type.UPDATE_ONE_SUCCEEDED:
      return { ...state, status: MetaStatus.RESOLVED };
    case Type.CREATE_ONE_FAILED:
    case Type.UPDATE_ONE_FAILED:
      return { ...state, error: action.error, status: MetaStatus.ERRORED };
    default:
      return state;
  }
};

const initialData = {};

const data = (state = initialData, action) => {
  switch (action.type) {
    case Type.CREATE_ONE_SUCCEEDED:
    case Type.UPDATE_ONE_SUCCEEDED:
      return deserialize(action.checkoutSession);
    default:
      return state;
  }
};

export const checkoutSession = combineReducers({ meta, data });
