import React, {
  useEffect,
  useState,
  FocusEvent,
  ChangeEvent,
  MouseEvent
} from 'react';

import './Registration.scss';
import { Button } from '@/components/Button';
import { Input } from '@/components/Input';
import {
  isValidLogin,
  isValidName,
  isValidEmail,
  isValidPassword,
  isValidPasswordConfirm
} from '@/modules/validation';
import { isRegistrationSuccess } from '@/api/login';
import block from 'bem-cn-lite';

const b = block('form');

export const Registration = () => {
  const [login, setLogin] = useState('');
  const [password, setPassword] = useState('');
  const [email, setEmail] = useState('');
  const [name, setName] = useState('');
  const [passwordConfirm, setpasswordConfirm] = useState('');

  const [loginDirty, setLoginDirty] = useState(false);
  const [passwordDirty, setPasswordDirty] = useState(false);
  const [emailDirty, setEmailDirty] = useState(false);
  const [nameDirty, setNameDirty] = useState(false);
  const [passwordConfirmDirty, setPasswordConfirmDirty] = useState(false);

  const [loginError, setLoginError] = useState('Логин не может быть пустым');
  const [passwordError, setPasswordError] = useState(
    'Пароль не может быть пустым'
  );
  const [emailError, setEmailError] = useState('Email не может быть пустым');
  const [nameError, setNameError] = useState('Имя не может быть пустым');
  const [passwordConfirmError, setPasswordConfirmError] = useState(
    'Пароль не может быть пустым'
  );

  const [formValid, setFormValid] = useState(false);

  useEffect(() => {
    if (
      loginError ||
      passwordError ||
      emailError ||
      nameError ||
      passwordConfirmError
    ) {
      setFormValid(false);
    } else {
      setFormValid(true);
    }
  }, [loginError, passwordError, passwordConfirmError, emailError, nameError]);

  const blurHandler = (e: FocusEvent<Element>) => {
    switch ((e.target as HTMLInputElement).name) {
      case 'login':
        setLoginDirty(true);
        break;
      case 'password':
        setPasswordDirty(true);
        break;
      case 'passwordConfirm':
        setPasswordConfirmDirty(true);
        break;
      case 'email':
        setEmailDirty(true);
        break;
      case 'name':
        setNameDirty(true);
        break;
      default:
    }
  };

  function getUser() {
    const elementLogin = document.getElementById('login') as HTMLInputElement;
    const elementPassword = document.getElementById(
      'password'
    ) as HTMLInputElement;
    const elementEmail = document.getElementById('email') as HTMLInputElement;
    const elementName = document.getElementById('name') as HTMLInputElement;

    return {
      login: elementLogin.value,
      password: elementPassword.value,
      email: elementEmail.value,
      name: elementName.value
    };
  }

  const submitHandler = async (e: MouseEvent<Element>) => {
    e.preventDefault();
    const user = getUser();
    const isSignUp = await isRegistrationSuccess(user);

    if (isSignUp) {
      console.log('Переход на страницу игры');
    } else {
      setPasswordError('Что-то пошло не так');
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

  const passwordConfirmHandler = (e: ChangeEvent<Element>) => {
    const text = (e.target as HTMLInputElement).value;
    setpasswordConfirm(text);
    const elementPassword = document.getElementById(
      'password'
    ) as HTMLInputElement;
    const passwordErr = isValidPasswordConfirm(text, elementPassword.value);
    setPasswordConfirmError(passwordErr);
  };

  const emailHandler = (e: ChangeEvent<Element>) => {
    const text = (e.target as HTMLInputElement).value;
    setEmail(text);
    const emailErr = isValidEmail(text);
    setEmailError(emailErr);
  };

  const nameHandler = (e: ChangeEvent<Element>) => {
    const text = (e.target as HTMLInputElement).value;
    setName(text);
    const nameErr = isValidName(text);
    setNameError(nameErr);
  };

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
      </form>
    </div>
  );
};
