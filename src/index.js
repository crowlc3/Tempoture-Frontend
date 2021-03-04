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
