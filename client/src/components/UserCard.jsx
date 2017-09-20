import React, { Component } from 'react';
import { connect } from 'react-redux';
import { match } from 'react-router';
import { gql, graphql } from 'react-apollo';
import PropTypes from 'prop-types';

import Grid from 'material-ui/Grid';
import Paper from 'material-ui/Paper';
import Card, { CardContent, CardMedia, CardTitle } from 'material-ui/Card';
import { CircularProgress } from 'material-ui/Progress';
import Typography from 'material-ui/Typography';
import Button from 'material-ui/Button';
import ModeEditIcon from 'material-ui-icons/ModeEdit';
import Divider from 'material-ui/Divider';

import Loading from './Loading.jsx';

const propTypes = {
  user: PropTypes.object,
  loading: PropTypes.bool.isRequired,
  error: PropTypes.bool,
  currentUser: PropTypes.object,
  toggleEditUser: PropTypes.func.isRequired
};

const UserCard = ({ user, loading, error, currentUser, toggleEditUser }) => (
  loading &&
  <Loading />

  ||

  error &&
  <Paper style={{padding: 25}}>
    <h2>User not found</h2>
  </Paper>

  ||

  user &&
  <Paper>
    <img src={user.avatarUrl || 'https://cdn2.lobster.media/assets/default_avatar-afa14913913cc117c73f1ac69496d74e.png'} style={{width: '100%', objectFit: 'cover'}}/>
    {
      currentUser &&
      currentUser.username === user.username &&
      <div>
        <div style={{textAlign: 'right'}}>
          <Button
            fab
            color="accent"
            aria-label="edit"
            onClick={toggleEditUser}
            style={{
              textAlign: 'right',
              float: 'inherit',
              top: '-35'
            }}>
            <ModeEditIcon />
          </Button>
        </div>
        <div style={{textAlign: 'left', padding: 10, marginTop: -55}}>
          <Typography type="title">{user.name}</Typography>
          <Typography color="secondary">Profession: {user.profession}</Typography>
          <Typography color="secondary">Username: {user.username}</Typography>
          <Typography color="secondary">Email: {user.email}</Typography>
          <Divider style={{marginTop: 5, marginBottom: 5}}/>
          <Typography>{user.description}</Typography>
        </div>
      </div>
    }
    {
      currentUser &&
      currentUser.username !== user.username &&
      <div>
        <Typography type="title">{user.name}</Typography>
        <Typography color="secondary">Profession: {user.profession}</Typography>
        <Typography color="secondary">Username: {user.username}</Typography>
        <Typography color="secondary">Email: {user.email}</Typography>
        <Divider style={{marginTop: 5, marginBottom: 5}}/>
        <Typography>{user.description}</Typography>
      </div>
    }
  </Paper>
);

UserCard.propTypes = propTypes;

export default UserCard;