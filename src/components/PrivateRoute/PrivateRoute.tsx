import React from 'react';
import { Route, Redirect, RouteProps } from 'react-router-dom';

type withAuthProps = {
  isAuthorized: boolean;
};

function withAuth(
  WrappedComponent: (p: withAuthProps & RouteProps) => JSX.Element
) {
  const isAuth = true;

  return (props: RouteProps) => (
    <WrappedComponent isAuthorized={isAuth} {...props} />
  );
}

const PrivateRoute = withAuth(
  ({
    isAuthorized,
    component: Component,
    ...rest
  }: withAuthProps & RouteProps) => {
    if (!Component) {
      throw new Error('Component is required in PrivateRoute');
    }

    return (
      <Route
        {...rest}
        render={(routeProps) =>
          isAuthorized ? (
            <Component {...routeProps} />
          ) : (
            <Redirect to="/signin" />
          )
        }
      />
    );
  }
);

export { PrivateRoute };
