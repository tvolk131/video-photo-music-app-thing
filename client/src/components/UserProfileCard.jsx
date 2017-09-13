import React, { Component } from 'react';
import { connect } from 'react-redux';
import { match } from 'react-router';
import { gql, graphql } from 'react-apollo';

import Grid from 'material-ui/Grid';
import Paper from 'material-ui/Paper';
import Card, { CardContent, CardMedia, CardTitle } from 'material-ui/Card';
import { CircularProgress } from 'material-ui/Progress';
import Typography from 'material-ui/Typography';
import Button from 'material-ui/Button';
import ModeEditIcon from 'material-ui-icons/ModeEdit';

const UserProfileCard = ({ session, data, data: { user, loading, error } }) => (
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
    <img src={user.avatarUrl} style={{width: '100%'}}/>
    <div style={{textAlign: 'left', padding: 10}}>
      {
        session.currentUser &&
        session.currentUser.username === user.username &&
        <Button fab color="accent" aria-label="edit" style={{
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

const userQuery = gql`
  query userQuery($username: String!) {
    user(username: $username) {
      name
      username
      description
      email
      avatarUrl
    }
  }
`;

const UserProfileCardWithData =  graphql(userQuery, {
  options: ({ username }) => ({variables: { username }})
})(UserProfileCard);

export default connect(
  ({ data, session }) => ({ data, session })
)(UserProfileCardWithData);