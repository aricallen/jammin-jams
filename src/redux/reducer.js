import { combineReducers } from 'redux';
import { session } from './session/reducer';
import { schemas } from './schemas/reducer';
import { products } from './products/reducer';
import { posts } from './posts/reducer';
import { media } from './media/reducer';
import { plans } from './plans/reducer';

export const rootReducer = combineReducers({
  session,
  schemas,
  products,
  plans,
  posts,
  media,
});
