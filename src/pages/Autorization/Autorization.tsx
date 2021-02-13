import React, {
  useEffect,
  useState,
  MouseEvent,
  FocusEvent,
  ChangeEvent
} from 'react';

import './Autorization.scss';
import { Button } from '@/components/Button';
import { Input } from '@/components/Input';
import { isValidLogin, isValidPassword } from '@/modules/validation';
import { isAutorizied } from '@/api/login';
import block from 'bem-cn-lite';
import { Link } from 'react-router-dom';

const b = block('form');

export const Autorization = () => {
  const [login, setLogin] = useState('');
  const [password, setPassword] = useState('');
  const [loginDirty, setLoginDirty] = useState(false);
  const [passwordDirty, setPasswordDirty] = useState(false);
  const [loginError, setLoginError] = useState('Email не может быть пустым');
  const [passwordError, setPasswordError] = useState(
    'Пароль не может быть пустым'
  );
  const [formValid, setFormValid] = useState(false);

  useEffect(() => {
    if (loginError || passwordError) {
      setFormValid(false);
    } else {
      setFormValid(true);
    }
  }, [loginError, passwordError]);

  const blurHandler = (e: FocusEvent<Element>) => {
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
  };

  const loginHandler = (e: ChangeEvent<Element>) => {
    const text = (e.target as HTMLInputElement).value;
    setLogin(text);
    const loginErr = isValidLogin(text);
    setLoginError(loginErr);
  };

  const passwordHandler = (e: ChangeEvent<Element>) => {
    const text = (e.target as HTMLInputElement).value;
    setPassword(text);
    const passwordErr = isValidPassword(text);
    setPasswordError(passwordErr);
  };

  const submitHandler = async (e: MouseEvent) => {
    e.preventDefault();
    const user = {
      login,
      password
    };

    const isSignIn = await isAutorizied(user);

    if (isSignIn) {
      console.log('Переход на страницу игры');
    } else {
      setPasswordError('Неверный логин или пароль');
    }
  };

  return (
    <div className={b('wrapper')}>
      <form className={b('login')}>
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
              onChange={(e) => loginHandler(e)}
              onBlur={(e) => blurHandler(e)}
              placeholder="Логин"
            />
          </div>
          <div className="row">
            <div className={b('title-input')}> Пароль </div>
            {passwordDirty && passwordError && (
              <div style={{ color: 'red' }}>{passwordError}</div>
            )}
            <Input
              id="password"
              value={password}
              type="password"
              name="password"
              onChange={(e) => passwordHandler(e)}
              onBlur={(e) => blurHandler(e)}
              placeholder="Пароль"
            />
          </div>
          <div className={b('row-button')}>
            <Button
              disabled={!formValid}
              type="submit"
              size="s"
              onClick={(e) => submitHandler(e)}
            >
              Вход
            </Button>
          </div>
          <div className={b('row')}>
            <Link className={b('link')} to="/registration">
              Регистрация
            </Link>
          </div>
        </div>
      </form>
    </div>
  );
};
