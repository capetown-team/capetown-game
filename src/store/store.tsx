import { createStore, applyMiddleware, compose, Middleware } from 'redux';
import thunk from 'redux-thunk';

import { reducer } from '@/reducers';
import { logger } from '@/middlewares/logger';
import { api } from '@/middlewares/api';
import { isServer } from '@/modules/isServer';
import { getInitialState } from './get-initial-state';

// eslint-disable-next-line @typescript-eslint/no-explicit-any
const InitialState: any = getInitialState();

const middlewares: Middleware[] = [thunk.withExtraArgument(api)];

if (process.env.NODE_ENV === 'development') {
  middlewares.push(logger);
}

export const store = createStore(
  reducer,
  InitialState,
  compose(
    applyMiddleware(...middlewares),
    !isServer && window.__REDUX_DEVTOOLS_EXTENSION__
      ? window.__REDUX_DEVTOOLS_EXTENSION__()
      : (f: () => void) => f
  )
);
