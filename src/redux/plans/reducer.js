import { combineReducers } from 'redux';
import { Type } from './actions';
import { MetaStatus } from '../../constants/meta-status';
import { deserialize } from '../utils/deserialize';

const initialMeta = { status: MetaStatus.INITIAL, error: null };

const meta = (state = initialMeta, action) => {
  switch (action.type) {
    case Type.FETCH_PLANS_REQUESTED:
      return { ...state, status: MetaStatus.BUSY };
    case Type.FETCH_PLANS_SUCCEEDED:
      return { ...state, status: MetaStatus.RESOLVED };
    case Type.FETCH_PLANS_FAILED:
      return { ...state, error: action.error, status: MetaStatus.ERRORED };
    default:
      return state;
  }
};

const initialData = [];

const data = (state = initialData, action) => {
  switch (action.type) {
    case Type.FETCH_PLANS_SUCCEEDED:
      return action.plans.map(deserialize);
    default:
      return state;
  }
};

export const plans = combineReducers({ meta, data });
