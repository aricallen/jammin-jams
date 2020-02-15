export const Type = {
  ADD_TO_CART: 'cart/ADD_TO_CART',
  UPDATE_CART: 'cart/UPDATE_CART',
  REMOVE_FROM_CART: 'cart/REMOVE_FROM_CART',
};

export const updateCart = (cartItems) => {
  return { type: Type.UPDATE_CART, cartItems };
};

export const removeFromCart = (item) => {
  return { type: Type.REMOVE_FROM_CART, cartItem: item };
};

export const addToCart = (product, plan) => {
  const cartItem = { product, plan };
  return { type: Type.ADD_TO_CART, cartItem };
};
