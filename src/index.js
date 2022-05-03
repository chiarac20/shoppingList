import React from 'react';
import { BrowserRouter } from 'react-router-dom';
import {createRoot} from 'react-dom/client';
import { Provider } from 'react-redux';

import './index.css';
import App from './App';
import store from './store/index';

const root = createRoot(document.getElementById('root')); 
root.render(
  <Provider store={store}>
    <BrowserRouter>
      <App />
    </BrowserRouter>
  </Provider>
);