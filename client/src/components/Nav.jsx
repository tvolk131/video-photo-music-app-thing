import React, { Component } from 'react';
import { connect } from 'react-redux';
import { NavLink } from 'react-router-dom';
import { graphql, gql } from 'react-apollo';

import AppBar from 'material-ui/AppBar';
import Avatar from 'material-ui/Avatar';
import Toolbar from 'material-ui/Toolbar';
import Typography from 'material-ui/Typography';
import Button from 'material-ui/Button';
import IconButton from 'material-ui/IconButton';
import MenuIcon from 'material-ui-icons/Menu';
import ChevronLeftIcon from 'material-ui-icons/ChevronLeft';
import Drawer from 'material-ui/Drawer';
import Divider from 'material-ui/Divider';
import Input from 'material-ui/Input';
import Paper from 'material-ui/Paper';
import { CircularProgress } from 'material-ui/Progress';
import List, {
  ListItem,
  ListItemIcon,
  ListItemText,
  ListItemAvatar
} from 'material-ui/List';

import {
  AccountCircle,
  Search,
  Settings,
  PermMedia,
  ExitToApp
} from 'material-ui-icons';

import { toggleNavDrawer } from '../redux/actions/controlActions';
import { logout } from '../redux/actions/sessionActions';

class Nav extends Component {

  render() {
    const { navDrawerOpen, toggleNavDrawer } = this.props;
    const navItemStyle = {textDecoration: 'none'};
    
    const generateUserHeader = () => {
      const { user } = this.props.data;

      if (this.props.data.error) {
        return (
          <NavLink
            to='/login'
            onClick={toggleNavDrawer}
            style={navItemStyle}
          >
            <ListItem>
              <ListItemIcon>
                <ExitToApp />
              </ListItemIcon>
              <ListItemText primary='Login / Signup'/>
            </ListItem>
          </NavLink>
        );
      } else if (this.props.data.loading) {
        return (
          <Paper style={{padding: 5}}>
            <CircularProgress/>
          </Paper>
        );
      } else {
        return (
          <ListItem divider>
            <ListItemAvatar>
              {user.avatarUrl ?
                <Avatar src={user.avatarUrl}></Avatar>
                :
                <Avatar style={{
                  margin: 0,
                  padding: 2,
                  color: '#fff',
                  backgroundColor: '#3f51b5',
                }}>
                  {user.name.split(' ')[0][0] + user.name.split(' ')[1][0]}
                </Avatar>
              }
            </ListItemAvatar>
            <ListItemText
              primary={user.name}
              secondary={user.email}
              style={{textAlign: 'left'}}
            />
            <Divider inset />
          </ListItem>
        );
      }
    };

    return (
      <div>
        <AppBar position='static'>
          <Toolbar disableGutters>
            <IconButton
              color='contrast'
              aria-label='Menu'
              onClick={toggleNavDrawer}
            >
              <MenuIcon />
            </IconButton>
            <Input
              autoFocus
              placeholder='Search for projects'
              style={{color: 'white'}}
            />
          </Toolbar>
        </AppBar>

        <Drawer
          open={navDrawerOpen}
          elevation={1}  
        >
          <IconButton onClick={toggleNavDrawer}>
            <ChevronLeftIcon />
          </IconButton>
          <div style={{width: 250}}>
            <List>
              {generateUserHeader()}

              <NavLink
                to='/search'
                onClick={toggleNavDrawer}
                style={navItemStyle}
              >
                <ListItem>
                  <ListItemIcon>
                    <Search />
                  </ListItemIcon>
                  <ListItemText primary='Search'/>
                </ListItem>
              </NavLink>

              {this.props.data.user &&
                <div>
                  <NavLink
                    to={`/user/${this.props.data.user.username}`}
                    onClick={toggleNavDrawer}
                    style={navItemStyle}
                  >
                    <ListItem>
                      <ListItemIcon>
                        <PermMedia />
                      </ListItemIcon>
                      <ListItemText primary='My Projects'/>
                    </ListItem>
                  </NavLink>

                  <NavLink
                    to={`/user/${this.props.data.user.username}`}
                    onClick={toggleNavDrawer}
                    style={navItemStyle}
                  >
                    <ListItem>
                      <ListItemIcon>
                        <AccountCircle />
                      </ListItemIcon>
                      <ListItemText primary='My profile'/>
                    </ListItem>
                  </NavLink>

                  <NavLink
                    to='/settings'
                    onClick={toggleNavDrawer}
                    style={navItemStyle}
                  >
                    <ListItem>
                      <ListItemIcon>
                        <Settings />
                      </ListItemIcon>
                      <ListItemText primary='Settings'/>
                    </ListItem>
                  </NavLink>

                  <NavLink
                    to='/logout'
                    onClick={this.props.logout}
                    style={navItemStyle}
                  >
                    <ListItem>
                      <ListItemIcon>
                        <ExitToApp />
                      </ListItemIcon>
                      <ListItemText primary='Logout'/>
                    </ListItem>
                  </NavLink>
                </div>
              }

            </List> 
          </div>
        </Drawer>
      </div>
    );
  }
}

const currentUserQuery = gql`
  query currentUserQuery {
    user {
      name
      username
      avatarUrl
      email
    }
  }
`;

const mapStateToProps = state => state.control;

const mapDispatchToProps = dispatch => {
  return {
    toggleNavDrawer: () => dispatch(toggleNavDrawer()),
    logout: () => dispatch(logout())
  };
};

const NavWithState = connect(
  mapStateToProps,
  mapDispatchToProps
)(Nav);

export default graphql(currentUserQuery)(NavWithState);