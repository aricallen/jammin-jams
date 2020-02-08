import React from 'react';
import { BrowserRouter as Router, Switch, Route } from 'react-router-dom';
import styled from '@emotion/styled';
import { Global } from '@emotion/core';
import { AdminRoute } from './common/AdminRoute';
import { Home } from './pages/Home';
import { About } from './pages/About';
import { Waitlist } from './pages/Waitlist';
import { ThankYou } from './pages/ThankYou';
import { LogoBuilder } from './pages/LogoBuilder';
import { NotFound } from './pages/NotFound';

// store
import { Store } from './pages/store/Store';

// account
import { LogIn } from './pages/account/LogIn';

// admin
import { Dashboard } from './pages/admin/Dashboard';

// import { Footer } from './common/Footer';
import { NavBar } from './common/NavBar';
import { Content } from './common/Structure';
import { sizes } from '../constants/style-guide';
import { globalStyles } from '../constants/global-styles';
import { media } from '../utils/media';

const Wrapper = styled('div')`
  height: 100%;
  display: grid;
  grid-template-rows: ${sizes.rowHeight}px auto;
  ${media.mobile()} {
    grid-template-rows: ${sizes.rowHeight * 1.5}px auto;
  }
`;

export const App = () => {
  return (
    <Wrapper>
      <Global styles={globalStyles} />
      <Router basename="/">
        <NavBar />
        <Switch>
          <Route exact path="/about" component={About} />
          <Route exact path="/waitlist" component={Waitlist} />
          <Route exact path="/thank-you" component={ThankYou} />
          <Route exact path="/store" component={Store} />
          <Route exact path="/account/log-in" component={LogIn} />
          <Route exact path="/oh-noes" component={NotFound} />

          <AdminRoute exact path="/admin/dashboard" component={Dashboard} />
          <AdminRoute exact path="/admin/logo-builder" component={LogoBuilder} />

          <Route exact path="/" component={Home} />
          <Route component={NotFound} />
        </Switch>
        {/* <Footer /> */}
      </Router>
    </Wrapper>
  );
};
