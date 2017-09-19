import React, { Component } from 'react';
import PropTypes from 'prop-types';
import { BrowserRouter as Router, Route} from 'react-router';
import { withRouter } from 'react-router-dom';
import { connect } from 'react-redux';
import { MuiThemeProvider } from 'material-ui/styles';

import SnackBar from 'material-ui/Snackbar';
import Typography from 'material-ui/Typography';

import Nav from './containers/Nav';
import Search from './layouts/Search.jsx';
import Project from './layouts/Project.jsx';
import User from './layouts/User.jsx';
import Settings from './layouts/Settings.jsx';
import Login from './layouts/Login.jsx';
import Signup from './layouts/Signup.jsx';
import CreateProject from './components/CreateProject.jsx';

import { clearAlert } from './actions/controlActions.js';
import themes from './themes';

import logo from './logo.svg';
import './App.css';

const propTypes = {
  theme: PropTypes.number,
  alert: PropTypes.object,
  clearAlert: PropTypes.func
};
const defaultTheme = 0;


const App = ({ theme, alert, clearAlert }) => (
  <MuiThemeProvider theme={themes.get(theme)}>
    <div className="App">
      <Nav />
      <switch>
        <Route exact path='/' component={Search}/>
        <Route exact path='/search' component={Search}/>
        <Route
          exact
          path='/project/:username/:projectName'
          component={Project}
        />
        <Route exact path='/project/create' component={CreateProject}/>
        <Route exact path='/user/:username' component={User}/>
        <Route exact path='/settings' component={Settings}/>
        <Route exact path='/login' component={Login}/>
        <Route exact path='/signup' component={Signup}/>
      </switch>
      <SnackBar
        open={alert.message}
        onEnter={() => {
          setTimeout(clearAlert, 3500);
        }}
        message={alert.message}
        type='display1'
        anchorOrigin={{
          vertical: 'bottom',
          horizontal: 'right'
        }}
        SnackbarContentProps={alert.type === 'error' ? {
          style: {
            backgroundColor: '#d50000',
            color: 'white'
          }
        } : {}}
      />
    </div>
  </MuiThemeProvider>
);

App.propTypes = propTypes;

const mapStateToProps = state => ({
  theme: state.session.currentUser ? state.session.currentUser.theme : 0,
  alert: state.control.alert
});

const mapDispatchToProps = dispatch => ({
  clearAlert() {
    dispatch(clearAlert());
  }
});

export default withRouter(connect(mapStateToProps, mapDispatchToProps)(App));
