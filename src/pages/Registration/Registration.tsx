import React, { useEffect, useState } from 'react';
import { useSelector, useDispatch, shallowEqual } from 'react-redux';
import { useHistory, Link } from 'react-router-dom';
import block from 'bem-cn-lite';

import { AppState } from '@/reducers';
import {
  authSelector,
  errorSelector,
  loadSelector
} from '@/reducers/user/selectors';
import { signUp } from '@/reducers/user/actions';
import { Button } from '@/components/Button';
import { Loading } from '@/components/Loading';
import { ROUTES } from '@/constants';
import { PageMeta } from '@/components/PageMeta';
import { FormField } from '@/components/FormField';
import { update, generateData, isFormValid } from '@/modules/formActions';
import { FormFieldEventType } from '@/types.d';

import { data } from './data';
import './Registration.scss';

const b = block('form');

export const Registration = () => {
  const dispatch = useDispatch();
  const history = useHistory();

  const [loading, setLoading] = useState(true);
  const [formdata, setFormdata] = useState(data);
  const [formValid, setFormValid] = useState(false);
  const [regValid, setRegValid] = useState(true);

  const { isAuth, error, pending } = useSelector((state: AppState) => {
    return {
      isAuth: authSelector(state),
      error: errorSelector(state),
      pending: loadSelector(state)
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

    const dataToSubmit = generateData(formdata);
    const formIsValid = isFormValid(formdata);

    if (formIsValid) {
      setFormValid(false);
      dispatch(
        signUp({
          first_name: String(dataToSubmit.first_name),
          second_name: String(dataToSubmit.first_name),
          login: String(dataToSubmit.login),
          email: String(dataToSubmit.email),
          phone: '+79191234567',
          password: String(dataToSubmit.password)
        })
      );
    } else {
      setFormValid(true);
    }
  };

  return (
    <div className={b()}>
      <PageMeta title="Регистрация" />
      {loading && <Loading />}

      <form className={b('wrapper')} onSubmit={(event) => submitForm(event)}>
        <h3 className={b('title')}>Регистрация</h3>

        <FormField
          id="email"
          formdata={formdata.email}
          change={(element) => updateForm(element)}
        />
        <FormField
          id="login"
          formdata={formdata.login}
          change={(element) => updateForm(element)}
        />
        <FormField
          id="first_name"
          formdata={formdata.first_name}
          change={(element) => updateForm(element)}
        />
        <FormField
          id="password"
          formdata={formdata.password}
          change={(element) => updateForm(element)}
        />
        <FormField
          id="confirmPassword"
          formdata={formdata.confirmPassword}
          change={(element) => updateForm(element)}
        />

        {!regValid && (
          <div style={{ color: 'red' }}>Такой пользователь уже существует</div>
        )}
        {formValid && <div style={{ color: 'red' }}>Не все поля заполнены</div>}
        <div className={b('row-button')}>
          <Button type="submit" size="m">
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
