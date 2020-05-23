import React, { useEffect } from 'react';
import { Route } from 'react-router-dom';
import { setMetaTags } from '../../utils/set-meta-tags';

export const PageRoute = (props) => {
  const { children, path, ...rest } = props;
  useEffect(() => {
    setMetaTags(path);
  }, [path]);

  return (
    <Route path={path} {...rest}>
      {children}
    </Route>
  );
};
