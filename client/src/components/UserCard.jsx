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

const propTypes = {
  user: PropTypes.object,
  loading: PropTypes.bool.isRequired,
  error: PropTypes.bool,
  currentUser: PropTypes.object,
  toggleEditUser: PropTypes.func.isRequired
};

const UserCard = ({ user, loading, error, currentUser, toggleEditUser }) => (
  loading &&
  <Paper style={{padding: 25}}>
    <CircularProgress/>
  </Paper>

  ||

  error &&
  <Paper style={{padding: 25}}>
    <h2>User not found</h2>
  </Paper>

  ||

  user &&
  <Paper>
    <img src={user.avatarUrl || 'https://cdn2.lobster.media/assets/default_avatar-afa14913913cc117c73f1ac69496d74e.png'} style={{width: '100%'}}/>
    <div style={{textAlign: 'left', padding: 10}}>
      {
        currentUser &&
        currentUser.username === user.username &&
        <Button
          fab
          color="accent"
          aria-label="edit"
          onClick={toggleEditUser}
          style={{
            textAlign: 'right',
            float: 'right',
            top: '-35'
          }}>
          <ModeEditIcon />
        </Button>
      }
      <Typography>{user.name}</Typography>
      <Typography>{user.username}</Typography>
      <Typography>{user.email}</Typography>
      <Typography>Bio:</Typography>
      <Typography>{user.description}</Typography>
    </div>
  </Paper>
);

UserCard.propTypes = propTypes;

export default UserCard;