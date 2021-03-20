import React, { useEffect, useState } from 'react';
import { Route, Redirect, RouteProps } from 'react-router-dom';
import { useSelector } from 'react-redux';

import { ROUTES } from '@/constants';
import { authSelector } from '@/reducers/user/selectors';

const PrivateRoute = ({ component: Component, ...rest }: RouteProps) => {
  // const isAuth = true;
  const [isAuth, setAuth] = useState(true);
  const auth = useSelector(authSelector);

  useEffect(() => {
    setAuth(auth);
  }, [auth]);

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
