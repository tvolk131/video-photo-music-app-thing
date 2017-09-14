import React, { Component } from 'react';
import { BrowserRouter as Router, Route} from 'react-router';

import { client } from './redux/reducers';
import store from './redux/store.js';

import Nav from './components/Nav.jsx';
import Search from './layouts/Search.jsx';
import Project from './layouts/Project.jsx';
import UserProfile from './layouts/UserProfile.jsx';
import Settings from './layouts/Settings.jsx';
import Login from './layouts/Login.jsx';
import Signup from './layouts/Signup.jsx';

import themes from './themes';

import { MuiThemeProvider } from 'material-ui/styles';

import logo from './logo.svg';
import './App.css';

import {
  ApolloClient,
  ApolloProvider
} from 'react-apollo';

const App = () => (
  <ApolloProvider client={client} store={store}>
    <MuiThemeProvider theme={themes.get(1)}>
      <div className="App">
        <Nav />
        <Route exact path='/' component={Search}/>
        <Route exact path='/search' component={Search}/>
        <Route
          exact
          path='/project/:username/:projectName'
          component={Project}
        />
        <Route exact path='/user/:username' component={UserProfile}/>
        <Route exact path='/settings' component={Settings}/>
        <Route exact path='/login' component={Login}/>
        <Route exact path='/signup' component={Signup}/>
      </div>
    </MuiThemeProvider>
  </ApolloProvider>
);

export default App;
