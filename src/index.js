import React from 'react';
import ReactDOM from 'react-dom';

import { App } from './components/App';

fetch('/api/status').then((response) => response.json()).then((json) => {
  if (json.status === 'ok') {
    console.log('api server status -> OK!');
  }
});

ReactDOM.render(
  <App />,
  document.getElementById('app')
);
