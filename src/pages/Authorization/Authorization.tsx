import React, {
  useEffect,
  useState,
  MouseEvent,
  FocusEvent,
  ChangeEvent,
  useCallback
} from 'react';
import { useSelector, useDispatch, shallowEqual } from 'react-redux';
import { useHistory, Link } from 'react-router-dom';
import block from 'bem-cn-lite';

import { Button } from '@/components/Button';
import { Input } from '@/components/Input';
import { Loading } from '@/components/Loading';
import { isValidLogin, isValidPassword } from '@/modules/validation';
import { AppState } from '@/reducers';
import { signIn } from '@/reducers/user/actions';
import {
  authSelector,
  errorSelector,
  loadSelector
} from '@/reducers/user/selectors';
import { ROUTES } from '@/constants';

import './Authorization.scss';

const b = block('form');

export const Authorization = () => {
  const dispatch = useDispatch();
  const history = useHistory();

  const [loading, setLoading] = useState(true);
  const [login, setLogin] = useState('');
  const [password, setPassword] = useState('');
  const [loginDirty, setLoginDirty] = useState(false);
  const [passwordDirty, setPasswordDirty] = useState(false);
  const [loginError, setLoginError] = useState('Email не может быть пустым');
  const [passwordError, setPasswordError] = useState(
    'Пароль не может быть пустым'
  );
  const [formValid, setFormValid] = useState(false);
  const [regValid, setRegValid] = useState(true);

  const { isAuth, error, pending } = useSelector((state: AppState) => {
    return {
      isAuth: authSelector(state),
      pending: loadSelector(state),
      error: errorSelector(state)
    };
  }, shallowEqual);

  useEffect(() => {
    setLoading(pending);
  }, [pending]);

  useEffect(() => {
    if (loginError || passwordError) {
      setFormValid(false);
    } else {
      setFormValid(true);
    }
  }, [loginError, passwordError]);

  useEffect(() => {
    if (isAuth) {
      history.replace(ROUTES.GAME);
    }
  }, [isAuth, history]);

  useEffect(() => {
    setRegValid(!error);
  }, [error]);

  const blurHandler = useCallback((e: FocusEvent<Element>) => {
    const { name } = e.target as HTMLInputElement;
    switch (name) {
      case 'login':
        setLoginDirty(true);
        break;
      case 'password':
        setPasswordDirty(true);
        break;
      default:
    }
  }, []);

  const loginHandler = useCallback((e: ChangeEvent<HTMLInputElement>) => {
    const text = e.target.value;
    setLogin(text);
    const loginErr = isValidLogin(text);
    setLoginError(loginErr);
  }, []);

  const passwordHandler = useCallback((e: ChangeEvent<HTMLInputElement>) => {
    const text = e.target.value;
    setPassword(text);
    const passwordErr = isValidPassword(text);
    setPasswordError(passwordErr);
  }, []);

  const submitHandler = useCallback(
    (e: MouseEvent<Element>) => {
      e.preventDefault();

      const user = {
        login,
        password
      };

      dispatch(signIn(user));
    },
    [dispatch, login, password]
  );

  return (
    <div className={b()}>
      {loading && <Loading />}
      <form className={b('wrapper')}>
        <div className={b('title')}>Авторизация</div>
        <div className={b('main')}>
          <div className={b('row')}>
            <div className={b('title-input')}> Логин</div>
            {loginDirty && loginError && (
              <div style={{ color: 'red' }}>{loginError}</div>
            )}
            <Input
              id="login"
              value={login}
              name="login"
              onChange={loginHandler}
              onBlur={(e) => blurHandler(e)}
              placeholder="Логин"
            />
          </div>
          <div className={b('row')}>
            <div className={b('title-input')}> Пароль </div>
            {passwordDirty && passwordError && (
              <div style={{ color: 'red' }}>{passwordError}</div>
            )}
            <Input
              id="password"
              value={password}
              type="password"
              name="password"
              onChange={passwordHandler}
              onBlur={(e) => blurHandler(e)}
              placeholder="Пароль"
            />
          </div>
          {!regValid && (
            <div style={{ color: 'red' }}>Логин или пароль не верный</div>
          )}
          <div className={b('row-button')}>
            <Button
              disabled={!formValid}
              type="submit"
              size="m"
              onClick={(e: React.MouseEvent<Element, globalThis.MouseEvent>) =>
                submitHandler(e)
              }
            >
              Вход
            </Button>
          </div>
          <Link className={b('link')} to={ROUTES.SIGNUP}>
            Регистрация
          </Link>
        </div>
      </form>
    </div>
  );
};
