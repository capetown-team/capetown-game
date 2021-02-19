import {
  useEffect,
  useState,
  FocusEvent,
  ChangeEvent,
  MouseEvent
} from 'react';
import {
  isValidLogin,
  isValidName,
  isValidEmail,
  isValidPassword,
  isValidPasswordConfirm
} from '@/modules/validation';
import { signIn, signUp } from '@/api';
import { useHistory } from 'react-router-dom';

type TypeAuth = 'authorization' | 'registration';

export const useAuth = (type: TypeAuth) => {
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

  const [loginError, setLoginError] = useState('Email не может быть пустым');
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

  const [isAuthorized, setisAuthorized] = useState(false);

  useEffect(() => {
    if (type === 'authorization') {
      setNameError('');
      setPasswordConfirmError('');
      setEmailError('');
    }
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

  const getUser = (type: TypeAuth) => {
    if (type === 'authorization') {
      return {
        login,
        password
      };
    }

    return {
      first_name: name,
      second_name: name,
      login,
      email,
      phone: '+79191234567',
      password
    };
  };

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

  const submitHandler = async (e: MouseEvent<Element>) => {
    e.preventDefault();

    const user = getUser(type);

    try {
      if (type === 'authorization') await signIn(user);
      else await signUp(user);

      setisAuthorized(true);
      history.replace('/game');
    } catch (err) {
      setRegValid(false);
    }
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

  return {
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
    setFormValid,
    regValid,
    setRegValid,
    isAuthorized
  };
};
