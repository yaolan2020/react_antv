import React from 'react';
import ReactDOM from 'react-dom/client';
import App from './app';
import './index.less';
// mobx
import { Provider } from 'mobx-react';
import store from 'store/index';

const root = ReactDOM.createRoot(document.getElementById('app'));
root.render(
  <Provider {...store}>
    <App />
  </Provider>
);
