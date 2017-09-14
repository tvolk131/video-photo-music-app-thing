import React, { Component } from 'react';
import { connect } from 'react-redux';
import { gql, graphql } from 'react-apollo';

import Grid from 'material-ui/Grid';
import Paper from 'material-ui/Paper';
import Card, { CardContent, CardMedia } from 'material-ui/Card';
import Typography from 'material-ui/Typography';

import UserCard from '../components/UserCard.jsx';

class User extends Component {
  render() {
    const { username } = this.props.match.params;
    return (
      <div>
        <Grid container spacing={24} style={{
          padding: '2%',
          margin: 0,
          width: '100%'
        }}>
          <Grid sm lg/>
          <Grid item xs={12} sm={12} md={4} lg={3}>
            <UserCard username={username}/>
          </Grid>

          <Grid item xs={12} sm={12} md={8} lg={6}>
            <Paper style={{height: 400}} />
          </Grid>
          
          <Grid sm lg/>
        </Grid>
        <Grid container spacing={8} style={{
          padding: '2%',
          margin: 0,
          width: '100%'
        }}>
          <Grid item lg />  
          <Grid item md={4} lg={3} />
          <Grid item xs={12} sm={12} md={12} lg={6}>
            <Paper style={{height: 400}} />
          </Grid>
          <Grid item lg />
        </Grid>
      </div>
    );
  }
}

const mapStateToProps = state => state.session.currentUser;

export default connect(mapStateToProps)(User);