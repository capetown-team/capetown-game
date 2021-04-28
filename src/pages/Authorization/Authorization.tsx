import React, { useEffect, useState } from 'react';
import { useSelector, useDispatch, shallowEqual } from 'react-redux';
import { useHistory, Link } from 'react-router-dom';
import block from 'bem-cn-lite';

import { AppState } from '@/reducers';
import { signIn } from '@/reducers/user/actions';
import {
  authSelector,
  errorSelector,
  loadSelector
} from '@/reducers/user/selectors';
import { Button } from '@/components/Button';
import { Loading } from '@/components/Loading';
import { PageMeta } from '@/components/PageMeta';
import { ROUTES } from '@/constants';
import { getCodeOAuth } from '@/modules/OAuth';
import { FormField } from '@/components/FormField';
import { update, generateData, isFormValid } from '@/modules/formActions';
import { FormFieldEventType } from '@/types.d';

import { data } from './data';
import './Authorization.scss';

const b = block('form');

export const Authorization = () => {
  const dispatch = useDispatch();
  const history = useHistory();

  const [loading, setLoading] = useState(true);
  const [formValid, setFormValid] = useState(false);
  const [regValid, setRegValid] = useState(true);
  const [formdata, setFormdata] = useState(data);

  const { isAuth, error, pending } = useSelector((state: AppState) => {
    return {
      isAuth: authSelector(state),
      pending: loadSelector(state),
      error: errorSelector(state)
    };
  }, shallowEqual);

  useEffect(() => {
    setLoading(pending);
  }, [pending]);

  useEffect(() => {
    if (isAuth) {
      history.replace(ROUTES.GAME);
    }
  }, [isAuth, history]);

  useEffect(() => {
    setRegValid(!error);
  }, [error]);

  const updateForm = (element: {
    blur?: boolean;
    id: string;
    event: FormFieldEventType;
  }) => {
    const newFormdata = update(element, formdata);

    setFormdata(newFormdata);
  };

  const submitForm = (event: { preventDefault: () => void }) => {
    event.preventDefault();

    const { login, password } = generateData(formdata);
    const formIsValid = isFormValid(formdata);

    if (formIsValid) {
      setFormValid(false);
      dispatch(
        signIn({
          login: String(login),
          password: String(password)
        })
      );
    } else {
      setFormValid(true);
    }
  };

  const oAuthHandler = () => {
    getCodeOAuth();
  };

  return (
    <div className={b()}>
      <PageMeta title="Авторизация" />
      {loading && <Loading />}
      <form className={b('wrapper')} onSubmit={(event) => submitForm(event)}>
        <h3 className={b('title')}>Авторизация</h3>
        <div className={b('main')}>
          <FormField
            id="login"
            formdata={formdata.login}
            change={(element) => updateForm(element)}
          />
          <FormField
            id="password"
            formdata={formdata.password}
            change={(element) => updateForm(element)}
          />
          {!regValid && (
            <div style={{ color: 'red' }}>Логин или пароль не верный</div>
          )}
          {formValid && (
            <div style={{ color: 'red' }}>Не все поля заполнены</div>
          )}
          <div className={b('row-button')}>
            <Button type="submit" size="m">
              Вход
            </Button>
          </div>
          <Link className={b('link')} to={ROUTES.SIGNUP}>
            Регистрация
          </Link>

          <div className={b('row-button-oauth')}>
            <Button size="m" onClick={() => oAuthHandler()}>
              Войти через Yandex
            </Button>
          </div>
        </div>
      </form>
    </div>
  );
};
