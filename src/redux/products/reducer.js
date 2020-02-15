import { combineReducers } from 'redux';
import { Type } from './actions';

const initialMeta = { isFetching: false, error: null };

const meta = (state = initialMeta, action) => {
  switch (action.type) {
    case Type.FETCH_PRODUCTS_REQUEST:
      return { ...state, isFetching: true };
    case Type.FETCH_PRODUCTS_FAILURE:
      return { ...state, error: action.error, isFetching: false };
    default:
      return { ...state, isFetching: false };
  }
};

const initialData = [];

const data = (state = initialData, action) => {
  switch (action.type) {
    case Type.FETCH_PRODUCTS_SUCCESS:
      return action.products;
    default:
      return state;
  }
};

export const products = combineReducers({ meta, data });
