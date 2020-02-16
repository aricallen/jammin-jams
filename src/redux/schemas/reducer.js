import { combineReducers } from 'redux';
import { Type } from './actions';

const initialMeta = { isFetching: false, error: null };

const meta = (state = initialMeta, action) => {
  switch (action.type) {
    case Type.FETCH_SCHEMA_REQUESTED:
      return { ...state, isFetching: true };
    case Type.FETCH_SCHEMA_FAILED:
      return { ...state, error: action.error, isFetching: false };
    default:
      return { ...state, isFetching: false };
  }
};

const initialData = {};

const data = (state = initialData, action) => {
  switch (action.type) {
    case Type.FETCH_SCHEMA_SUCCEEDED:
      return { ...state, [action.schema.name]: action.schema };
    default:
      return { ...state };
  }
};

export const schemas = combineReducers({ meta, data });
