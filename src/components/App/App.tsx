import React from 'react';
import { BrowserRouter as Router, Switch, Route } from 'react-router-dom';

import { withAuth } from '@/hocs/withPreloading';
import { withErrorBoundary } from '@/components/ErrorBoundary';
import { PrivateRoute } from '@/components/PrivateRoute';
import { Header } from '@/components/Header';
import { routes } from './routes';

import './App.scss';

const App = () => (
  <Router>
    <Header />
    <div className="app">
      <Switch>
        {routes.map(({ path, component, isPrivate, ...rest }) => {
          const RouteComponent = isPrivate ? PrivateRoute : Route;

          return (
            <RouteComponent
              key={path}
              path={path}
              component={withErrorBoundary(component)}
              {...rest}
            />
          );
        })}
      </Switch>
    </div>
  </Router>
);

const withAuthApp = withAuth(App);

export { withAuthApp as App };
