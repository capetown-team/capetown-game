import { Action } from 'redux';

export const logger = (store: { getState: () => void }) => (
  next: (arg: Action) => void
) => (action: Action) => {
  // eslint-disable-next-line no-console
  console.group();
  // eslint-disable-next-line no-console
  console.log(`%c state before:  `, 'color: green', store.getState());
  // eslint-disable-next-line no-console
  console.log(`%c dispatching: `, 'color: gray', action);
  next(action);
  // eslint-disable-next-line no-console
  console.log(`%c state after: `, 'color: blue', store.getState());
  // eslint-disable-next-line no-console
  console.groupEnd();
};
