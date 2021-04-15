import { FormDataType } from '@/types.d';

export const data: FormDataType = {
  name: {
    element: 'name',
    value: '',
    config: {
      name: 'name_input',
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
  text: {
    element: 'content',
    value: '',
    config: {
      name: 'text_textarea',
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
