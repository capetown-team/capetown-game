import { FormDataType } from '@/types.d';

export const data: FormDataType = {
  name: {
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
      minLength: 3
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
      label: 'Email'
    },
    validation: {
      required: true,
      email: true
    },
    valid: false,
    touched: false,
    validationMessage: ''
  },
  text: {
    element: 'textarea',
    value: '',
    config: {
      name: 'text_textarea',
      placeholder: 'Текст',
      label: 'Введите ваше сообщение'
    },
    validation: {
      required: true
    },
    valid: false,
    touched: false,
    validationMessage: ''
  }
};
