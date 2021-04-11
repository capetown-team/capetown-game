import { FormDataType } from '@/types.d';

export const formData: FormDataType = {
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
  second_name: {
    element: 'input',
    value: '',
    config: {
      name: 'second_name_input',
      type: 'text',
      placeholder: 'Введите вашу фамилию',
      label: 'Фамилия'
    },
    validation: {
      required: true,
      minLength: 2
    },
    valid: false,
    touched: false,
    validationMessage: ''
  },
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
  phone: {
    element: 'input',
    value: '',
    config: {
      name: 'phone_input',
      type: 'tel',
      placeholder: 'Введите свой телефон',
      label: 'Телефон'
    },
    validation: {
      required: true,
      phone: true
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
  display_name: {
    element: 'input',
    value: '',
    config: {
      name: 'display_input',
      type: 'text',
      placeholder: 'Введите свое имя в чате',
      label: 'Имя в чате'
    },
    validation: {},
    valid: false,
    touched: false,
    validationMessage: ''
  }
};

export const passwordData: FormDataType = {
  oldPassword: {
    element: 'input',
    value: '',
    config: {
      name: 'oldPassword_input',
      type: 'password',
      placeholder: 'Введите старый пароль',
      label: 'Старый пароль'
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
  password: {
    element: 'input',
    value: '',
    config: {
      name: 'password_input',
      type: 'password',
      placeholder: 'Введите новый пароль',
      label: 'Новый пароль'
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
      label: 'Новый пароль (ещё раз)'
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
