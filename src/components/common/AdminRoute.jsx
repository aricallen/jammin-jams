import React, { useEffect } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { Route, Redirect } from 'react-router-dom';
import { fetchSession } from '../../redux/session/actions';
import { MetaStatus } from '../../constants/meta-status';
import { Spinner } from './Spinner';
import { Page } from '../pages/admin/Page';

const renderRouteComp = (routeProps, Component, sessionState) => {
  if (sessionState.meta.status === MetaStatus.RESOLVED && !sessionState.data.user) {
    return (
      <Redirect
        to={{
          pathname: '/account/log-in',
          state: { from: routeProps.location },
        }}
      />
    );
  }

  if (sessionState.data.user.isAdmin) {
    return (
      <Page {...routeProps}>
        <Component {...routeProps} />
      </Page>
    );
  }
  return (
    <Redirect
      to={{
        pathname: '/oh-noes',
        state: { from: routeProps.location },
      }}
    />
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

  if (
    sessionState.meta.status === MetaStatus.BUSY ||
    sessionState.meta.status === MetaStatus.INITIAL
  ) {
    return <Spinner />;
  }

  return (
    <Route
      {...rest}
      render={(routeProps) => renderRouteComp(routeProps, Component, sessionState)}
    />
  );
};
