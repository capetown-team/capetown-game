import React, { ChangeEvent, useState, useEffect } from 'react';
import { useHistory } from 'react-router-dom';
import block from 'bem-cn-lite';

import { logOut, changeProfile } from '@/api';
import { Button } from '@/components/Button';
import { Input } from '@/components/Input';
import {
  isValidLogin,
  isValidName,
  isValidEmail,
  isValidPhone
} from '@/modules/validation';

type ProfileData = {
  [name: string]: string;
};

type Props = {
  profileData: ProfileData;
  setIsProfileView: (a: boolean) => void;
};

const b = block('user-form');

export const ProfileForm = ({ profileData, setIsProfileView }: Props) => {
  const history = useHistory();
  const [isСhangeable, setIsСhangeable] = useState(false);

  const [state, setState] = useState(profileData);
  const [validState, setValidState] = useState({
    firstName: '',
    secondName: '',
    displayName: '',
    login: '',
    email: '',
    phone: ''
  });

  useEffect(() => {
    setState(profileData);
  }, [profileData]);

  const validateInput = (name: string) => {
    let validStr = '';

    if (
      name === 'firstName' ||
      name === 'secondName' ||
      name === 'displayName'
    ) {
      validStr = isValidName(state[name]);
    } else if (name === 'login') {
      validStr = isValidLogin(state[name]);
    } else if (name === 'email') {
      validStr = isValidEmail(state[name]);
    } else if (name === 'phone') {
      validStr = isValidPhone(state[name]);
    }

    setValidState({
      ...validState,
      [name]: validStr
    });

    return !validStr;
  };

  const changeProfileData = () => {
    let isValid = true;

    Object.keys(validState).forEach((key) => {
      if (!validateInput(key)) {
        isValid = false;
      }
    });

    if (!isValid) return;

    const userData = {
      // eslint-disable-next-line camelcase
      first_name: state.firstName,
      // eslint-disable-next-line camelcase
      second_name: state.secondName,
      // eslint-disable-next-line camelcase
      display_name: state.displayName,
      login: state.login,
      email: state.email,
      phone: state.phone
    };

    changeProfile(userData).then(() => {
      setIsСhangeable(false);
    });
  };

  const handleLogout = () => {
    logOut().then(() => {
      history.push('/autorization');
    });
  };

  const handleChange = ({ target }: ChangeEvent) => {
    if (target && target instanceof HTMLInputElement) {
      const { value, name } = target;

      setState({ ...state, [name]: value });
    }
  };

  return (
    <form className={b()}>
      <div className={b('row')}>
        <div className={b('column')}>
          <div className={b('input')}>
            <label className={b('label')}>
              Имя
              <Input
                value={state.firstName}
                name="firstName"
                disabled={!isСhangeable}
                onChange={handleChange}
                onBlur={() => validateInput('firstName')}
              />
            </label>
            {validState.firstName && (
              <div className={b('invalid')}>{validState.firstName}</div>
            )}
          </div>
          <div className={b('input')}>
            <label className={b('label')}>
              Почта
              <Input
                value={state.email}
                name="email"
                disabled={!isСhangeable}
                onChange={handleChange}
                onBlur={() => validateInput('email')}
              />
            </label>
            {validState.email && (
              <div className={b('invalid')}>{validState.email}</div>
            )}
          </div>
          <div className={b('input')}>
            <label className={b('label')}>
              Логин
              <Input
                value={state.login}
                name="login"
                disabled={!isСhangeable}
                onChange={handleChange}
                onBlur={() => validateInput('login')}
              />
            </label>
            {validState.login && (
              <div className={b('invalid')}>{validState.login}</div>
            )}
          </div>
        </div>
        <div className={b('column')}>
          <div className={b('input')}>
            <label className={b('label')}>
              Фамилия
              <Input
                value={state.secondName}
                name="secondName"
                disabled={!isСhangeable}
                onChange={handleChange}
                onBlur={() => validateInput('secondName')}
              />
            </label>
            {validState.secondName && (
              <div className={b('invalid')}>{validState.secondName}</div>
            )}
          </div>
          <div className={b('input')}>
            <label className={b('label')}>
              Телефон
              <Input
                value={state.phone}
                name="phone"
                disabled={!isСhangeable}
                onChange={handleChange}
                onBlur={() => validateInput('phone')}
              />
            </label>
            {validState.phone && (
              <div className={b('invalid')}>{validState.phone}</div>
            )}
          </div>
          <div className={b('input')}>
            <label className={b('label')}>
              Имя в чате
              <Input
                value={state.displayName}
                name="displayName"
                disabled={!isСhangeable}
                onChange={handleChange}
                onBlur={() => validateInput('displayName')}
              />
            </label>
            {validState.displayName && (
              <div className={b('invalid')}>{validState.displayName}</div>
            )}
          </div>
        </div>
      </div>
      <div className={b('row')}>
        <div className={b('column')}>
          {isСhangeable && (
            <div className={b('btn')}>
              <Button type="button" size="s" onClick={changeProfileData}>
                Сохранить
              </Button>
            </div>
          )}
          {!isСhangeable && (
            <>
              <div className={b('btn')}>
                <Button
                  type="button"
                  size="s"
                  onClick={() => setIsСhangeable(true)}
                >
                  Изменить данные
                </Button>
              </div>
              <div className={b('btn')}>
                <Button type="button" size="s" onClick={handleLogout}>
                  Выйти
                </Button>
              </div>
            </>
          )}
        </div>
        <div className={b('column')}>
          {!isСhangeable && (
            <div className={b('btn')}>
              <Button
                type="button"
                size="s"
                onClick={() => setIsProfileView(false)}
              >
                Изменить пароль
              </Button>
            </div>
          )}
          {isСhangeable && (
            <div className={b('btn')}>
              <Button
                type="button"
                size="s"
                onClick={() => {
                  setIsСhangeable(false);
                  setState(profileData);
                }}
              >
                Отмена
              </Button>
            </div>
          )}
        </div>
      </div>
    </form>
  );
};
