import { combineReducers } from 'redux';
import { session } from './session/reducer';
import { schemas } from './schemas/reducer';

export const rootReducer = combineReducers({
  session,
  schemas,
});
