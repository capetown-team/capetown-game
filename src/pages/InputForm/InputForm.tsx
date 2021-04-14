import React, { useCallback, useState } from 'react';
import block from 'bem-cn-lite';

import { Button } from '@/components/Button';
import { FormField } from '@/components/FormField';
import { update, generateData, isFormValid } from '@/modules/formActions';
import { PageMeta } from '@/components/PageMeta';
import { FormFieldEventType } from '@/types.d';
import { data } from './data';

const b = block('form');

export const InputForm = () => {
  const [formdata, setFormdata] = useState(data);
  const [error, setError] = useState(false);

  const updateForm = (element: {
    blur?: boolean;
    id: string;
    event: FormFieldEventType;
  }) => {
    const newFormdata = update(element, formdata);
    console.log('new', newFormdata);

    setFormdata(newFormdata);
  };

  const submitHandler = useCallback(
    (e: MouseEvent) => {
      e.preventDefault();

      console.log('formdata', formdata);
      const dataToSubmit = generateData(formdata);
      const formIsValid = isFormValid(formdata);

      if (formIsValid) {
        setError(false);
        // eslint-disable-next-line no-console
        console.log('send', dataToSubmit);
      } else {
        setError(true);
      }
      // dispatch();
    },
    [formdata]
  );

  return (
    <div className={b()}>
      <PageMeta title="Новая тема" />

      <form className={b('wrapper')} onSubmit={(event) => submitHandler(event)}>
        <h3 className={b('title')}>Новая тема </h3>
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
