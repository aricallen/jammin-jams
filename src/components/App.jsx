import React from 'react';
import { BrowserRouter as Router, Switch, Route, Redirect } from 'react-router-dom';
import styled from '@emotion/styled';
import { Global } from '@emotion/core';
import { AdminRoute } from './common/AdminRoute';
import { Home } from './pages/Home';
import { Waitlist } from './pages/Waitlist';
import { ThankYou } from './pages/ThankYou';
import { NotFound } from './pages/NotFound';
import { ErrorPage } from './pages/ErrorPage';

// about
import { About } from './pages/about/About';
import { DeliveryCalendar } from './pages/about/DeliveryCalendar';
import { HowItWorks } from './pages/about/HowItWorks';
import { FreqAsked } from './pages/about/FreqAsked';

// store
import { Store } from './pages/store/Store';
import { Success } from './pages/store/Success';
import { Cancel } from './pages/store/Cancel';
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
import { UploadsPage } from './pages/admin/UploadsPage';

// blog
import { Blog } from './pages/blog/Blog';
import { Post as BlogPost } from './pages/blog/Post';

import { Footer } from './common/Footer';
import { NavBar } from './common/NavBar';
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

          <Route exact path="/about/how-it-works" component={HowItWorks} />
          <Route exact path="/about/delivery-calendar" component={DeliveryCalendar} />
          <Route exact path="/about/faqs" component={FreqAsked} />
          <Route exact path="/about" component={About} />

          <Route exact path="/posts/:postId" component={BlogPost} />
          <Route exact path="/posts" component={Blog} />

          <Route exact path="/account/log-in" component={LogIn} />
          <Route exact path="/account/log-out" component={LogOut} />

          <Route exact path="/store" component={Store} />
          <Route exact path="/store/checkout" component={Checkout} />
          <Route exact path="/store/success" component={Success} />
          <Route exact path="/store/cancel" component={Cancel} />

          <AdminRoute exact path="/admin/dashboard" component={Dashboard} />
          <AdminRoute exact path="/admin/logo-builder" component={LogoBuilder} />
          <AdminRoute exact path="/admin/posts" component={AdminPosts} />
          <AdminRoute exact path="/admin/posts/:postId" component={Post} />
          <AdminRoute exact path="/admin/posts/new" component={Post} />
          <AdminRoute exact path="/admin/qr-codes" component={QrCodes} />
          <AdminRoute exact path="/admin/uploads" component={UploadsPage} />
          <AdminRoute exact path="/admin" component={() => <Redirect to="/admin/dashboard" />} />

          <Route exact path="/" component={Home} />
          <Route component={NotFound} />
        </Switch>
        <Footer />
      </Router>
    </Wrapper>
  );
};
