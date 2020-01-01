import { combineReducers } from 'redux';
import { Type } from './actions';

const initialMeta = { isFetching: false, error: null };

const meta = (state = initialMeta, action) => {
  switch (action.type) {
    case Type.FETCH_INVENTORY_ITEMS_REQUEST:
      return { ...state, isFetching: true };
    case Type.FETCH_INVENTORY_ITEMS_FAILURE:
      return { ...state, error: action.error, isFetching: false };
    default:
      return { ...state, isFetching: false };
  }
};

const initialData = [];

const data = (state = initialData, action) => {
  switch (action.type) {
    case Type.FETCH_INVENTORY_ITEMS_SUCCESS:
      return action.inventoryItems;
    default:
      return state;
  }
};

export const inventoryItems = combineReducers({ meta, data });
