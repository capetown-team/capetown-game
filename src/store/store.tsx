import { createStore, applyMiddleware, compose, Middleware } from 'redux';
import thunk from 'redux-thunk';

import { reducer } from '@/reducers';
import { logger } from '@/middlewares/logger';
import { api } from '@/middlewares/api';
import { isServer } from '@/modules/isServer';

const middlewares: Middleware[] = [thunk.withExtraArgument(api)];

if (process.env.NODE_ENV === 'development') {
  middlewares.push(logger);
}

export const store = createStore(
  reducer,
  isServer ? undefined : window.__INITIAL_STATE__,
  compose(
    applyMiddleware(...middlewares),
    !isServer && window.__REDUX_DEVTOOLS_EXTENSION__
      ? window.__REDUX_DEVTOOLS_EXTENSION__()
      : (f: () => void) => f
  )
);
