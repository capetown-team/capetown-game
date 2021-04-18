import { FormDataType } from '@/types.d';

export const data: FormDataType = {
  name: {
    element: 'input',
    value: '',
    config: {
      name: 'name',
      type: 'text',
      placeholder: 'Введите название',
      label: 'Название'
    },
    validation: {
      required: true,
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
      name: 'content',
      placeholder: 'Текст',
      label: 'Введите содержание'
    },
    validation: {
      required: true,
      minLength: 3
    },
    valid: false,
    touched: false,
    validationMessage: ''
  }
};
