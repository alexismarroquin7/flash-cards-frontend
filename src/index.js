import React from 'react';
import ReactDOM from 'react-dom';

import App from './App';

import { BrowserRouter as Router } from "react-router-dom";

// store
import { createStore, applyMiddleware } from "redux";
import { Provider } from "react-redux";
import thunk from "redux-thunk";
import logger from "redux-logger";
import { rootReducer } from "./store";

import './index.css';

const persistedState = localStorage.getItem('reduxState') 
? JSON.parse(localStorage.getItem('reduxState'))
: {};

const middleware = applyMiddleware(thunk, logger);
const store = createStore(rootReducer, persistedState, middleware);

store.subscribe(() => {
  localStorage.setItem(
    'reduxState',
    JSON.stringify(store.getState())
  );
});

ReactDOM.render(
  <Provider store={store}>
    <Router>
      <App />
    </Router>
  </Provider>,
  document.getElementById('root')
);
