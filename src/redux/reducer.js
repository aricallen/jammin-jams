import { combineReducers } from 'redux';
import { session } from './session/reducer';
import { schemas } from './schemas/reducer';
import { inventoryItems } from './inventory-items/reducer';
import { posts } from './posts/reducer';

export const rootReducer = combineReducers({
  session,
  schemas,
  inventoryItems,
  posts,
});
