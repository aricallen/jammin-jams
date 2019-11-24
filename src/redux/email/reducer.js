import { combineReducers } from 'redux';
import { Type } from './actions';
import { MetaStatus } from '../../constants/meta-status';
import { deserialize } from '../utils/deserialize';

const initialMeta = { status: MetaStatus.INITIAL, error: null };

const meta = (state = initialMeta, action) => {
  switch (action.type) {
    case Type.ADD_MEMBER_REQUESTED:
      return { ...state, status: MetaStatus.BUSY };
    case Type.ADD_MEMBER_SUCCEEDED:
      return { ...state, status: MetaStatus.RESOLVED };
    case Type.ADD_MEMBER_FAILED:
      return { ...state, error: action.error, status: MetaStatus.ERRORED };
    default:
      return state;
  }
};

const initialData = [];

const data = (state = initialData, action) => {
  switch (action.type) {
    case Type.ADD_MEMBER_SUCCEEDED:
      return deserialize(action.emailList);
    default:
      return state;
  }
};

export const email = combineReducers({ meta, data });
