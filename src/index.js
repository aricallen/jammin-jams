import React from 'react';
import ReactDOM from 'react-dom';
import { Provider } from 'react-redux';
import { store } from './redux/store';
import { statusCheck } from './utils/status-check';
import { App as BetaApp } from './components/App';
import { App as PreApp } from './components/PreApp';
import { isBetaTester } from './utils/beta-testing';
import './styles/index.scss';

statusCheck();

const getApp = () => {
  if (isBetaTester()) {
    return BetaApp;
  }
  return PreApp;
};

const App = getApp();

ReactDOM.render(
  <Provider store={store}>
    <App />
  </Provider>,
  document.getElementById('app')
);
