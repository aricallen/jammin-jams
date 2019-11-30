import React from 'react';
import ReactDOM from 'react-dom';
import { appCheck } from './utils/app-check';
import { App } from './components/App';
import './styles/index.scss';

appCheck();

ReactDOM.render(
  <App />,
  document.getElementById('app')
);
