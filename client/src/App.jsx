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

import logo from './logo.svg';
import './App.css';

import {
  ApolloClient,
  ApolloProvider
} from 'react-apollo';

const client = new ApolloClient();

class App extends Component {
  render() {

    return (
      <ApolloProvider client={client}>
        <div className="App">
          <Nav />
          <Route exact path='/search' component={Search}/>
          <Route exact path='/project' component={Project}/>
          <Route exact path='/user/:username' component={UserProfile}/>
          <Route exact path='/settings' component={Settings}/>
          <Route exact path='/login' component={Login}/>
          <Route exact path='/signup' component={Signup}/>
          <Route exact path='/logout' component={Logout}/>
        </div>
      </ApolloProvider>
    );
  }
}

export default App;
