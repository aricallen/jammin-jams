import React from 'react';
import { BrowserRouter as Router, Switch, Route } from 'react-router-dom';
import styled from '@emotion/styled';
import { Global } from '@emotion/core';
import { Home } from './features/home/Home';
import { NotFound } from './features/NotFound';
import { ErrorPage } from './features/ErrorPage';

// waitlists
import { Waitlist } from './features/waitlist/Waitlist';
import { ThankYou } from './features/waitlist/ThankYou';

import { Footer } from './common/Footer';
import { NavBar } from './features/nav/NavBar';
import { globalStyles } from '../constants/global-styles';
import { sizes } from '../constants/style-guide';

const Wrapper = styled('div')`
  display: grid;
  grid-template-rows: ${sizes.rowHeight}px auto min-content;
  min-height: 100vh;
  height: 100%;
`;

export const App = () => {
  return (
    <Wrapper>
      <Global styles={globalStyles} />
      <Router basename="/">
        <NavBar />
        <Switch>
          <Route exact path="/waitlist" component={Waitlist} />
          <Route exact path="/thank-you" component={ThankYou} />

          <Route exact path="/oh-noes" component={NotFound} />
          <Route exact path="/error" component={ErrorPage} />
          <Route exact path="/" component={Home} />
          <Route component={NotFound} />
        </Switch>
        <Footer />
      </Router>
    </Wrapper>
  );
};
