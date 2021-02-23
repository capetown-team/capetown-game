import React from 'react';
import { Route, Redirect, RouteProps } from 'react-router-dom';
import { useSelector } from 'react-redux';

import { ROUTES } from '@/constants';
import { getAuth } from '@/reducer/user/selectors';

const PrivateRoute = ({ component: Component, ...rest }: RouteProps) => {
  const isAuth = useSelector(getAuth);

  if (!Component) {
    throw new Error('Component is required in PrivateRoute');
  }

  return (
    <Route
      {...rest}
      render={(routeProps) => {
        return isAuth ? (
          <Component {...routeProps} />
        ) : (
          <Redirect to={ROUTES.SIGNIN} />
        );
      }}
    />
  );
};

export { PrivateRoute };
