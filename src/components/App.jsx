import React from 'react';
import { BrowserRouter as Router, Switch, Route } from 'react-router-dom';
import styled from '@emotion/styled';
import { Home } from './pages/Home';
import { About } from './pages/About';
import { Store } from './pages/Store';
import { NavBar } from './common/NavBar';

const Wrapper = styled('div')``;

export function App() {
  return (
    <Wrapper>
      <Router basename="/">
        <NavBar />
        <Switch>
          <Route exact path="/store" component={Store} />
          <Route exact path="/about" component={About} />
          <Route path="/" component={Home} />
        </Switch>
      </Router>
    </Wrapper>
  );
}