import { combineReducers } from 'redux';
import { Type } from './actions';
import { MetaStatus } from '../../constants/meta-status';

const initialMeta = { status: MetaStatus.INITIAL, error: null };

const meta = (state = initialMeta, action) => {
  switch (action.type) {
    case Type.FETCH_REQUESTED:
    case Type.UPDATE_REQUESTED:
      return { ...state, status: MetaStatus.BUSY };
    case Type.FETCH_SUCCEEDED:
    case Type.UPDATE_SUCCEEDED:
      return { ...state, status: MetaStatus.RESOLVED };
    case Type.FETCH_FAILED:
    case Type.UPDATE_FAILED:
      return { ...state, error: action.error, status: MetaStatus.ERRORED };
    default:
      return state;
  }
};

const initialData = {
  isFull: null,
  alertName: null,
  alertStart: null,
  alertEnd: null,
};

const data = (state = initialData, action) => {
  switch (action.type) {
    case Type.FETCH_SUCCEEDED:
    case Type.UPDATE_SUCCEEDED:
      return action.appMeta;
    default:
      return state;
  }
};

export const appMeta = combineReducers({ meta, data });
