import { createStore, applyMiddleware } from 'redux';
import axiosMiddleware from 'redux-axios-middleware';
import axios from 'axios';
import reducer from './reducers';

const client = axios.create({
  baseURL: window.location.hostname,
  responseType: 'json'
});

const store = createStore(
  reducer,
  applyMiddleware(axiosMiddleware(client)),
  window.__REDUX_DEVTOOLS_EXTENSION__ && window.__REDUX_DEVTOOLS_EXTENSION__()
);

export default store;