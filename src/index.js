import React from 'react';
import ReactDOM from 'react-dom';

import { App } from './components/App';

fetch('/api/status').then((response) => response.json()).then((json) => console.log(json));

ReactDOM.render(
  <App />,
  document.getElementById('app')
);
