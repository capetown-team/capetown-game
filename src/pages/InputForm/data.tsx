import { FormDataType } from '@/types.d';

export const data: FormDataType = {
  name: {
    element: 'input',
    value: '',
    config: {
      name: 'name_input',
      type: 'text',
      placeholder: 'Введите название темы',
      label: 'Название темы'
    },
    validation: {
      required: false,
      minLength: 3
    },
    valid: false,
    touched: false,
    validationMessage: ''
  },
  content: {
    element: 'textarea',
    value: '',
    config: {
      name: 'text_textarea',
      type: 'content',
      placeholder: 'Введите содержание темы',
      label: 'Содержание'
    },
    validation: {
      required: false,
      minLength: 5
    },
    valid: false,
    touched: false,
    validationMessage: ''
  }
};
