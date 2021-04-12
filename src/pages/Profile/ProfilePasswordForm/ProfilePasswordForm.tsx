import React, { FC, useState } from 'react';
import { useDispatch } from 'react-redux';
import block from 'bem-cn-lite';

import { PageMeta } from '@/components/PageMeta';
import { changePassword } from '@/reducers/user/actions';
import { Button } from '@/components/Button';
import { FormField } from '@/components/FormField';
import { generateData, isFormValid, update } from '@/modules/formActions';
import { FormFieldEventType } from '@/types.d';

import { passwordData } from '../data';

const b = block('user-form');

type Props = {
  setIsProfileView: (a: boolean) => void;
};

export const ProfilePasswordForm: FC<Props> = ({ setIsProfileView }) => {
  const dispatch = useDispatch();

  const [formdata, setFormdata] = useState(passwordData);

  const submitForm = (event: { preventDefault: () => void }) => {
    event.preventDefault();

    const dataToSubmit = generateData(formdata);
    const formIsValid = isFormValid(formdata);

    if (formIsValid) {
      dispatch(
        changePassword({
          oldPassword: String(dataToSubmit.oldPassword),
          newPassword: String(dataToSubmit.password)
        })
      );
      setIsProfileView(true);
    }
  };

  const updateForm = (element: {
    blur?: boolean;
    id: string;
    event: FormFieldEventType;
  }) => {
    const newFormdata = update(element, formdata);

    setFormdata(newFormdata);
  };

  return (
    <form className={b()} onSubmit={(event) => submitForm(event)}>
      <PageMeta title="Профиль" />
      <div className={b('row')}>
        <div className={b('column')}>
          <FormField
            id="oldPassword"
            formdata={formdata.oldPassword}
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

          <div className={b('btn')}>
            <Button type="submit" size="m">
              Сохранить
            </Button>
          </div>
          <div className={b('btn')}>
            <Button
              type="button"
              size="m"
              onClick={() => setIsProfileView(true)}
            >
              Отмена
            </Button>
          </div>
        </div>
      </div>
    </form>
  );
};
