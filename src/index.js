import React from 'react';
import ReactDOM from 'react-dom';
import { Provider } from 'react-redux';
import Refresh from './components/Authenticate/Refresh'
import store from './store';
import AppRouter from './AppRouter';
import './styles.css';

const url =  (window.location.hostname === "localhost" || window.location.hostname === "127.0.0.1" || window.location.hostname === "") ? 'http://127.0.0.1:5000/' : 'https://backendtempoture.herokuapp.com/';

ReactDOM.render(
  <Refresh>
    <Provider store={store}>
      <AppRouter />
    </Provider>
  </Refresh>,
  document.getElementById('root')
);
export {url};