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
  match: match<{ slug: string }>;
};
