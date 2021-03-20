import { createStore, applyMiddleware, compose, Middleware } from 'redux';
import thunk from 'redux-thunk';
import { createBrowserHistory, createMemoryHistory } from 'history';
import { routerMiddleware } from 'connected-react-router';

import { reducer } from '@/reducers';
import { logger } from '@/middlewares/logger';
import { api } from '@/middlewares/api';
import { isServer } from '@/modules/isServer';

const middlewares: Middleware[] = [thunk.withExtraArgument(api)];

if (process.env.NODE_ENV === 'development') {
  middlewares.push(logger);
}

// export const store = createStore(
//   reducer,
//   isServer ? undefined : window.__INITIAL_STATE__,
//   compose(
//     applyMiddleware(...middlewares),
//     !isServer && window.__REDUX_DEVTOOLS_EXTENSION__
//       ? window.__REDUX_DEVTOOLS_EXTENSION__()
//       : (f: () => void) => f
//   )
// );

// import { applyMiddleware, createStore } from 'redux';
// import { reducer } from '@/reducers';
// import reduxThunk from 'redux-thunk';
//
// export default createStore(reducer, {}, applyMiddleware(reduxThunk));

function getComposeEnhancers() {
  if (process.env.NODE_ENV !== 'production' && !isServer) {
    return window.__REDUX_DEVTOOLS_EXTENSION_COMPOSE__ || compose;
  }

  return compose;
}

export function configureStore(initialState: any, url = '/') {
  const history = isServer
    ? createMemoryHistory({ initialEntries: [url] })
    : createBrowserHistory();

  // const sagaMiddleware = createSagaMiddleware();
  const composeEnhancers = getComposeEnhancers();
  const middlewares = [routerMiddleware(history), thunk.withExtraArgument(api)];

  const store = createStore(
    reducer(history),
    initialState,
    // compose(applyMiddleware(...middlewares))
    composeEnhancers(applyMiddleware(...middlewares))
  ) as any;

  // Add methods to use in the server
  // store.runSaga = sagaMiddleware.run;
  // store.close = () => store.dispatch(END);

  // if (!isServer) {
  //   sagaMiddleware.run(rootSaga);
  // }

  return { store, history };
}
