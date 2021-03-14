import React from 'react';
import ReactDOM from 'react-dom';
import { Provider } from 'react-redux';
import { store } from '@/store/store';
import { BrowserRouter as Router } from 'react-router-dom';
import { App } from '@/components/App';

import '@/styles/main.scss';

if ('serviceWorker' in navigator) {
  window.addEventListener('load', () => {
    navigator.serviceWorker.register('/sw.js');
  });
}

ReactDOM.hydrate(
  <Provider store={store}>
    <Router>
      <App />
    </Router>
  </Provider>,
  document.getElementById('root')
);
