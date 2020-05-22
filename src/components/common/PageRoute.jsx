import React from 'react';
import { Route } from 'react-router-dom';
import { setMetaTags } from '../../utils/set-meta-tags';

export const PageRoute = (props) => {
  const { children, ...rest } = props;
  setMetaTags(rest.path);

  return <Route {...rest} />;
};
