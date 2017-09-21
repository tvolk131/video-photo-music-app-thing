import React, { Component } from 'react';
import { connect } from 'react-redux';
import { match } from 'react-router';
import { gql, graphql } from 'react-apollo';
import PropTypes from 'prop-types';

import Paper from 'material-ui/Paper';
import Card, { CardContent, CardMedia, CardText, CardTitle } from 'material-ui/Card';
import Typography from 'material-ui/Typography';
import Button from 'material-ui/Button';
import ModeEditIcon from 'material-ui-icons/ModeEdit';

import Loading from './Loading.jsx';

const propTypes = {
  project: PropTypes.object,
  loading: PropTypes.bool.isRequired,
  error: PropTypes.bool,
  currentUser: PropTypes.object,
  toggleEditProject: PropTypes.func.isRequired
};

const overlayStyle = {
  width: '100%',
  minHeight: 40,
  top: -40,
  position: 'relative',
  background: 'rgba(0,0,0,0.5)'
};
// background: 'linear-gradient(to bottom, rgba(0, 0, 0, 0.2), rgba(0,0,0,0.5))'

const ProjectCard = ({ project, loading, error, currentUser, toggleEditProject }) => (
  loading &&
  <Loading />

  ||

  error &&
  <Paper style={{padding: 25}}>
    <h2>Project info not found</h2>
  </Paper>

  ||

  project &&
  <Paper>
    <img src={project.thumbnailUrl || 'https://www.velo-nice.info/img/folder.svg'} style={{width: '100%', objectFit: 'cover'}}/>
    <div style={overlayStyle}>
      <Typography type="title" style={{textAlign: 'left', padding: 10, color: 'white', whiteSpace: 'nowrap', overflow: 'hidden', textOverflow: 'ellipsis'}}>{project.name}</Typography>
    </div>
    {
      currentUser &&
      currentUser.username === project.owner.username &&
      <div style={{textAlign: 'right'}}>
        <Button
          fab
          color="accent"
          aria-label="edit"
          onClick={toggleEditProject}
          style={{
            textAlign: 'right',
            float: 'inherit',
            top: '-70'
          }}>
          <ModeEditIcon />
        </Button>
        <Typography style={{padding: 10, textAlign: 'left', marginTop: -100, paddingBottom: 0}}>{project.tagline}</Typography>
        <Typography style={{padding: 10, textAlign: 'left', marginTop: -5}}>{project.description}</Typography>
      </div>
    }
    {
      (currentUser && currentUser.username !== project.owner.username) &&
      <div>
        <Typography style={{padding: 10, textAlign: 'left', marginTop: -40, paddingBottom: 0}}>{project.tagline}</Typography>
        <Typography style={{padding: 10, textAlign: 'left'}}>{project.description}</Typography>
      </div>

      ||

      !currentUser &&
      <div>
        <Typography style={{padding: 10, textAlign: 'left', marginTop: -40, paddingBottom: 0}}>{project.tagline}</Typography>
        <Typography style={{padding: 10, textAlign: 'left'}}>{project.description}</Typography>
      </div>
    }
  </Paper>
);

ProjectCard.propTypes = propTypes;

export default ProjectCard;