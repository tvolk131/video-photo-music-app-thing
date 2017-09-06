import React, { Component } from 'react';
import { connect } from 'react-redux';
import { NavLink } from 'react-router-dom';

import AppBar from 'material-ui/AppBar';
import Toolbar from 'material-ui/Toolbar';
import Typography from 'material-ui/Typography';
import Button from 'material-ui/Button';
import IconButton from 'material-ui/IconButton';
import MenuIcon from 'material-ui-icons/Menu';
import ChevronLeftIcon from 'material-ui-icons/ChevronLeft';
import Drawer from 'material-ui/Drawer';
import Divider from 'material-ui/Divider';
import Input from 'material-ui/Input';
import List, { ListItem, ListItemIcon, ListItemText } from 'material-ui/List';
import {
  AccountCircle,
  Search,
  Settings,
  PermMedia,
  BugReport
} from 'material-ui-icons';

import { toggleNavDrawer } from '../redux/actions/controlActions';


class Nav extends Component {

  render() {
    const { navDrawerOpen, toggleNavDrawer } = this.props;
    const navItemStyle = {textDecoration: 'none'};
    
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
              <ListItem divider></ListItem>

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

              <NavLink
                to='/projects'
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
                to='/profile'
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
                to='/login'
                onClick={toggleNavDrawer}
                style={navItemStyle}
              >
                <ListItem>
                  <ListItemIcon>
                    <BugReport />
                  </ListItemIcon>
                  <ListItemText primary='Login'/>
                </ListItem>
              </NavLink>

              <NavLink
                to='/logout'
                onClick={toggleNavDrawer}
                style={navItemStyle}
              >
                <ListItem>
                  <ListItemIcon>
                    <BugReport />
                  </ListItemIcon>
                  <ListItemText primary='Logout'/>
                </ListItem>
              </NavLink>

              <NavLink
                to='/signup'
                onClick={toggleNavDrawer}
                style={navItemStyle}
              >
                <ListItem>
                  <ListItemIcon>
                    <BugReport />
                  </ListItemIcon>
                  <ListItemText primary='Signup'/>
                </ListItem>
              </NavLink>

            </List> 
          </div>
        </Drawer>
      </div>
    );
  }
}

const mapStateToProps = state => state.control;

const mapDispatchToProps = dispatch => {
  return {
    toggleNavDrawer: () => dispatch(toggleNavDrawer())
  };
};

export default connect(
  mapStateToProps,
  mapDispatchToProps
)(Nav);