import React from 'react';
import { useDispatch, useSelector } from 'react-redux';

export const Dashboard = () => {
  const user = useSelector((state) => state.session.data.user);

  return <div>Welcome to the dashboard {user.firstName}</div>;
};
