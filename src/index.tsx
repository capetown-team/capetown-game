import React from 'react';
import { hydrate } from 'react-dom';
import { Provider } from 'react-redux';
// import { BrowserRouter as Router } from 'react-router-dom';
// import { BrowserRouter } from 'react-router-dom';
import { loadableReady } from '@loadable/component';
// import { renderRoutes } from 'react-router-config';
import { ConnectedRouter } from 'connected-react-router';

// import { store } from '@/store/store';
import { configureStore } from '@/store/store';
// import store from '@/store/store';
import { App } from '@/components/App';

import '@/styles/main.scss';
// import { routes } from '@/components/App/routes';
const { store, history } = configureStore(window.__INITIAL_STATE__);
//
// if ('serviceWorker' in navigator) {
//   window.addEventListener('load', () => {
//     navigator.serviceWorker.register('/sw.js');
//   });
// }

// loadableReady(() => {
//   hydrate(
//     <Provider store={store}>
//       <Router>
//         {/*<div>{renderRoutes(routes)}</div>*/}
//         <App />
//       </Router>
//     </Provider>,
//     document.getElementById('root')
//   );
// });
loadableReady(() => {
  hydrate(
    <Provider store={store}>
      <ConnectedRouter history={history}>
        <App />
      </ConnectedRouter>
    </Provider>,
    document.getElementById('root')
  );
});

// hydrate(
//   <Provider store={store}>
//     <Router>
//       <div>{renderRoutes(routes)}</div>
//     </Router>
//   </Provider>,
//   document.querySelector('#root')
// );
