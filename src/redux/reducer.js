import { combineReducers } from 'redux';
import { session } from './session/reducer';

export const rootReducer = combineReducers({
  session,
});
