import React from 'react';
import ReactDOM from 'react-dom';
import { App } from '@/components/App';

import '@/styles/main.scss';

if ('serviceWorker' in navigator) {
  window.addEventListener('load', () => {
    navigator.serviceWorker
      .register('/sw.js')
      .then((registration) => {
        console.log(
          'ServiceWorker registration successful with scope: ',
          registration.scope
        );
      })
      .catch((error: string) => {
        console.log('ServiceWorker registration failed: ', error);
      });
  });
}

ReactDOM.render(<App />, document.getElementById('root'));
