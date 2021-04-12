import React, { useState, useCallback } from 'react';
import { useHistory } from 'react-router-dom';
import { useSelector, useDispatch } from 'react-redux';
import block from 'bem-cn-lite';

import { AppState } from '@/reducers';
import { authSelector, loadSelector } from '@/reducers/user/selectors';
import { logout, changeProfile } from '@/reducers/user/actions';
import { ROUTES } from '@/constants';
import { Button } from '@/components/Button';
import { Loading } from '@/components/Loading';
import { FormField } from '@/components/FormField';
import { generateData, isFormValid, update } from '@/modules/formActions';
import { FormDataType, FormFieldEventType } from '@/types.d';

type Props = {
  profileData: FormDataType;
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

  const handleLogout = useCallback(() => {
    dispatch(logout());

    if (!isAuth) {
      history.replace(ROUTES.SIGNIN);
    }
  }, [dispatch, history, isAuth]);

  const updateForm = (element: {
    blur?: boolean;
    id: string;
    event: FormFieldEventType;
  }) => {
    const newFormdata = update(element, state);

    setState(newFormdata);
  };

  const submitForm = (event: { preventDefault: () => void }) => {
    event.preventDefault();

    const dataToSubmit = generateData(state);
    const formIsValid = isFormValid(state);

    if (formIsValid) {
      dispatch(
        changeProfile({
          first_name: String(dataToSubmit.first_name),
          second_name: String(dataToSubmit.second_name),
          display_name: String(dataToSubmit.display_name),
          login: String(dataToSubmit.login),
          email: String(dataToSubmit.email),
          phone: String(dataToSubmit.phone)
        })
      );
      setIsСhangeable(false);
    }
  };
  return (
    <form className={b()} onSubmit={(event) => submitForm(event)}>
      {load && <Loading />}
      <div className={b('row')}>
        <div className={b('column')}>
          <FormField
            id="first_name"
            formdata={state.first_name}
            disabled={!isСhangeable}
            change={(element) => updateForm(element)}
          />
          <FormField
            id="email"
            formdata={state.email}
            disabled={!isСhangeable}
            change={(element) => updateForm(element)}
          />
          <FormField
            id="login"
            formdata={state.login}
            disabled={!isСhangeable}
            change={(element) => updateForm(element)}
          />
        </div>
        <div className={b('column')}>
          <FormField
            id="second_name"
            formdata={state.second_name}
            disabled={!isСhangeable}
            change={(element) => updateForm(element)}
          />
          <FormField
            id="phone"
            formdata={state.phone}
            disabled={!isСhangeable}
            change={(element) => updateForm(element)}
          />
          <FormField
            id="display_name"
            formdata={state.display_name}
            disabled={!isСhangeable}
            change={(element) => updateForm(element)}
          />
        </div>
      </div>
      <div className={b('row')}>
        <div className={b('column')}>
          {isСhangeable && (
            <div className={b('btn')}>
              <Button type="submit" size="m">
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
          <div className={b('btn')}>
            {!isСhangeable && (
              <Button
                type="button"
                size="m"
                onClick={() => setIsProfileView(false)}
              >
                Изменить пароль
              </Button>
            )}
            {isСhangeable && (
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
            )}
          </div>
        </div>
      </div>
    </form>
  );
};
