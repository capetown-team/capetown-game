import React, { useState } from 'react';
import { BrowserRouter as Router, Switch, Route } from 'react-router-dom';
import { withErrorBoundary } from 'react-error-boundary';

import { PrivateRoute } from '@/components/PrivateRoute';
import { routes } from './routes';

import './App.scss';

const ErrorComponent = () => <h1>Error Boundary</h1>;

export const useAuth = () => {
  const [isAuthorized, setAuth] = useState(true);

  const signIn = () => {
    setAuth(true);
  };

  return { isAuthorized, signIn };
};

export const App = () => (
  <div className="app">
    <Router>
      <Switch>
        {routes.map(({ path, component, isPrivate, ...rest }) => {
          const RouteComponent = isPrivate ? PrivateRoute : Route;
          const { isAuthorized } = useAuth();

          return (
            <RouteComponent
              key={path}
              path={path}
              isAuthorized={isAuthorized}
              component={withErrorBoundary(component, {
                fallbackRender: ErrorComponent
              })}
              {...rest}
            />
          );
        })}
      </Switch>
    </Router>
  </div>
);
