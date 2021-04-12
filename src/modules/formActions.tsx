import {
  FormFieldType,
  FormType,
  FormDataType,
  FormFieldEventType
} from '@/types.d';
import {
  REXP_EMAIL,
  REXPPHONE,
  REXPGAP,
  REXP_LITERAL,
  REXP_NUMERAL
} from '@/modules/regExps';

export const validate = (element: FormFieldType, formdata: FormDataType) => {
  let error = [true, ''];
  const value = element.value.trim();

  if (element.validation.email) {
    const valid = REXP_EMAIL.test(element.value);
    const message = `${!valid ? 'Email не верный' : ''}`;
    error = !valid ? [valid, message] : error;
  }

  if (element.validation.phone) {
    const valid = REXPPHONE.test(element.value);
    const message = `${!valid ? 'Телефон не верный' : ''}`;
    error = !valid ? [valid, message] : error;
  }

  if (element.validation.password) {
    let message = '';
    let valid = true;
    if (element.value.search(REXPGAP) >= 0) {
      valid = false;
      message = 'Пробелы не допускаются';
    }
    if (element.value.search(REXP_LITERAL) < 0) {
      valid = false;
      message = 'Ваш пароль должен содержать хотя латинские литералы';
    }
    if (element.value.search(REXP_NUMERAL) < 0) {
      valid = false;
      message = 'Ваш пароль должен содержать хотя бы одну цифру';
    }

    error = !valid ? [valid, message] : error;
  }

  if (element.validation.confirm) {
    const valid =
      element.value.trim() === formdata[element.validation.confirm].value;
    const message = `${!valid ? 'Пароли не совпадают' : ''}`;
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

  if (element.validation.required) {
    const valid = value !== '';
    const message = `${!valid ? 'Обязательное поле' : ''}`;
    error = !valid ? [valid, message] : error;
  }

  return error;
};

export const update = (
  element: {
    blur?: boolean;
    id: string;
    event: FormFieldEventType;
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
    const validData = validate(newElement, formdata);
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
  const dataToSubmit: FormDataType = {};

  (Object.keys(formdata) as Array<FormType>).forEach((key: string) => {
    if (key !== 'confirmPassword') {
      (dataToSubmit[key] as unknown) = ((formdata[
        key
      ] as unknown) as FormFieldType).value;
    }
  });

  return dataToSubmit;
};

export const isFormValid = (formdata: FormDataType) => {
  let formIsValid = true;
  const newFormdate: FormDataType = {
    ...formdata
  };

  (Object.keys(formdata) as Array<FormType>).forEach((key) => {
    const validData = validate(formdata[key], formdata);
    ((newFormdate[key] as unknown) as FormFieldType).valid = !!validData[0];
  });

  (Object.keys(formdata) as Array<FormType>).forEach((key) => {
    formIsValid =
      ((formdata[key] as unknown) as FormFieldType).valid && formIsValid;
  });

  return formIsValid;
};
