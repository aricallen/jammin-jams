import { combineReducers } from 'redux';
import { Type } from './actions';
import { MetaStatus } from '../../constants/meta-status';
import { deserialize } from '../utils/deserialize';

const initialMeta = { status: MetaStatus.INITIAL, error: null };

const meta = (state = initialMeta, action) => {
  switch (action.type) {
    case Type.FETCH_REQUEST:
      return { ...state, status: MetaStatus.BUSY };
    case Type.FETCH_SUCCESS:
      return { ...state, status: MetaStatus.RESOLVED };
    case Type.FETCH_FAILURE:
      return { ...state, error: action.error, status: MetaStatus.ERRORED };
    default:
      return state;
  }
};

const initialData = [];

const data = (state = initialData, action) => {
  switch (action.type) {
    case Type.FETCH_SUCCESS:
      return action.skus.map(deserialize);
    default:
      return state;
  }
};

export const skus = combineReducers({ meta, data });
