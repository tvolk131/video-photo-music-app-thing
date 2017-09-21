import { createStore, applyMiddleware, compose } from 'redux';
import axiosMiddleware from 'redux-axios-middleware';
import axios from 'axios';
import { reducer } from './reducers';

let client = axios.create({
  baseURL: 'http://localhost:9200',
  responseType: 'json'
});

const composeEnhancers = window.__REDUX_DEVTOOLS_EXTENSION_COMPOSE__ || compose;

let store = createStore(
  reducer,
  composeEnhancers(applyMiddleware(axiosMiddleware(client)))
);

export default store;