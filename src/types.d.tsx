import { ChangeEvent, MouseEvent } from 'react';
import { Action as ReduxAction, compose } from 'redux';

declare global {
  interface Window {
    __REDUX_DEVTOOLS_EXTENSION__?: typeof compose;
  }
}

export type PaginateType = (num: number) => void;

export type SearchType = (event: ChangeEvent<HTMLInputElement>) => void;

export type ClickType = (event: MouseEvent) => void;

export type ActionProps<T extends string = string, P = void> = P extends void
  ? ReduxAction<T>
  : ReduxAction<T> & Readonly<{ payload: P }>;
