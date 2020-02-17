import { combineReducers } from 'redux';
import { Type } from './actions';

const meta = (state = {}, action) => {
  switch (action.type) {
    default:
      return state;
  }
};

const initialData = [];

const data = (state = initialData, action) => {
  switch (action.type) {
    case Type.ADD_TO_CART:
      return [...state, action.cartItem];
    case Type.REMOVE_FROM_CART:
      return state.filter((item) => item.product.id !== action.cartItem.product.id);
    case Type.UPDATE_CART:
      return action.cartItems;
    default:
      return state;
  }
};

export const cart = combineReducers({ meta, data });
