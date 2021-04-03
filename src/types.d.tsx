import { ChangeEvent, MouseEvent } from 'react';
import { compose, Dispatch } from 'redux';
import { match } from 'react-router';

import { State } from '@/reducers';

declare global {
  interface Window {
    __REDUX_DEVTOOLS_EXTENSION__?: typeof compose;
    __INITIAL_STATE__: State;
  }
}

export type PaginateType = (num: number) => void;

export type InputType = (event: ChangeEvent<HTMLInputElement>) => void;

export type ClickType = (event: MouseEvent) => void;

export type RouterFetchDataArgs = {
  // eslint-disable-next-line @typescript-eslint/no-explicit-any
  dispatch: Dispatch<any>;
  cookies: string;
  match: match<{ slug: string }>;
};

export type FormType =
  | 'element'
  | 'value'
  | 'config'
  | 'validation'
  | 'valid'
  | 'touched'
  | 'validationMessage';

export type FormFieldType = {
  element: string;
  value: string;
  config: {
    label?: string;
    name: string;
    type?: string;
    placeholder: string;
  };
  validation: {
    required: boolean;
    email?: boolean;
    minLength?: number;
  };
  valid: boolean;
  touched: boolean;
  validationMessage: string;
};

export type FormDataType = {
  [key: string]: FormFieldType;
};
