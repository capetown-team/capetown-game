import { ChangeEvent } from 'react';

import { FormFieldType, FormType, FormDataType } from '@/types.d';
import { REXP_EMAIL } from '@/modules/regExps';

export const validate = (element: FormFieldType) => {
  let error = [true, ''];
  const value = element.value.trim();

  if (element.validation.email) {
    const valid = REXP_EMAIL.test(element.value);
    const message = `${!valid ? 'Email не верный' : ''}`;
    error = !valid ? [valid, message] : error;
  }

  if (element.validation.required) {
    const valid = value !== '';
    const message = `${!valid ? 'Обязательное поле' : ''}`;
    error = !valid ? [valid, message] : error;
  }

  const { minLength } = element.validation;
  if (minLength) {
    const valid = value.length >= minLength;
    const message = `${
      !valid ? `Длина не может быть меньше ${minLength}` : ''
    }`;
    error = !valid ? [valid, message] : error;
  }

  return error;
};

export const update = (
  element: {
    blur?: boolean;
    id: string;
    event: ChangeEvent<HTMLTextAreaElement> | ChangeEvent<HTMLInputElement>;
  },
  formdata: FormDataType
) => {
  const { id } = element;
  const newFormdate: FormDataType = {
    ...formdata
  };
  const newElement: FormFieldType = {
    ...newFormdate[id]
  };
  newElement.value = element.event.target.value;

  if (element.blur) {
    const validData = validate(newElement);
    newElement.valid = !!validData[0];
    newElement.validationMessage = String(validData[1]);
  }

  if (element.blur) {
    newElement.touched = element.blur;
  }
  newFormdate[id] = newElement;

  return newFormdate;
};

export const generateData = (formdata: FormDataType) => {
  // eslint-disable-next-line @typescript-eslint/no-explicit-any
  const dataToSubmit: any = {};

  (Object.keys(formdata) as Array<FormType>).forEach((key) => {
    dataToSubmit[key] = ((formdata[key] as unknown) as FormFieldType).value;
  });

  return dataToSubmit;
};

export const isFormValid = (formdata: FormDataType) => {
  let formIsValid = true;

  (Object.keys(formdata) as Array<FormType>).forEach((key) => {
    formIsValid =
      ((formdata[key] as unknown) as FormFieldType).valid && formIsValid;
  });

  return formIsValid;
};
