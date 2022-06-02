import React from 'react';
import { HashRouter } from 'react-router-dom';
import {createRoot} from 'react-dom/client';
import { Provider } from 'react-redux';
import * as serviceWorkerRegistration from './serviceWorkerRegistration';

import './index.css';
import App from './App';
import store from './store/index';

serviceWorkerRegistration.register();

const root = createRoot(document.getElementById('root')); 
root.render(
  <Provider store={store}>
    <HashRouter>
      <App />
    </HashRouter>
  </Provider>
);