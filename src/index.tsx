import React from 'react';
import ReactDOM from 'react-dom';
import { Provider } from 'react-redux';
import { store } from '@/store/store';
import { App } from '@/components/App';

import '@/styles/main.scss';

// if ('serviceWorker' in navigator) {
//   window.addEventListener('load', () => {
//     navigator.serviceWorker
//       .register('/sw.js')
//       .then((registration) => {
//         // eslint-disable-next-line no-console
//         console.log(
//           'ServiceWorker registration successful with scope: ',
//           registration.scope
//         );
//       })
//       .catch((error: string) => {
//         // eslint-disable-next-line no-console
//         console.log('ServiceWorker registration failed: ', error);
//       });
//   });
// }

ReactDOM.render(
  <Provider store={store}>
    <App />
  </Provider>,
  document.getElementById('root')
);
