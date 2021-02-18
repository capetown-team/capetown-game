import React from 'react';
import { Route, Redirect, RouteProps } from 'react-router-dom';

type Props = {
  isAuthorized: boolean;
};

const PrivateRoute = ({
  isAuthorized,
  component: Component,
  ...rest
}: Props & RouteProps) => {
  if (!Component) {
    throw new Error('Component is required in PrivateRoute');
  }

  return (
    <Route
      {...rest}
      render={(routeProps) => {
        return isAuthorized ? (
          <Component {...routeProps} />
        ) : (
          <Redirect to="/signin" />
        );
      }}
    />
  );
};

export { PrivateRoute };
