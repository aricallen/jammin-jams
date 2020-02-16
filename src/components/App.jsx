import React from 'react';
import { BrowserRouter as Router, Switch, Route, Redirect } from 'react-router-dom';
import styled from '@emotion/styled';
import { Global } from '@emotion/core';
import { AdminRoute } from './common/AdminRoute';
import { Home } from './pages/Home';
import { About } from './pages/About';
import { Waitlist } from './pages/Waitlist';
import { ThankYou } from './pages/ThankYou';
import { NotFound } from './pages/NotFound';

// store
import { Store } from './pages/store/Store';
import { Checkout } from './pages/store/Checkout';

// account
import { LogIn } from './pages/account/LogIn';
import { LogOut } from './pages/account/LogOut';

// admin
import { Dashboard } from './pages/admin/Dashboard';
import { Posts as AdminPosts } from './pages/admin/Posts';
import { Post } from './pages/admin/Post';
import { LogoBuilder } from './pages/admin/LogoBuilder';
import { QrCodes } from './pages/admin/QrCodes';
import { MediaPage } from './pages/admin/MediaPage';

// import { Footer } from './common/Footer';
import { NavBar } from './common/NavBar';
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
          <Route exact path="/oh-noes" component={NotFound} />

          <Route exact path="/account/log-in" component={LogIn} />
          <Route exact path="/account/log-out" component={LogOut} />

          <Route exact path="/store" component={Store} />
          <Route exact path="/store/checkout" component={Checkout} />

          <AdminRoute exact path="/admin/dashboard" component={Dashboard} />
          <AdminRoute exact path="/admin/logo-builder" component={LogoBuilder} />
          <AdminRoute exact path="/admin/posts" component={AdminPosts} />
          <AdminRoute exact path="/admin/posts/:postId" component={Post} />
          <AdminRoute exact path="/admin/posts/new" component={Post} />
          <AdminRoute exact path="/admin/qr-codes" component={QrCodes} />
          <AdminRoute exact path="/admin/media" component={MediaPage} />
          <AdminRoute exact path="/admin" component={() => <Redirect to="/admin/dashboard" />} />

          <Route exact path="/" component={Home} />
          <Route component={NotFound} />
        </Switch>
        {/* <Footer /> */}
      </Router>
    </Wrapper>
  );
};
