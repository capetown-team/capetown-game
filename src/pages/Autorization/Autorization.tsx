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

  function getUser() {
    const elementLogin = document.getElementById('login') as HTMLInputElement;
    const elementPassword = document.getElementById(
      'password'
    ) as HTMLInputElement;

    return {
      login: elementLogin.value,
      password: elementPassword.value
    };
  }

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
    const user = getUser();
    const isSignIn = await isAutorizied(user);

    if (isSignIn) {
      console.log('Переход на страницу игры');
    } else {
      setPasswordError('Неверный логин или пароль');
    }
  };

  return (
    <div className="body">
      <form className="login">
        <div className="title">Авторизация</div>
        <div className="main">
          <div className="row">
            <div className="title-input"> Логин</div>
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
            <div className="title-input"> Пароль </div>
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
          <div className="row-button">
            <Button
              disabled={!formValid}
              type="submit"
              size="s"
              onClick={(e) => submitHandler(e)}
            >
              Вход
            </Button>
          </div>
          <div className="row">
            <div className="link">
              <a href="/registraion">Регистрация</a>
            </div>
          </div>
        </div>
      </form>
    </div>
  );
};
