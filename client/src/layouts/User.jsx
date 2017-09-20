import React, { Component } from 'react';
import { connect } from 'react-redux';
import { gql, graphql } from 'react-apollo';
import PropTypes from 'prop-types';

import Grid from 'material-ui/Grid';
import Paper from 'material-ui/Paper';
import Card, { CardContent, CardMedia } from 'material-ui/Card';
import Typography from 'material-ui/Typography';

import DisplayUserCard from '../components/DisplayUserCard.jsx';
import ProjectList from '../components/ProjectList.jsx';

import { toggleEditUser } from '../actions/controlActions';

const propTypes = {
  currentUser: PropTypes.object,
  toggleEditUser: PropTypes.func.isRequired,
  data: PropTypes.object.isRequired
};

const User = ({ currentUser, editingUser, toggleEditUser, data }) => (
  <div>
    <Grid container spacing={24} style={{
      padding: '2%',
      margin: 0,
      width: '100%'
    }}>
      <Grid sm lg/>
      <Grid item xs={12} sm={12} md={4} lg={3}>
        <DisplayUserCard
          currentUser={currentUser}
          loading={data.loading}
          error={data.error}
          toggleEditUser={toggleEditUser}
          editingUser={editingUser}
          user={data.user}
        />
      </Grid>

      <Grid item xs={12} sm={12} md={8} lg={6}>
        <Paper>
          { 
            data.user &&
            <ProjectList
              projects={data.user.projects}
            />
          }
        </Paper>
      </Grid>
      
      <Grid sm lg/>
    </Grid>
    {
    // <Grid container spacing={8} style={{
    //   padding: '2%',
    //   margin: 0,
    //   width: '100%'
    // }}>
    //   <Grid item lg />  
    //   <Grid item md={4} lg={3} />
    //   <Grid item xs={12} sm={12} md={12} lg={6}>
    //     <Paper style={{height: 400}} />
    //   </Grid>
    //   <Grid item lg />
    // </Grid>
    }
  </div>
);

const userQuery = gql`
  query userQuery($username: String!) {
    user(username: $username) {
      id
      name
      username
      description
      email
      avatarUrl
      profession
      projects {
        name
        tagline
        owner {
          name
          username
        }
        featuredComponent {
          name
          type
        }
      }
    }
  }
`;

User.propTypes = propTypes;

const mapStateToProps = state => ({
  currentUser: state.session.currentUser,
  editingUser: state.control.editingUser
});

const mapDispatchToProps = dispatch => ({
  toggleEditUser() {
    dispatch(toggleEditUser());
  }
});

const UserWithData = graphql(userQuery, {
  options: ({ match }) => ({variables: {username: match.params.username}})
})(User);

export default connect(mapStateToProps, mapDispatchToProps)(UserWithData);