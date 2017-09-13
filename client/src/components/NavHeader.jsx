import React from 'react';
import { NavLink } from 'react-router-dom';

import Avatar from 'material-ui/Avatar';
import Divider from 'material-ui/Divider';
import { CircularProgress } from 'material-ui/Progress';

import {
  ListItemAvatar,
  ListItem,
  ListItemIcon,
  ListItemText
} from 'material-ui/List';

import { ExitToApp } from 'material-ui-icons';

const NavHeader = ({ data: { user, loading, error }, toggleNavDrawer }) => (

  error &&
  <NavLink
    to='/login'
    onClick={toggleNavDrawer}
    style={{textDecoration: 'none'}}
  >
    <ListItem>
      <ListItemIcon>
        <ExitToApp />
      </ListItemIcon>
      <ListItemText primary='Login / Signup'/>
    </ListItem>
  </NavLink>

  ||

  loading &&
  <Paper style={{padding: 5}}>
    <CircularProgress/>
  </Paper>

  ||

  user &&
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
          {user.username[0]}
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

export default NavHeader;