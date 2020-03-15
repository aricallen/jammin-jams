import React from 'react';
import { BrowserRouter as Router, Switch, Route, Redirect } from 'react-router-dom';
import styled from '@emotion/styled';
import { Global } from '@emotion/core';
import { AdminRoute } from './common/AdminRoute';
import { Home } from './features/Home';
import { Waitlist } from './features/Waitlist';
import { ThankYou } from './features/ThankYou';
import { NotFound } from './features/NotFound';
import { ErrorPage } from './features/ErrorPage';

// about
import { About } from './features/about/About';
import { DeliveryCalendar } from './features/about/DeliveryCalendar';
import { HowItWorks } from './features/about/HowItWorks';
import { FreqAsked } from './features/about/FreqAsked';

// store
import { Store } from './features/store/Store';
import { Success } from './features/store/Success';
import { Cancel } from './features/store/Cancel';
import { Checkout } from './features/store/Checkout';

// account
import { LogIn } from './features/account/LogIn';
import { LogOut } from './features/account/LogOut';

// admin
import { Dashboard } from './features/admin/Dashboard';
import { Page as AdminPostsPage } from './features/admin/posts/Page';
import { EditPage as AdminEditPostPage } from './features/admin/posts/EditPage';
import { LogoBuilder } from './features/admin/LogoBuilder';
import { QrCodes } from './features/admin/QrCodes';
import { Page as UploadsPage } from './features/admin/uploads/Page';
import { EditPage } from './features/admin/uploads/EditPage';

// blog
import { Blog } from './features/blog/Blog';
import { Post as BlogPost } from './features/blog/Post';

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
          <AdminRoute exact path="/admin/posts" component={AdminPostsPage} />
          <AdminRoute exact path="/admin/posts/:postId" component={AdminEditPostPage} />
          <AdminRoute exact path="/admin/posts/new" component={AdminEditPostPage} />
          <AdminRoute exact path="/admin/qr-codes" component={QrCodes} />
          <AdminRoute exact path="/admin/uploads/:uploadId" component={EditPage} />
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
