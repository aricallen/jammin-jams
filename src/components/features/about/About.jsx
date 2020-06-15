import React from 'react';
import { Redirect, useLocation } from 'react-router-dom';

export const About = () => {
  const { pathname: rawPathname } = useLocation();
  const pathname = rawPathname.replace(/\/$/, '');
  if (pathname === '/about' || pathname === '/p/about') {
    return <Redirect to="/p/about/how-it-works" />;
  }
  const reqPath = pathname.replace('/p/', '').replace('/about/', '');
  const destPath = `/p/about/${reqPath}`;
  return <Redirect to={destPath} />;
};
