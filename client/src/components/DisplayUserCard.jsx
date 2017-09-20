import React, { Component } from 'react';
import { connect } from 'react-redux';
import { match } from 'react-router';
import PropTypes from 'prop-types';

import Paper from 'material-ui/Paper';

import Loading from './Loading.jsx';
import UserCard from '../components/UserCard.jsx';
import EditUserCard from '../components/EditUserCard.jsx';

const propTypes = {
  loading: PropTypes.bool.isRequired,
  error: PropTypes.bool,
  currentUser: PropTypes.object,
  toggleEditUser: PropTypes.func.isRequired,
  editingUser: PropTypes.bool.isRequired
};

const DisplayUserCard = ({ currentUser, loading, error, user, toggleEditUser, editingUser}) => (
  loading &&
  <Loading />

  ||

  error &&
  <Paper style={{padding: 25}}>
    <h2>User info not found</h2>
  </Paper>

  ||

  editingUser &&
  <EditUserCard 
    user={currentUser}
    error={error}
    loading={loading}
    toggleEditUser={toggleEditUser}
  />

  ||

  !editingUser &&
  <UserCard 
    user={user}
    error={error}
    loading={loading}
    currentUser={currentUser}
    toggleEditUser={toggleEditUser}
  />
);

export default DisplayUserCard;