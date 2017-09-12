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

import { MuiThemeProvider, createMuiTheme } from 'material-ui/styles';
import purple from 'material-ui/colors/purple';
import green from 'material-ui/colors/green';
import red from 'material-ui/colors/red';

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
    let theme = createMuiTheme({
      palette: {
        primary: purple,
        secondary: green,
        error: red
      }
    });

    return (
      <ApolloProvider client={client}>
        <MuiThemeProvider theme={theme}>
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
