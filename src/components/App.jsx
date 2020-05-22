import React from 'react';
import { BrowserRouter as Router, Switch, Route, Redirect } from 'react-router-dom';
import styled from '@emotion/styled';
import { Global } from '@emotion/core';
import { AdminRoute } from './common/AdminRoute';
import { PageRoute } from './common/PageRoute';
import { Home } from './features/home/Home';
import { NotFound } from './features/NotFound';
import { ErrorPage } from './features/ErrorPage';

// waitlists
import { Waitlist } from './features/waitlist/Waitlist';
import { ThankYou } from './features/waitlist/ThankYou';
import { AtCapacity } from './features/waitlist/AtCapacity';
import { CovidWaitlist } from './features/waitlist/CovidWaitlist';

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
import { SignIn } from './features/account/SignIn';
import { SignOut } from './features/account/SignOut';
import { Page as Orders } from './features/account/orders/Page';

// admin
import { Dashboard } from './features/admin/Dashboard';
import { Page as AdminPostsPage } from './features/admin/posts/Page';
import { EditPage as AdminEditPostPage } from './features/admin/posts/EditPage';
import { LogoBuilder } from './features/admin/LogoBuilder';
import { QrCodes } from './features/admin/QrCodes';
import { Page as UploadsPage } from './features/admin/uploads/Page';
import { EditPage } from './features/admin/uploads/EditPage';
import { Page as AlertsPage } from './features/admin/alerts/Page';

// blog
import { Blog } from './features/blog/Blog';
import { Post as BlogPost } from './features/blog/Post';

import { Footer } from './common/Footer';
import { NavBar } from './features/nav/NavBar';
import { globalStyles } from '../constants/global-styles';
import { sizes } from '../constants/style-guide';
import { isBetaTester } from '../utils/beta-testing';

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
          <PageRoute exact path="/p/waitlist" component={Waitlist} />
          <PageRoute exact path="/p/at-capacity" component={AtCapacity} />
          <PageRoute exact path="/p/covid-waitlist" component={CovidWaitlist} />

          <PageRoute exact path="/p/about/how-it-works" component={HowItWorks} />
          <PageRoute exact path="/p/about/delivery-calendar" component={DeliveryCalendar} />
          <PageRoute exact path="/p/about/faqs" component={FreqAsked} />
          <PageRoute exact path="/p/about" component={About} />

          {isBetaTester() && <PageRoute exact path="/store" component={Store} />}
          {isBetaTester() && <Route exact path="/store/checkout" component={Checkout} />}
          {isBetaTester() && <Route exact path="/store/success" component={Success} />}
          {isBetaTester() && <Route exact path="/store/cancel" component={Cancel} />}
          {/* non beta */}
          {!isBetaTester() && (
            <Route exact path="/store" component={() => <Redirect to="/p/covid-waitlist" />} />
          )}

          <Route exact path="/jam-journeys/:postId" component={BlogPost} />
          <Route exact path="/jam-journeys" component={Blog} />

          <Route exact path="/account/sign-in" component={SignIn} />
          <Route exact path="/account/sign-out" component={SignOut} />
          <Route exact path="/account/orders" component={Orders} />

          <AdminRoute exact path="/admin/dashboard" component={Dashboard} />
          <AdminRoute exact path="/admin/logo-builder" component={LogoBuilder} />
          <AdminRoute exact path="/admin/posts" component={AdminPostsPage} />
          <AdminRoute exact path="/admin/posts/new" component={AdminEditPostPage} />
          <AdminRoute exact path="/admin/posts/:postId" component={AdminEditPostPage} />
          <AdminRoute exact path="/admin/qr-codes" component={QrCodes} />
          <AdminRoute exact path="/admin/uploads/:uploadId" component={EditPage} />
          <AdminRoute exact path="/admin/uploads" component={UploadsPage} />
          <AdminRoute exact path="/admin/alerts" component={AlertsPage} />
          <AdminRoute path="/admin" component={() => <Redirect to="/admin/dashboard" />} />

          <Route exact path="/oh-noes" component={NotFound} />
          <Route exact path="/error" component={ErrorPage} />
          <Route exact path="/thank-you" component={ThankYou} />
          <Route exact path="/" component={Home} />
          <Route component={NotFound} />
        </Switch>
        <Footer />
      </Router>
    </Wrapper>
  );
};
