import React, { useCallback, useEffect, useState } from 'react';
import { Switch, Route } from 'react-router-dom';
import { useSelector, useDispatch, shallowEqual } from 'react-redux';
import { hot } from 'react-hot-loader/root';

import { errorSelector, authSelector } from '@/reducers/user/selectors';
import { withAuth } from '@/hocs/withAuth';
import { withErrorBoundary } from '@/components/ErrorBoundary';
import { PrivateRoute } from '@/components/PrivateRoute';
import { Header } from '@/components/Header';
import { Notification } from '@/components/Notification';
import { signinOAuth } from '@/reducers/user/actions';
import { AppState } from '@/reducers';
import { getCode } from '@/modules/OAuth';
import { routes } from './routes';

import './App.scss';

const App = () => {
  const dispatch = useDispatch();

  const { isAuth, error } = useSelector((state: AppState) => {
    return {
      isAuth: authSelector(state),
      error: errorSelector(state)
    };
  }, shallowEqual);

  const [userError, setUserError] = useState(error);

  const handlerClose = useCallback(() => {
    setUserError(false);
  }, []);

  useEffect(() => {
    setUserError(error);
  }, [error]);

  useEffect(() => {
    if (!isAuth) {
      const code = getCode();
      if (code !== null) {
        dispatch(signinOAuth(code));
      }
    }
  }, [isAuth, dispatch]);

  return (
    <>
      {userError && (
        <Notification
          title="Произошла ошибка"
          size="s"
          onCancel={handlerClose}
        />
      )}
      <Header isAuth={isAuth} />
      <div className="app">
        <Switch>
          {routes.map(({ path, component, isPrivate, ...rest }) => {
            const RouteComponent = isPrivate ? PrivateRoute : Route;

            return (
              <RouteComponent
                key={path}
                path={path}
                isAuth={isAuth}
                component={withErrorBoundary(component)}
                {...rest}
              />
            );
          })}
        </Switch>
      </div>
    </>
  );
};

const withAuthApp = hot(withAuth(App));
// const withAuthApp = withAuth(App);

export { withAuthApp as App };
