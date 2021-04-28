import React, { memo, useEffect, useMemo, useState, useCallback } from 'react';
import { shallowEqual, useSelector, useDispatch } from 'react-redux';
import block from 'bem-cn-lite';

import { PageMeta } from '@/components/PageMeta';
import { Loading } from '@/components/Loading';
import { FormField } from '@/components/FormField';
import { Button } from '@/components/Button';
import { userSelector, authSelector } from '@/reducers/user/selectors';
import {
  pendingSelector,
  errorSelector,
  feedbackCreateSelector
} from '@/reducers/feedback/selectors';
import { addFeedback, listFeedback } from '@/reducers/feedback/actions';
import { AppState } from '@/reducers';
import { update, generateData, isFormValid } from '@/modules/formActions';
import { FormFieldEventType } from '@/types.d';
import { FeedbackList } from '@/pages/Feedback/FeedbackList';

import { data } from './data';
import './Feedback.scss';

const b = block('form');

const Feedback = () => {
  const dispatch = useDispatch();

  const [formdata, setFormdata] = useState(data);
  const [isError, setError] = useState(false);
  const [isLoading, setLoading] = useState(false);
  const [isSuccess, setSuccess] = useState(false);
  const [isList, setList] = useState(false);

  const { user, isAuth, errorText, pending, isSuccessCreate } = useSelector(
    (state: AppState) => {
      return {
        user: userSelector(state),
        isAuth: authSelector(state),
        errorText: errorSelector(state),
        pending: pendingSelector(state),
        isSuccessCreate: feedbackCreateSelector(state)
      };
    },
    shallowEqual
  );

  const allList = useCallback(() => {
    setList(!isList);
  }, [isList]);

  const updateForm = useCallback(
    (element: { blur?: boolean; id: string; event: FormFieldEventType }) => {
      const newFormdata = update(element, formdata);

      setFormdata(newFormdata);
    },
    [formdata]
  );

  const submitForm = useCallback(
    (event: { preventDefault: () => void }) => {
      event.preventDefault();

      const dataToSubmit = generateData(formdata);
      const formIsValid = isFormValid(formdata);

      if (formIsValid) {
        setError(false);
        const { name, email, text } = dataToSubmit;
        dispatch(
          addFeedback({
            name: String(name),
            email: String(email),
            text: String(text)
          })
        );

        const newFormdata = {
          ...formdata
        };
        newFormdata.text.value = '';
        setFormdata(newFormdata);

        setTimeout(() => {
          setSuccess(false);
        }, 1000);
      } else {
        setError(true);
      }
    },
    [dispatch, formdata]
  );

  useEffect(() => {
    setLoading(pending);
  }, [pending]);

  useEffect(() => {
    setSuccess(isSuccessCreate);
    dispatch(listFeedback());
  }, [isSuccessCreate, dispatch]);

  useEffect(() => {
    setError(!!errorText);
  }, [errorText]);

  useMemo(() => {
    if (isAuth) {
      data.name.value = user?.first_name || '';
      data.email.value = user?.email || '';
    }
  }, [isAuth, user]);

  return (
    <div className={b()}>
      {isLoading && <Loading />}
      <PageMeta title="Обратная связь" />

      {isList && (
        <>
          <span className={b('link')} onClick={allList} role="presentation">
            {isList ? 'Скрыть комментарии' : 'Посмотреть комментарии'}
          </span>
          <FeedbackList />
        </>
      )}

      <form className={b('wrapper')} onSubmit={(event) => submitForm(event)}>
        <h3 className={b('title')}>Обратная связь</h3>
        <div className={b('main')}>
          <FormField
            id="name"
            formdata={formdata.name}
            change={(element) => updateForm(element)}
          />
          <FormField
            id="email"
            formdata={formdata.email}
            change={(element) => updateForm(element)}
          />
          <FormField
            id="text"
            formdata={formdata.text}
            change={(element) => updateForm(element)}
          />
          {isError && (
            <div className={b('error')}>
              {errorText || 'Не все поля заполнены'}
            </div>
          )}
          {isSuccess && (
            <div className={b('success')}>Сообщение отправлено</div>
          )}
          <div className={b('row-button')}>
            <Button type="submit" size="m">
              Отправить
            </Button>
          </div>
          <span className={b('link')} onClick={allList} role="presentation">
            {isList ? 'Скрыть комментарии' : 'Посмотреть комментарии'}
          </span>
        </div>
      </form>
    </div>
  );
};

const WrappedFeedback = memo(Feedback);

export { WrappedFeedback as Feedback };
