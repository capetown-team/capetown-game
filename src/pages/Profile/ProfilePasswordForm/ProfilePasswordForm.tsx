import React, { ChangeEvent, useState } from 'react';
import { useDispatch } from 'react-redux';
import block from 'bem-cn-lite';

import { changePassword, changeProfileView } from '@/reducer/profile/actions';

import { Button } from '@/components/Button';
import { Input } from '@/components/Input';
import { isValidPassword, isValidPasswordConfirm } from '@/modules/validation';

type StateObj = {
  [name: string]: string;
};

const b = block('user-form');

export const ProfilePasswordForm = () => {
  const dispatch = useDispatch();

  const stateObj: StateObj = {
    oldPassword: '',
    newPassword: '',
    newPasswordConfirm: ''
  };
  const [state, setState] = useState(stateObj);
  const [validState, setValidState] = useState(stateObj);

  const validateInput = (name: string) => {
    let validStr = '';
    if (name === 'newPasswordConfirm') {
      validStr = isValidPasswordConfirm(state.newPassword, state[name]);
    } else {
      validStr = isValidPassword(state[name]);
    }

    setValidState({
      ...validState,
      [name]: validStr
    });

    return !validStr;
  };

  const handleChangePassword = () => {
    let isValid = true;

    Object.keys(state).forEach((key) => {
      if (!validateInput(key)) {
        isValid = false;
      }
    });

    if (!isValid) return;

    dispatch(
      changePassword({
        oldPassword: state.oldPassword,
        newPassword: state.newPassword
      })
    );
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
              Старый пароль
              <Input
                type="password"
                value={state.oldPassword}
                name="oldPassword"
                onChange={handleChange}
                onBlur={() => validateInput('oldPassword')}
              />
            </label>
            {validState.oldPassword && (
              <div className={b('invalid')}>{validState.oldPassword}</div>
            )}
          </div>
          <div className={b('input')}>
            <label className={b('label')}>
              Новый пароль
              <Input
                type="password"
                value={state.newPassword}
                name="newPassword"
                onChange={handleChange}
                onBlur={() => validateInput('newPassword')}
              />
            </label>
            {validState.newPassword && (
              <div className={b('invalid')}>{validState.newPassword}</div>
            )}
          </div>
          <div className={b('input')}>
            <label className={b('label')}>
              Новый пароль (ещё раз)
              <Input
                type="password"
                value={state.newPasswordConfirm}
                name="newPasswordConfirm"
                onChange={handleChange}
                onBlur={() => validateInput('newPasswordConfirm')}
              />
            </label>
            {validState.newPasswordConfirm && (
              <div className={b('invalid')}>
                {validState.newPasswordConfirm}
              </div>
            )}
          </div>
          <div className={b('btn')}>
            <Button type="button" size="m" onClick={handleChangePassword}>
              Сохранить
            </Button>
          </div>
          <div className={b('btn')}>
            <Button
              type="button"
              size="s"
              onClick={() => dispatch(changeProfileView(true))}
            >
              Отмена
            </Button>
          </div>
        </div>
      </div>
    </form>
  );
};
