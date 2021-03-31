import React from 'react';
import { Route, Redirect, RouteProps } from 'react-router-dom';

import { ROUTES } from '@/constants';

type Props = {
  isAuth: boolean;
};

const PrivateRoute = ({
  component: Component,
  isAuth,
  ...rest
}: Props & RouteProps) => {
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
