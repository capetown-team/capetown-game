import React, { memo, useState } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { useHistory } from 'react-router-dom';
import block from 'bem-cn-lite';

import { PageMeta } from '@/components/PageMeta';
import { FormField } from '@/components/FormField';
import { Button } from '@/components/Button';
import { update, generateData, isFormValid } from '@/modules/formActions';
import { FormFieldEventType } from '@/types.d';
import { addTopic } from '@/reducers/forum/actions';
import { ROUTES } from '@/constants';
import { userSelector } from '@/reducers/user/selectors';
import { AppState } from '@/reducers';

import { data } from './data';
import './InputForm.scss';

const b = block('form');

const InputForm = () => {
  const dispatch = useDispatch();
  const history = useHistory();

  const { user } = useSelector((state: AppState) => {
    return {
      user: userSelector(state)
    };
  });

  const [formdata, setFormdata] = useState(data);
  const [error, setError] = useState(false);

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
      setError(false);
      // eslint-disable-next-line no-console
      console.log('send', dataToSubmit);
      if (user !== null) {
        dispatch(
          addTopic({
            name: dataToSubmit.name,
            content: dataToSubmit.content,
            userId: user.id
          })
        );
      }
      history.replace(ROUTES.FORUM);
    } else {
      setError(true);
    }
  };

  return (
    <div className={b()}>
      <PageMeta title="Новая тема" />

      <form className={b('wrapper')} onSubmit={(event) => submitForm(event)}>
        <h3 className={b('title')}>Новая тема</h3>
        <div className={b('main')}>
          <FormField
            id="name"
            formdata={formdata.name}
            change={(element) => updateForm(element)}
          />
          <FormField
            id="content"
            formdata={formdata.content}
            change={(element) => updateForm(element)}
          />
          {error && <div className={b('error')}>Не все поля заполнены</div>}
          <div className={b('row-button')}>
            <Button type="submit" size="m">
              Создать
            </Button>
          </div>
        </div>
      </form>
    </div>
  );
};

const WrappedInputForm = memo(InputForm);

export { WrappedInputForm as InputForm };
