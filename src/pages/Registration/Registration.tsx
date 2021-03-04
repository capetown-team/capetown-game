import React, {
  useEffect,
  useState,
  FocusEvent,
  ChangeEvent,
  MouseEvent,
  useCallback
} from 'react';
import { useSelector, useDispatch, shallowEqual } from 'react-redux';
import { useHistory, Link } from 'react-router-dom';
import { AppState } from '@/reducer';
import block from 'bem-cn-lite';
import { ROUTES } from '@/constants';

import { Button } from '@/components/Button';
import { Input } from '@/components/Input';
import {
  isValidLogin,
  isValidName,
  isValidEmail,
  isValidPassword,
  isValidPasswordConfirm
} from '@/modules/validation';

import { authSelector } from '@/reducer/auth/selectors';
import { checkSignUp } from '@/reducer/signup/actions';
import { errorSelector, pendingSelector } from '@/reducer/signup/selectors';

import { Loading } from '@/components/Loading';

import './Registration.scss';

const b = block('form');

export const Registration = () => {
  const dispatch = useDispatch();
  const history = useHistory();

  const [loading, setLoading] = useState(true);
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

  const { isAuth, error, pending } = useSelector((state: AppState) => {
    return {
      isAuth: authSelector(state),
      error: errorSelector(state),
      pending: pendingSelector(state)
    };
  }, shallowEqual);

  useEffect(() => {
    setLoading(pending);
  }, [pending]);

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

  useEffect(() => {
    if (isAuth) {
      history.replace(ROUTES.GAME);
    }
  }, [isAuth, history]);

  useEffect(() => {
    setRegValid(!error);
  }, [error]);

  const blurHandler = useCallback((e: FocusEvent<Element>) => {
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

  const passwordConfirmHandler = useCallback(
    (e: ChangeEvent<HTMLInputElement>) => {
      const text = e.target.value;
      setpasswordConfirm(text);
      const passwordErr = isValidPasswordConfirm(text, password);
      setPasswordConfirmError(passwordErr);
    },
    [password]
  );

  const emailHandler = useCallback((e: ChangeEvent<HTMLInputElement>) => {
    const text = e.target.value;
    setEmail(text);
    const emailErr = isValidEmail(text);
    setEmailError(emailErr);
  }, []);

  const nameHandler = useCallback((e: ChangeEvent<HTMLInputElement>) => {
    const text = e.target.value;
    setName(text);
    const nameErr = isValidName(text);
    setNameError(nameErr);
  }, []);

  const submitHandler = useCallback(
    (e: MouseEvent) => {
      e.preventDefault();
      const user = {
        first_name: name,
        second_name: name,
        login,
        email,
        phone: '+79191234567',
        password
      };

      dispatch(checkSignUp(user));
    },
    [dispatch, name, login, email, password]
  );

  return (
    <div className={b()}>
      {loading && <Loading />}
      <form className={b('wrapper')}>
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
            onChange={emailHandler}
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
            onChange={loginHandler}
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
            onChange={nameHandler}
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
            onChange={passwordHandler}
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
            onChange={passwordConfirmHandler}
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
            size="m"
            onClick={submitHandler}
          >
            Зарегистрироваться
          </Button>
        </div>
        <Link className={b('link')} to={ROUTES.SIGNIN}>
          Есть аккаунт?
        </Link>
      </form>
    </div>
  );
};
