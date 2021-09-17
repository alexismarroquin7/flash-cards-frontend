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

const middleware = applyMiddleware(thunk, logger);
const store = createStore(rootReducer, middleware);

ReactDOM.render(
  <Provider store={store}>
    <Router>
      <App />
    </Router>
  </Provider>,
  document.getElementById('root')
);
