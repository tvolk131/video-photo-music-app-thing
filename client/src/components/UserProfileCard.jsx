import React, { Component } from 'react';
import { connect } from 'react-redux';
import { match } from 'react-router';
import { gql, graphql } from 'react-apollo';

import Grid from 'material-ui/Grid';
import Paper from 'material-ui/Paper';
import Card, { CardContent, CardMedia, CardTitle } from 'material-ui/Card';
import { CircularProgress } from 'material-ui/Progress';
import Typography from 'material-ui/Typography';


class UserProfileCard extends Component {

  render() {

    if (this.props.data.loading) {
      return (
        <Paper style={{padding: 25}}>
          <CircularProgress/>
        </Paper>
      );
    } else {

      const {
        avatarUrl,
        name,
        username,
        description
      } = this.props.data.user;
    
      return (
        <Paper>
          <img src='https://s3-us-west-1.amazonaws.com/qraft-image-files/stock+male+1.jpeg' style={{width: '100%'}}/>
          <div style={{textAlign: 'left', padding: 10}}>
            <h3>{name}</h3>
            <Typography>{username}</Typography>
            <Typography>Bio:</Typography>
            <Typography>{description}</Typography>
          </div>
        </Paper>
      );
    }
  }
}

const userQuery = gql`
  query userQuery($username: String!) {
    user(username: $username) {
      name
      username
      description
      avatarUrl
    }
  }
`;

export default graphql(userQuery, {
  options: ({ username }) => ({variables: { username }})
})(UserProfileCard);