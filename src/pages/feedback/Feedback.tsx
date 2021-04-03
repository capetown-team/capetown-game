import React, { memo, useState, ChangeEvent } from 'react';
import block from 'bem-cn-lite';

import { PageMeta } from '@/components/PageMeta';
// import { Loading } from '@/components/Loading';
import { FormField } from '@/components/FormField';
import { Button } from '@/components/Button';
import { update, generateData, isFormValid } from '@/modules/formActions';
import { data } from './data';

import './Feedback.scss';

const b = block('form');

const Feedback = () => {
  const [formdata, setFormdata] = useState(data);
  const [error, setError] = useState(false);

  const updateForm = (element: {
    blur?: boolean;
    id: string;
    event: ChangeEvent<HTMLTextAreaElement> | ChangeEvent<HTMLInputElement>;
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
    } else {
      setError(true);
    }
  };

  return (
    <div className={b()}>
      <PageMeta title="Обратная связь" />

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
          {error && <div className={b('error')}>Не все поля заполнены</div>}
          <div className={b('row-button')}>
            <Button type="submit" size="m">
              Отправить
            </Button>
          </div>
        </div>
      </form>
    </div>
  );
};

const WrappedFeedback = memo(Feedback);

export { WrappedFeedback as Feedback };