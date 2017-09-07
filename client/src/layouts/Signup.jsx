import React from 'react';
import axios from 'axios';
import { NavLink } from 'react-router-dom';
import TextField from 'material-ui/TextField';
import Button from 'material-ui/Button';
import Snackbar from 'material-ui/Snackbar';

class Signup extends React.Component {
  constructor(props) {
    super(props);
    this.state = {
      username: '',
      password: '',
      errorMessage: '',
      showError: false
    }
    this.handleInputChange = this.handleInputChange.bind(this);
    this.sendSignupRequest = this.sendSignupRequest.bind(this);
    this.handleKeyPress = this.handleKeyPress.bind(this);
    this.showError = this.showError.bind(this);
    this.hideError = this.hideError.bind(this);
  }

  handleInputChange (property, e) {
    let stateChange = {};
    stateChange[property] = e.target.value;
    this.setState(stateChange);
  }

  handleKeyPress (e) {
    if (e.key === 'Enter') {
      this.sendSignupRequest();
    }
  }

  sendSignupRequest () {
    if (this.state.username && this.state.password) {
      axios.post('/signup', {
        username: this.state.username,
        password: this.state.password
      })
      .then((res) => {
        window.location.replace(res.request.responseURL); // Performs redirect to proper page
        return res;
      })
      .catch((err) => {
        this.setState({errorMessage: 'Username is invalid or already in use'});
        this.showError();
      });
    } else {
      let missingVals = [];
      if (!this.state.username) {
        missingVals.push('username');
      }
      if (!this.state.password) {
        missingVals.push('password');
      }
      let errorString = 'Incomplete! You are missing';
      for (let i = 0; i < missingVals.length; i++) {
        if (i === missingVals.length - 1 && missingVals.length > 1) {
          errorString += ', and ' + missingVals[i];
        } else if (i === 0) {
          errorString += ' ' + missingVals[i];
        } else {
          errorString += ', ' + missingVals[i];
        }
      }
      this.setState({errorMessage: errorString});
      this.showError();
    }
  }

  showError () {
    this.setState({showError: true});
  }
  hideError () {
    this.setState({showError: false});
  }

  render() {
    const navItemStyle = {textDecoration: 'none'};
    return (
      <div className='signup center'>
        <h1>Signup</h1>
        <TextField onKeyPress={this.handleKeyPress} placeholder='joeswanson@familyguy.com' label='Username' type='text' value={this.state.email} onChange={this.handleInputChange.bind(this, 'username')} /><br/>
        <TextField onKeyPress={this.handleKeyPress} label='Password' type='password' value={this.state.password} onChange={this.handleInputChange.bind(this, 'password')} /><br/>
        <Button raised className='btn' onClick={this.sendSignupRequest}>Signup</Button>
        <NavLink
          to='/login'
          style={navItemStyle}
        >
        <Button className='btn' href='/login'>Login</Button>
        </NavLink>
        <Snackbar open={this.state.showError} message={this.state.errorMessage} autoHideDuration={4000} onRequestClose={this.hideError} />
      </div>
    ) 
  }
}

export default Signup;