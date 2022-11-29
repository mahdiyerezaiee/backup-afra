import React from 'react';
import ReactDOM from 'react-dom/client';
import{PersistGate} from 'redux-persist/integration/react';
import reportWebVitals from './reportWebVitals';
import App from './container/App';
import { Provider } from 'react-redux';
import { store, Persistor } from './store/index';



const root = ReactDOM.createRoot(document.getElementById('root'));
root.render(

    <Provider store={store}>
   
        <PersistGate Loading={null} persistor={Persistor} >
          <App />
          </PersistGate>

    </Provider>
  
);

// If you want to start measuring performance in your app, pass a function
// to log results (for example: reportWebVitals(console.log))
// or send to an analytics endpoint. Learn more: https://bit.ly/CRA-vitals
// mahmood
reportWebVitals();
