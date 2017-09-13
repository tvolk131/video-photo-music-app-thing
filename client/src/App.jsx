import React, { Component } from 'react';
import { BrowserRouter as Router, Route} from 'react-router';

import Nav from './components/Nav.jsx';
import Search from './layouts/Search.jsx';
import Project from './layouts/Project.jsx';
import UserProfile from './layouts/UserProfile.jsx';
import Settings from './layouts/Settings.jsx';
import Login from './layouts/Login.jsx';
import Signup from './layouts/Signup.jsx';
import Logout from './layouts/Logout.jsx';

import themes from './themes';

import { MuiThemeProvider } from 'material-ui/styles';

import logo from './logo.svg';
import './App.css';

import {
  ApolloClient,
  ApolloProvider,
  createNetworkInterface
} from 'react-apollo';

const networkInterface = createNetworkInterface({
  uri: '/graphql',
  opts: {
    credentials: 'same-origin',
  },
});

const client = new ApolloClient({networkInterface});

class App extends Component {
  render() {
    return (
      <ApolloProvider client={client}>
        <MuiThemeProvider theme={themes.get(1)}>
          <div className="App">
            <Nav />
            <Route exact path='/' component={Search}/>
            <Route exact path='/search' component={Search}/>
            <Route
              exact
              path='/project/:username/:projectName' component={Project}
            />
            <Route exact path='/user/:username' component={UserProfile}/>
            <Route exact path='/settings' component={Settings}/>
            <Route exact path='/login' component={Login}/>
            <Route exact path='/signup' component={Signup}/>
            <Route exact path='/logout' component={Logout}/>
          </div>
        </MuiThemeProvider>
      </ApolloProvider>
    );
  }
}

export default App;
