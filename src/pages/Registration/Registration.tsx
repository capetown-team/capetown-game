import React, {
  useEffect,
  useState,
  FocusEvent,
  ChangeEvent,
  MouseEvent
} from 'react';
import { useHistory, Link } from 'react-router-dom';
import block from 'bem-cn-lite';

import { Button } from '@/components/Button';
import { Input } from '@/components/Input';
import {
  isValidLogin,
  isValidName,
  isValidEmail,
  isValidPassword,
  isValidPasswordConfirm
} from '@/modules/validation';
import { signUp } from '@/api';
import { ROUTES } from '@/constants';

import './Registration.scss';

const b = block('form');

export const Registration = () => {
  const history = useHistory();
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
  const [regValid, setRegValid] = useState(true);

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

  const submitHandler = async (e: MouseEvent<Element>) => {
    e.preventDefault();
    const user = {
      first_name: name,
      second_name: name,
      login,
      email,
      phone: '+79191234567',
      password
    };

    try {
      await signUp(user);
      history.replace(ROUTES.GAME);
    } catch (err) {
      setRegValid(false);
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
    const passwordErr = isValidPasswordConfirm(text, password);
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
          <Link className={b('link')} to={ROUTES.SIGNIN}>
            Есть аккаунт?
          </Link>
        </div>
      </form>
    </div>
  );
};
