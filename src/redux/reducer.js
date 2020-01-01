import { combineReducers } from 'redux';
import { session } from './session/reducer';
import { schemas } from './schemas/reducer';
import { inventoryItems } from './inventory-items/reducer';

export const rootReducer = combineReducers({
  session,
  schemas,
  inventoryItems,
});
