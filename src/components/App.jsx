import React from 'react';
import { BrowserRouter as Router, Switch, Route } from 'react-router-dom';
import styled from '@emotion/styled';
import { Home } from './pages/Home';
import { About } from './pages/About';
import { Store } from './pages/Store';
import { Waitlist } from './pages/Waitlist';
import { ThankYou } from './pages/ThankYou';
import { LogoBuilder } from './pages/LogoBuilder';
import { Login } from './pages/Login';

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
            <Route exact path="/login" component={Login} />
            <Route exact path="/store" component={Store} />
            <Route exact path="/about" component={About} />
            <Route exact path="/waitlist" component={Waitlist} />
            <Route exact path="/thank-you" component={ThankYou} />
            <Route exact path="/logo-builder" component={LogoBuilder} />
            <Route path="/" component={Home} />
          </Switch>
        </Content>
        <Footer />
      </Router>
    </Wrapper>
  );
}
