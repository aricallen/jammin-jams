import React from 'react';
import { BrowserRouter as Router, Switch, Route } from 'react-router-dom';
import styled from '@emotion/styled';
import { Home } from './pages/Home';
import { About } from './pages/About';
import { Store } from './pages/Store';
import { NavBar } from './common/NavBar';
import { Footer } from './common/Footer';
import { Content } from './common/Structure';
import { sizes } from '../constants/style-guide';

const Wrapper = styled('div')`
  height: 100%;
  display: grid;
  grid-template-rows: ${sizes.rowHeight}px auto ${sizes.rowHeight}px;
`;

export function App() {
  return (
    <Wrapper>
      <Router basename="/">
        <NavBar />
        <Content>
          <Switch>
            <Route exact path="/store" component={Store} />
            <Route exact path="/about" component={About} />
            <Route path="/" component={Home} />
          </Switch>
        </Content>
        <Footer />
      </Router>
    </Wrapper>
  );
}