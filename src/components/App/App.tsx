import React, { useCallback, useEffect, useState } from 'react';
import { Switch, Route } from 'react-router-dom';
import { useSelector, useDispatch } from 'react-redux';

import { errorSelector, authSelector } from '@/reducers/user/selectors';
import { withAuth } from '@/hocs/withAuth';
import { Header } from '@/components/Header';
import { Notification } from '@/components/Notification';
import { AppState } from '@/reducers';
import { signinOAuth } from '@/reducers/user/actions';
import { getCode } from '@/modules/OAuth';
import { PrivateRoute } from '@/components/PrivateRoute';
import { routes } from './routes';

import './App.scss';

const App = () => {
  const dispatch = useDispatch();

  const { isAuth, error } = useSelector((state: AppState) => {
    return {
      isAuth: authSelector(state),
      error: errorSelector(state)
    };
  });

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
      <Header />
      <div className="app">
        <Switch>
          {routes.map(({ ...routeProps }) => (
            <PrivateRoute key={routeProps.path} {...routeProps} />
          ))}

          {/*{routes.map(({ path, component, isPrivate, ...rest }) => {*/}
          {/*  const RouteComponent = isPrivate ? PrivateRoute : Route;*/}

          {/*  return (*/}
          {/*    <RouteComponent*/}
          {/*      key={path}*/}
          {/*      path={path}*/}
          {/*      component={withErrorBoundary(component)}*/}
          {/*      {...rest}*/}
          {/*    />*/}
          {/*  );*/}
          {/*})}*/}
        </Switch>
      </div>
    </>
  );
};

const withAuthApp = withAuth(App);
// const withAuthApp = App;

export { withAuthApp as App };
