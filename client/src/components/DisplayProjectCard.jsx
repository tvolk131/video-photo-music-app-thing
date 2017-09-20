import React, { Component } from 'react';
import { connect } from 'react-redux';
import { match } from 'react-router';
import PropTypes from 'prop-types';

import Paper from 'material-ui/Paper';

import Loading from './Loading.jsx';
import ProjectCard from '../components/ProjectCard.jsx';
import EditProjectCard from '../components/EditProjectCard.jsx';

const propTypes = {
  project: PropTypes.object,
  loading: PropTypes.bool.isRequired,
  error: PropTypes.bool,
  currentUser: PropTypes.object,
  toggleEditProject: PropTypes.func.isRequired,
  editingProject: PropTypes.bool.isRequired
};

const DisplayProjectCard = ({ project, loading, error, currentUser, toggleEditProject, editingProject}) => (
  loading &&
  <Loading />

  ||

  error &&
  <Paper style={{padding: 25}}>
    <h2>Project info not found</h2>
  </Paper>

  ||

  editingProject &&
  <EditProjectCard 
    currentUser={currentUser}
    error={error}
    loading={loading}
    project={project}
    toggleEditProject={toggleEditProject}
  />

  ||

  !editingProject &&
  <ProjectCard 
    currentUser={currentUser}
    error={error}
    loading={loading}
    project={project}
    toggleEditProject={toggleEditProject}
  />
);

export default DisplayProjectCard;