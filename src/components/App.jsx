import React from 'react';
import { BrowserRouter as Router, Switch, Route } from 'react-router-dom';
import { Home } from './pages/Home';

export function App() {
  return (
    <Router basename="/">
      <Switch>
        <Route path="/" component={Home} />
      </Switch>
    </Router>
  );
}