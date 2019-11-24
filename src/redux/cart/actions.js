export const Type = {
  ADD_TO_CART: 'cart/ADD_TO_CART',
  UPDATE_CART: 'cart/UPDATE_CART',
  REMOVE_FROM_CART: 'cart/REMOVE_FROM_CART',
};

export const updateCart = (cartItems) => {
  return { type: Type.UPDATE_CART, cartItems };
};

export const removeFromCart = (cartItem) => {
  return { type: Type.REMOVE_FROM_CART, cartItem };
};

export const addToCart = (cartItem) => {
  return { type: Type.ADD_TO_CART, cartItem };
};
