import { ChangeEvent, MouseEvent } from 'react';
import { compose } from 'redux';
import { State } from '@/reducers';

declare global {
  interface Window {
    __REDUX_DEVTOOLS_EXTENSION__?: typeof compose;
    __REDUX_DEVTOOLS_EXTENSION_COMPOSE__?: Function;
    __INITIAL_STATE__: State;
  }
}

export type PaginateType = (num: number) => void;

export type InputType = (event: ChangeEvent<HTMLInputElement>) => void;

export type ClickType = (event: MouseEvent) => void;
