import { FormDataType } from '@/types.d';

export const data: FormDataType = {
  email: {
    element: 'input',
    value: '',
    config: {
      name: 'email_input',
      type: 'email',
      placeholder: 'Введите свой email',
      label: 'Почта'
    },
    validation: {
      required: true,
      email: true
    },
    valid: false,
    touched: false,
    validationMessage: ''
  },
  login: {
    element: 'input',
    value: '',
    config: {
      name: 'login_input',
      type: 'text',
      placeholder: 'Введите свой логин',
      label: 'Логин'
    },
    validation: {
      required: true,
      minLength: 4
    },
    valid: false,
    touched: false,
    validationMessage: ''
  },
  first_name: {
    element: 'input',
    value: '',
    config: {
      name: 'first_name_input',
      type: 'text',
      placeholder: 'Введите ваше имя',
      label: 'Имя'
    },
    validation: {
      required: true,
      minLength: 2
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
  },
  confirmPassword: {
    element: 'input',
    value: '',
    config: {
      name: 'confirmPassword_input',
      type: 'password',
      placeholder: 'Введите новый пароль (ещё раз)',
      label: 'Пароль (ещё раз)'
    },
    validation: {
      required: true,
      confirm: 'password'
    },
    valid: false,
    touched: false,
    validationMessage: ''
  }
};
