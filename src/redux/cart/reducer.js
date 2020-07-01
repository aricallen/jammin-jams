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

const removeItem = (state, cartItem) =>
  state.filter((item) => item.product.id !== cartItem.product.id);

const updateState = (state, cartItem) => {
  const { selectedQty } = cartItem;
  // remove from state
  if (selectedQty === 0) {
    return removeItem(state, cartItem);
  }

  // update item
  if (state.some((item) => item.product.id === cartItem.product.id)) {
    return state.map((item) => {
      return item.product.id === cartItem.product.id ? cartItem : item;
    });
  }

  // add item
  return [...state, cartItem];
};

const data = (state = initialData, action) => {
  SessionStorage.setItem(BETA_CART_KEY, state);
  switch (action.type) {
    case Type.ADD_TO_CART:
      return updateState(state, action.cartItem);
    case Type.REMOVE_FROM_CART:
      return removeItem(state, action.cartItem);
    case Type.UPDATE_CART:
      return action.cartItems;
    default:
      return state;
  }
};

export const cart = combineReducers({ meta, data });
