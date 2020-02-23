import { combineReducers } from 'redux';
import { session } from './session/reducer';
import { schemas } from './schemas/reducer';
import { products } from './products/reducer';
import { posts } from './posts/reducer';
import { media } from './media/reducer';
import { plans } from './plans/reducer';
import { cart } from './cart/reducer';
import { checkoutSession } from './checkout-session/reducer';
import { skus } from './skus/reducer';
import { users } from './users/reducer';
import { email } from './email/reducer';
import { coupons } from './coupons/reducer';

export const rootReducer = combineReducers({
  session,
  schemas,
  products,
  plans,
  posts,
  media,
  cart,
  checkoutSession,
  skus,
  users,
  email,
  coupons,
});
