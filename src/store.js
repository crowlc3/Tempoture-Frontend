import { createStore, combineReducers, applyMiddleware, compose } from 'redux';
import thunk from 'redux-thunk';

const composeEnhancers = window.__REDUX_DEVTOOLS_EXTENSION_COMPOSE__ || compose;

const store = createStore(
  combineReducers({
   /* Reducers go here when made */
  }),
  composeEnhancers(applyMiddleware(thunk))
  /* Enhancers go here when needed */
);

export default store;