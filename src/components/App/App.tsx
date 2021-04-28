import React, { useCallback, useEffect, useState } from 'react';
import { Switch, Route, Link } from 'react-router-dom';
import { useSelector, useDispatch, shallowEqual } from 'react-redux';
import { hot } from 'react-hot-loader/root';
import block from 'bem-cn-lite';

import {
  errorSelector,
  authSelector,
  userSelector
} from '@/reducers/user/selectors';
import { themeSelector } from '@/reducers/theme/selectors';
import { withAuth } from '@/hocs/withAuth';
import { withErrorBoundary } from '@/components/ErrorBoundary';
import { PrivateRoute } from '@/components/PrivateRoute';
import { Header } from '@/components/Header';
import { Notification } from '@/components/Notification';
import { signinOAuth } from '@/reducers/user/actions';
import { getUserTheme } from '@/reducers/theme/actions';
import { AppState } from '@/reducers';
import { getCode } from '@/modules/OAuth';
import { routes } from './routes';

import './App.scss';

const b = block('app');

const App = () => {
  const dispatch = useDispatch();

  const { isAuth, error, theme, user } = useSelector((state: AppState) => {
    return {
      isAuth: authSelector(state),
      error: errorSelector(state),
      theme: themeSelector(state),
      user: userSelector(state)
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
    } else if (user) {
      dispatch(getUserTheme(user.id));
    }
  }, [isAuth, user, dispatch]);

  return (
    <div className="app-wrapper" style={theme}>
      {userError && (
        <Notification
          title="Произошла ошибка"
          size="s"
          onCancel={handlerClose}
        />
      )}
      <Header isAuth={isAuth} />
      <div className={b()}>
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
        <Link className={b('feedback')} to="/feedback">
          <span className={b('feedback-icon')} />
        </Link>
      </div>
    </div>
  );
};

const withAuthApp =
  process.env.NODE_ENV === 'development' ? hot(withAuth(App)) : withAuth(App);

export { withAuthApp as App };
