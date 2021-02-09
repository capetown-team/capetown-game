import React from 'react';
import { BrowserRouter as Router, Switch, Route } from 'react-router-dom';
import { withErrorBoundary } from 'react-error-boundary';

import { PrivateRoute } from '@/components/PrivateRoute';
import { Leaders } from '@/pages/Leaders';
import { Forum } from '@/pages/Forum';
import { SomeError } from '@/components/SomeError';

import './App.scss';

const Test = () => <h1>Capetown Game</h1>;

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
    path: '/error',
    component: SomeError,
    isPrivate: false,
    text: 'Oops! Something wrong :(',
    isInside: true
  },
  {
    path: '*',
    component: SomeError,
    isPrivate: false,
    text: 'Oops! Not found :(',
    isInside: true
  }
];

export const App = (): JSX.Element => (
  <div className="app">
    <Router>
      <Switch>
        {routes.map(({ path, component, isPrivate, isInside, ...rest }) => {
          const RouteComponent = isPrivate ? PrivateRoute : Route;
          const Component = component;

          return !isInside ? (
            <RouteComponent
              key={path}
              path={path}
              component={withErrorBoundary(component, {
                fallbackRender: ErrorComponent
              })}
              {...rest}
            />
          ) : (
            <RouteComponent key={path} path={path}>
              <Component {...rest} />
            </RouteComponent>
          );
        })}
      </Switch>
    </Router>
  </div>
);
