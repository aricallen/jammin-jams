import { combineReducers } from 'redux';
import { session } from './session/reducer';
import { schemas } from './schemas/reducer';
import { products } from './products/reducer';
import { posts } from './posts/reducer';
import { uploads } from './uploads/reducer';
import { plans } from './plans/reducer';
import { cart } from './cart/reducer';
import { checkoutSession } from './checkout-session/reducer';
import { users } from './users/reducer';
import { email } from './email/reducer';
import { coupons } from './coupons/reducer';
import { orders } from './orders/reducer';
import { appMeta } from './app-meta/reducer';
import { cameraRoll } from './camera-roll/reducer';

export const rootReducer = combineReducers({
  session,
  schemas,
  products,
  plans,
  posts,
  uploads,
  cart,
  checkoutSession,
  users,
  email,
  coupons,
  orders,
  appMeta,
  cameraRoll,
});
