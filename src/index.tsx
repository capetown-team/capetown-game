import React from 'react';
import ReactDOM from 'react-dom';
import { App } from '@/components/App';

import { Provider } from 'react-redux';
import configureStore from '@/redux/store/store';

import '@/styles/main.scss';

const store = configureStore();

console.log('--------------------------------------');
console.log(store.getState());

console.log('--------------------------------------');

ReactDOM.render(
  <Provider store={store}>
    <App />
  </Provider>,
  document.getElementById('root')
);
