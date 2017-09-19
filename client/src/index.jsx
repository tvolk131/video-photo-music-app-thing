import React from 'react';
import ReactDOM from 'react-dom';
import { BrowserRouter } from 'react-router-dom';

import { client } from './reducers';
import store from './store.js';
import './index.css';
import App from './App.jsx';
import {
  ApolloClient,
  ApolloProvider
} from 'react-apollo';
// import registerServiceWorker from './registerServiceWorker';

ReactDOM.render((
  <ApolloProvider client={client} store={store}>
    <BrowserRouter basename="/">
      <App />
    </BrowserRouter>
  </ApolloProvider>
), document.getElementById('root'));

// registerServiceWorker();