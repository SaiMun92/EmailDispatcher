import 'materialize-css/dist/css/materialize.min.css';
import React from 'react';
import ReactDOM from 'react-dom';
import { Provider } from 'react-redux';
import { createStore, applyMiddleware } from 'redux';
import reduxThunk from 'redux-thunk';

import App from './components/App';
import reducers from './reducers';

//Development only
import axios from 'axios';
window.axios = axios;


// Created a redux store
const store = createStore(reducers, {}, applyMiddleware(reduxThunk));

// The provider store is a react component that monitors changes in the react store and updates the app component directly
ReactDOM.render(
  <Provider store={store}><App /></Provider>,
  document.querySelector('#root')
);


// console.log('STRIPE KEY IS',process.env.REACT_APP_STRIPE_KEY);
// console.log('Environment is', process.env.NODE_ENV);
