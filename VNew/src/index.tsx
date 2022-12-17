import React from 'react';
import ReactDOM from 'react-dom/client';
import App from './App';
import './assets/css/vendor/bootstrap.min.css';
import './assets/css/vendor/bootstrap.rtl.only.min.css';
import 'bootstrap/dist/css/bootstrap.min.css';
import './assets/css/sass/NavBar.scss'
import './assets/css/app-rtl.css';
import 'react-perfect-scrollbar/dist/css/styles.css';
import {store} from "./store";
import {Provider} from "react-redux";

const root = ReactDOM.createRoot(
  document.getElementById('root') as HTMLElement
);
root.render(
  <React.StrictMode>
      <Provider store={store}>
          <App />

      </Provider>
  </React.StrictMode>
);

