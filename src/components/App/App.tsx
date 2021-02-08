import React from 'react';
import { BrowserRouter as Router, Switch, Route } from 'react-router-dom';
import { withErrorBoundary } from 'react-error-boundary';

import { PrivateRoute } from '@/components/PrivateRoute';
import { Leaders } from '@/pages/Leaders';
import { Forum } from '@/pages/Forum';
import { Autorisation } from '@/pages/Autorisation';
import { Registration } from '@/pages/Registration'

import './App.scss';

const Test = () => <h1>Capetown Game</h1>;
const ErrorComponent = () => <h1>Error</h1>;

const routes = [
  {
    path: '/',
    component: Test,
    isPrivate: true,
    exact: true
  },
  {
    path: '/leaders',
    component: Leaders,
    isPrivate: true
  },
  {
    path: '/forum',
    component: Forum,
    isPrivate: true
  },
   {
    path: '/login',
    component: Autorisation,
    isPrivate: true
  },
  {
    path: '/registration',
    component: Registration,
    isPrivate: true
  }
];

export const App = (): JSX.Element => (
  <div className="app">
    <Router>
      <Switch>
        {routes.map(({ path, component, isPrivate, ...rest }) => {
          const RouteComponent = isPrivate ? PrivateRoute : Route;

          return (
            <RouteComponent
              key={path}
              path={path}
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
