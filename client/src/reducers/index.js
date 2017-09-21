import { ApolloClient, createNetworkInterface } from 'react-apollo';

import { combineReducers } from 'redux';
import control from './control';
import data from './data';
import session from './session';
import search from './search';

const networkInterface = createNetworkInterface({
  uri: '/graphql',
  opts: {
    credentials: 'same-origin',
  },
});

const client = new ApolloClient({networkInterface});

const reducer = combineReducers({
  data: client.reducer(),
  control,
  session,
  search,
  data
});

export { reducer, client };