import React, { Component } from 'react';
import { Paper, Typography, Button, TextField } from 'material-ui';
import Dialog, {
  DialogActions,
  DialogContent,
  DialogContentText,
  DialogTitle,
} from 'material-ui/Dialog';

const styles = {
  button: {
    margin: 10
  },
  textField: {
    margin: 5
  }
};

class PasswordChanger extends Component {
  constructor (props) {
    super(props);
    this.state = {
      currentPassword: '',
      newPassword: '',
      dialogOpen: false
    };
    this.changePassword = this.changePassword.bind(this);
    this.closeDialog = this.closeDialog.bind(this);
  }

  changePassword () {
    this.closeDialog();
    // TODO - Send Apollo query that changes user's password
    this.setState({currentPassword: '', newPassword: ''});
  }

  closeDialog () {
    this.setState({dialogOpen: false});
  }

  render () {
    return (
      <div>
        <Paper style={this.props.style}>
          <Typography type="headline" component="h3">
            Change Password
          </Typography>
          <div>
            <TextField
              style={styles.textField}
              label='Current Password'
              type='password'
              value={this.state.currentPassword}
              onChange={(e) => {this.setState({currentPassword: e.target.value})}}
            />
            <TextField
              style={styles.textField}
              label='New Password'
              type='password'
              value={this.state.newPassword}
              onChange={(e) => {this.setState({newPassword: e.target.value})}}
            />
            <br/>
            <Button color='primary' disabled={!(this.state.currentPassword && this.state.newPassword)} raised onClick={() => {this.setState({dialogOpen: true})}} style={styles.button}>
              Submit
            </Button>
          </div>
        </Paper>
        <Dialog open={this.state.dialogOpen} onRequestClose={this.closeDialog}>
          <DialogTitle>{'Really???'}</DialogTitle>
          <DialogContent>
            <DialogContentText>
              This action is not reversible. Are you absolutely sure you want to change your password?
            </DialogContentText>
          </DialogContent>
          <DialogActions>
            <Button onClick={this.closeDialog} color='primary'>
              Cancel
            </Button>
            <Button onClick={this.changePassword} color='primary'>
              Yes, change it!
            </Button>
          </DialogActions>
        </Dialog>
      </div>
    );
  }
}

export default PasswordChanger;