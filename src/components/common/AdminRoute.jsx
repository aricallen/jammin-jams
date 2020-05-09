import React, { useEffect } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { Route, Redirect } from 'react-router-dom';
import { fetchSession } from '../../redux/session/actions';
import { isResolved } from '../../utils/meta-status';
import { Page } from '../features/admin/Page';
import { isBetaTester } from '../../utils/beta-testing';

const { TARGET_ENV } = process.env;
const IS_PRODUCTION = TARGET_ENV === 'production';

const renderRouteComponent = (routeProps, Component) => {
  return (
    <Page {...routeProps}>
      <Component {...routeProps} />
    </Page>
  );
};

const handleRouting = (routeProps, Component, sessionState) => {
  if (isResolved(sessionState.meta) && !sessionState.data.user && !isBetaTester()) {
    return (
      <Redirect
        to={{
          pathname: '/account/sign-in',
          state: { from: routeProps.location },
        }}
      />
    );
  }

  if (isResolved(sessionState.meta) && !sessionState.data.user?.isAdmin && !isBetaTester()) {
    return (
      <Redirect
        to={{
          pathname: '/account/orders',
          state: { from: routeProps.location },
        }}
      />
    );
  }

  return renderRouteComponent(routeProps, Component);
};

export const AdminRoute = ({ component: Component, ...rest }) => {
  const sessionState = useSelector((state) => state.session);
  const dispatch = useDispatch();

  const fetch = () => {
    if (!sessionState.data.user) {
      dispatch(fetchSession());
    }
  };
  useEffect(fetch, []);

  return (
    <Route {...rest} render={(routeProps) => handleRouting(routeProps, Component, sessionState)} />
  );
};
