import React from 'react';
import { Link } from 'react-router-dom';

import { Button } from '@/components/Button';
import { Input } from '@/components/Input';
import block from 'bem-cn-lite';
import './Authorization.scss';
import { useAuth } from '@/hooks/useAuth';

const b = block('form');

export const Authorization = () => {
  const {
    login,
    password,
    loginHandler,
    passwordHandler,
    loginDirty,
    passwordDirty,
    regValid,
    loginError,
    passwordError,
    formValid,
    blurHandler,
    submitHandler
  } = useAuth('authorization');

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
          {!regValid && (
            <div style={{ color: 'red' }}>Логин или пароль не верный</div>
          )}
          <div className={b('row-button')}>
            <Button
              disabled={!formValid}
              type="submit"
              size="s"
              onClick={(e: React.MouseEvent<Element, globalThis.MouseEvent>) =>
                submitHandler(e)
              }
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
