import React from 'react';
import ReactDOM from 'react-dom';
import { Provider } from 'react-redux';
import Refresh from './components/Authenticate/Refresh'
import store from './store';
import AppRouter from './AppRouter';
import './styles.css';

ReactDOM.render(
  <Refresh>
    <Provider store={store}>
      <AppRouter />
    </Provider>
  </Refresh>,
  document.getElementById('root')
);
/*
import React from 'react';
import ReactDOM from 'react-dom';
import './index.css';
import App from './App';
import reportWebVitals from './reportWebVitals';

ReactDOM.render(
  <React.StrictMode>
    <App />
  </React.StrictMode>,
  document.getElementById('root')
);

// If you want to start measuring performance in your app, pass a function
// to log results (for example: reportWebVitals(console.log))
// or send to an analytics endpoint. Learn more: https://bit.ly/CRA-vitals
reportWebVitals();*/
