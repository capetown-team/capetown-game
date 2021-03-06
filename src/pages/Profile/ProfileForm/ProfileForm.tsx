import React, { ChangeEvent, useState, useEffect, useCallback } from 'react';
import { useHistory } from 'react-router-dom';
import { useSelector, useDispatch } from 'react-redux';
import block from 'bem-cn-lite';

import { AppState } from '@/reducers';
import { authSelector, loadSelector } from '@/reducers/user/selectors';
import { logout, changeProfile } from '@/reducers/user/actions';
import { ROUTES } from '@/constants';
import { Button } from '@/components/Button';
import { Input } from '@/components/Input';
import { Loading } from '@/components/Loading';
import {
  isValidLogin,
  isValidName,
  isValidEmail,
  isValidPhone
} from '@/modules/validation';

type ProfileData = {
  first_name: string;
  second_name: string;
  display_name: string;
  login: string;
  email: string;
  phone: string;
};

type Props = {
  profileData: ProfileData;
  setIsProfileView: (a: boolean) => void;
};

const b = block('user-form');

export const ProfileForm = ({ profileData, setIsProfileView }: Props) => {
  const dispatch = useDispatch();
  const history = useHistory();

  const { isAuth, load } = useSelector((state: AppState) => {
    return {
      isAuth: authSelector(state),
      load: loadSelector(state)
    };
  });

  const [isСhangeable, setIsСhangeable] = useState(false);
  const [state, setState] = useState(profileData);
  const [validState, setValidState] = useState({
    first_name: '',
    second_name: '',
    display_name: '',
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
      name === 'first_name' ||
      name === 'second_name' ||
      name === 'display_name'
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

  const handleLogout = useCallback(() => {
    dispatch(logout());

    if (!isAuth) {
      history.replace(ROUTES.SIGNIN);
    }
  }, [dispatch, history, isAuth]);

  const handleChange = ({ target }: ChangeEvent) => {
    if (target && target instanceof HTMLInputElement) {
      const { value, name } = target;

      setState({ ...state, [name]: value });
    }
  };

  const changeProfileData = () => {
    let isValid = true;

    Object.keys(validState).forEach((key) => {
      if (!validateInput(key)) {
        isValid = false;
      }
    });

    if (!isValid) return;

    dispatch(changeProfile(state));
    setIsСhangeable(false);
  };

  return (
    <form className={b()}>
      {load && <Loading />}
      <div className={b('row')}>
        <div className={b('column')}>
          <div className={b('input')}>
            <label className={b('label')}>
              Имя
              <Input
                value={state.first_name}
                name="first_name"
                disabled={!isСhangeable}
                onChange={handleChange}
                onBlur={() => validateInput('first_name')}
              />
            </label>
            {validState.first_name && (
              <div className={b('invalid')}>{validState.first_name}</div>
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
                value={state.second_name}
                name="second_name"
                disabled={!isСhangeable}
                onChange={handleChange}
                onBlur={() => validateInput('second_name')}
              />
            </label>
            {validState.second_name && (
              <div className={b('invalid')}>{validState.second_name}</div>
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
                value={state.display_name}
                name="display_name"
                disabled={!isСhangeable}
                onChange={handleChange}
                onBlur={() => validateInput('display_name')}
              />
            </label>
            {validState.display_name && (
              <div className={b('invalid')}>{validState.display_name}</div>
            )}
          </div>
        </div>
      </div>
      <div className={b('row')}>
        <div className={b('column')}>
          {isСhangeable && (
            <div className={b('btn')}>
              <Button type="button" size="m" onClick={changeProfileData}>
                Сохранить
              </Button>
            </div>
          )}
          {!isСhangeable && (
            <>
              <div className={b('btn')}>
                <Button
                  type="button"
                  size="m"
                  onClick={() => setIsСhangeable(true)}
                >
                  Изменить данные
                </Button>
              </div>
              <div className={b('btn')}>
                <Button type="button" size="m" onClick={handleLogout}>
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
                size="m"
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
                size="m"
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
