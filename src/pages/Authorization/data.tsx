import { FormDataType } from '@/types.d';

export const data: FormDataType = {
  login: {
    element: 'input',
    value: '',
    config: {
      name: 'name_input',
      type: 'text',
      placeholder: 'Введите ваше имя',
      label: 'Имя'
    },
    validation: {
      required: true,
      minLength: 4
    },
    valid: false,
    touched: false,
    validationMessage: ''
  },
  password: {
    element: 'input',
    value: '',
    config: {
      name: 'password_input',
      type: 'password',
      placeholder: 'Введите пароль',
      label: 'Пароль'
    },
    validation: {
      required: true,
      minLength: 8,
      password: true
    },
    valid: false,
    touched: false,
    validationMessage: ''
  }
};
