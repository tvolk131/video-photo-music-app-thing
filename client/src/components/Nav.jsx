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
import Input from 'material-ui/Input';
import Paper from 'material-ui/Paper';
import List, {
  ListItem,
  ListItemIcon,
  ListItemText
} from 'material-ui/List';

import {
  AccountCircle,
  Search,
  Settings,
  PermMedia,
  ExitToApp
} from 'material-ui-icons';

import NavHeader from './NavHeader.jsx';

import { toggleNavDrawer } from '../redux/actions/controlActions';
import { logout, setCurrentUser } from '../redux/actions/sessionActions';

class Nav extends Component {
  componentWillReceiveProps({ setCurrentUser, data: { user }}) {
    setCurrentUser(user);
  }

  render() {
    const { navDrawerOpen, toggleNavDrawer } = this.props;
    const style = {textDecoration: 'none'};

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
              <NavHeader
                data={this.props.data}
                toggleNavDrawer={toggleNavDrawer}
              />

              <NavLink
                to='/search'
                onClick={toggleNavDrawer}
                style={style}
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
                    style={style}
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
                    style={style}
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
                    style={style}
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
                    style={style}
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
      theme
    }
  }
`;

const mapStateToProps = state => state.control;

const mapDispatchToProps = dispatch => {
  return {
    toggleNavDrawer: () => dispatch(toggleNavDrawer()),
    setCurrentUser: (user) => dispatch(setCurrentUser(user)),
    logout: () => dispatch(logout())
  };
};

const NavWithState = connect(
  mapStateToProps,
  mapDispatchToProps
)(Nav);

export default graphql(currentUserQuery)(NavWithState);