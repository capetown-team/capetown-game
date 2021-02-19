import React from 'react';
import { Link } from 'react-router-dom';
import { useAuth } from '@/hooks/useAuth';
import { Button } from '@/components/Button';
import { Input } from '@/components/Input';

import block from 'bem-cn-lite';
import './Registration.scss';

const b = block('form');

export const Registration = () => {
  const {
    blurHandler,
    loginHandler,
    passwordHandler,
    passwordConfirmHandler,
    emailHandler,
    nameHandler,
    submitHandler,
    login,
    password,
    passwordConfirm,
    name,
    email,
    loginError,
    passwordError,
    passwordConfirmError,
    nameError,
    emailError,
    loginDirty,
    passwordDirty,
    passwordConfirmDirty,
    nameDirty,
    emailDirty,
    formValid,
    regValid
  } = useAuth('registration');

  return (
    <div className={b('wrapper')}>
      <form className={b('login')}>
        <div className={b('title')}>Регистрация</div>
        <div className={b('row')}>
          <div className={b('title-input')}>Email</div>
          {emailDirty && emailError && (
            <div style={{ color: 'red' }}>{emailError}</div>
          )}
          <Input
            id="email"
            value={email}
            name="email"
            onChange={(e) => emailHandler(e)}
            onBlur={(e) => blurHandler(e)}
            placeholder="Email"
          />
        </div>
        <div className={b('row')}>
          <div className={b('title-input')}>Логин</div>
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
        <div className={b('row')}>
          <div className={b('title-input')}>Имя</div>
          {nameDirty && nameError && (
            <div style={{ color: 'red' }}>{nameError}</div>
          )}
          <Input
            id="name"
            value={name}
            name="name"
            onChange={(e) => nameHandler(e)}
            onBlur={(e) => blurHandler(e)}
            placeholder="Имя"
          />
        </div>
        <div className={b('row')}>
          <div className={b('title-input')}>Пароль</div>
          {passwordDirty && passwordError && (
            <div style={{ color: 'red' }}>{passwordError}</div>
          )}
          <Input
            id="password"
            type="password"
            value={password}
            name="password"
            onChange={(e) => passwordHandler(e)}
            onBlur={(e) => blurHandler(e)}
            placeholder="Пароль"
          />
        </div>
        <div className={b('row')}>
          <div className={b('title-input')}>Пароль (еще раз)</div>
          {passwordConfirmDirty && passwordConfirmError && (
            <div style={{ color: 'red' }}>{passwordConfirmError}</div>
          )}
          <Input
            value={passwordConfirm}
            id="passwordConfirm"
            type="password"
            name="passwordConfirm"
            onChange={(e) => passwordConfirmHandler(e)}
            onBlur={(e) => blurHandler(e)}
            placeholder="Пароль (еще раз)"
          />
        </div>
        {!regValid && (
          <div style={{ color: 'red' }}>Такой пользователь уже существует</div>
        )}
        <div className={b('row-button')}>
          <Button
            disabled={!formValid}
            type="submit"
            size="s"
            onClick={submitHandler}
          >
            Зарегистрироваться
          </Button>
        </div>
        <div className={b('row')}>
          <Link className={b('link')} to="/authorization">
            Есть аккаунт?
          </Link>
        </div>
      </form>
    </div>
  );
};
