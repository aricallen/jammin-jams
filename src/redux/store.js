import { applyMiddleware, compose, createStore } from 'redux';
import thunkMiddleware from 'redux-thunk';
import { createLogger } from 'redux-logger';
import { rootReducer } from './reducer';

const middleware = [thunkMiddleware];

if (process.env.TARGET_ENV !== 'production') {
  const loggerMiddleware = createLogger({ collapsed: true });
  middleware.push(loggerMiddleware);
}

function configureStore(initialState = {}) {
  const devEnhancer = window.devToolsExtension ? window.devToolsExtension() : f => f;
  const store = createStore(
    rootReducer,
    initialState,
    compose(applyMiddleware(...middleware), devEnhancer)
  );

  const { hot } = module;
  if (hot) {
    hot.accept('./reducer', () => {
      const nextRootReducer = require('./reducer');
      store.replaceReducer(nextRootReducer);
    });
  }

  if (process.env.TARGET_ENV !== 'production') {
    window.store = store;
  }

  return store;
}
export const store = configureStore();
