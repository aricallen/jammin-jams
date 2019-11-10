import React from 'react';
import { BrowserRouter as Router, Switch, Route } from 'react-router-dom';
import styled from '@emotion/styled';
import { Home } from './pages/Home';
import { NavBar } from './common/NavBar';

const Wrapper = styled('div')``;

export function App() {
  return (
    <Wrapper>
      <Router basename="/">
        <NavBar />
        <Switch>
          <Route path="/" component={Home} />
        </Switch>
      </Router>
    </Wrapper>
  );
}