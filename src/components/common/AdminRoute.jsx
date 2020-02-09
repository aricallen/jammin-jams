import React, { useEffect } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { Route, Redirect } from 'react-router-dom';
import { fetchSession } from '../../redux/session/actions';
import { isResolved } from '../../redux/utils/meta-status';
import { Page } from '../pages/admin/Page';

const renderRouteComp = (routeProps, Component, sessionState) => {
  if (isResolved(sessionState.meta) && !sessionState.data.user) {
    return (
      <Redirect
        to={{
          pathname: '/account/log-in',
          state: { from: routeProps.location },
        }}
      />
    );
  }

  if (isResolved(sessionState.meta) && !sessionState.data.user.isAdmin) {
    return (
      <Redirect
        to={{
          pathname: '/oh-noes',
          state: { from: routeProps.location },
        }}
      />
    );
  }

  return (
    <Page {...routeProps}>
      <Component {...routeProps} />
    </Page>
  );
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
    <Route
      {...rest}
      render={(routeProps) => renderRouteComp(routeProps, Component, sessionState)}
    />
  );
};
