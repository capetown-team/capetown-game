import { createStore, applyMiddleware, compose } from 'redux';
import thunk from 'redux-thunk';

import { makeApi } from '@/api/api';
import reducer from '@/reducer';

const api = makeApi();

export const store = createStore(
  reducer,
  compose(
    applyMiddleware(thunk.withExtraArgument(api)),
    window.__REDUX_DEVTOOLS_EXTENSION__
      ? window.__REDUX_DEVTOOLS_EXTENSION__()
      : (f: () => void) => f
  )
);
