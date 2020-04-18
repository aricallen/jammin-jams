import React from 'react';
import ReactDOM from 'react-dom';
import { Provider } from 'react-redux';
import { store } from './redux/store';
import { statusCheck } from './utils/status-check';
import { loadGa } from './utils/ga.js';
import { App } from './components/App';
import './styles/index.scss';

statusCheck();
loadGa();

ReactDOM.render(
  <Provider store={store}>
    <App />
  </Provider>,
  document.getElementById('app')
);
