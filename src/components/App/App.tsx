import React, { useState } from 'react';
import { BrowserRouter as Router, Switch, Route } from 'react-router-dom';

import { withErrorBoundary } from '@/components/ErrorBoundary';
import { PrivateRoute } from '@/components/PrivateRoute';
import { Header } from '@/components/Header';

import { Provider } from 'react-redux';
import configureStore from '@/redux/store/store.ts';
import { routes } from './routes';

import './App.scss';

export const useAuth = () => {
  const [isAuthorized, setAuth] = useState(true);

  const signIn = () => {
    setAuth(true);
  };

  return { isAuthorized, signIn };
};

export const App = () => (
  <Router>
    <Header />
    <div className="app">
      <Switch>
        {routes.map(({ path, component, isPrivate, ...rest }) => {
          const RouteComponent = isPrivate ? PrivateRoute : Route;
          const { isAuthorized } = useAuth();

          return (
            <RouteComponent
              key={path}
              path={path}
              isAuthorized={isAuthorized}
              component={withErrorBoundary(component)}
              {...rest}
            />
          );
        })}
      </Switch>
    </div>
  </Router>
);
