import { combineReducers } from 'redux';
import { Type } from './actions';
import { isBetaTester } from '../../utils/beta-testing';
import * as SessionStorage from '../../utils/session-storage';

const BETA_CART_KEY = 'beta-tester-cart';

const getInitialData = () => {
  if (!isBetaTester()) {
    return [];
  }
  return SessionStorage.getItem(BETA_CART_KEY, []);
};

const meta = (state = {}, action) => {
  switch (action.type) {
    default:
      return state;
  }
};

const initialData = getInitialData();

const data = (state = initialData, action) => {
  SessionStorage.setItem(BETA_CART_KEY, state);
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
