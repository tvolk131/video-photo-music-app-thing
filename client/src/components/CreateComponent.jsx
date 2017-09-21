import React, { Component } from 'react';
import { connect } from 'react-redux';
import { match } from 'react-router';
import { gql, graphql } from 'react-apollo';

import Grid from 'material-ui/Grid';
import Paper from 'material-ui/Paper';
import { CircularProgress } from 'material-ui/Progress';
import Typography from 'material-ui/Typography';
import Button from 'material-ui/Button';
import IconButton from 'material-ui/IconButton';
import ModeEditIcon from 'material-ui-icons/ModeEdit';
import ExpandMoreIcon from 'material-ui-icons/ExpandMore';
import Loading from './Loading.jsx';
import Upload from './Upload.jsx';
import TextField from 'material-ui/TextField';
import Switch from 'material-ui/Switch';
import Divider from 'material-ui/Divider';
import Collapse from 'material-ui/transitions/Collapse';

const CreateComponent = ({toggleEditProject, toggleCreateComponentExpanded, createComponentExpanded}) => {

  return (
    <Paper>
      <Typography type='title' style={{padding: 10}}> Create Component </Typography>
      <IconButton
        onClick={() => toggleCreateComponentExpanded()}
        aria-expanded={createComponentExpanded}
        aria-label="Show more"
      >
        <ExpandMoreIcon />
      </IconButton>
      <Collapse in={createComponentExpanded} transitionDuration="auto" unmountOnExit>
        <Divider style={{width: '90%', marginLeft: 'auto', marginRight: 'auto'}} />
        <Typography style={{margin: 5}}>Upload file:</Typography>
        <Upload />
        <form style={{textAlign: 'left', padding: 10}} onSubmit={e => {
          let from = e.target;
          e.preventDefault();
          toggleEditProject();
        }}>
          <TextField label="Name" placeholder="My Awesome Component!" style={{width: '100%'}} />
          <TextField label="Description" placeholder="This component is part of what helps make the project so cool..." multiline style={{width: '100%'}} />
          <Typography style={{marginTop: '16px'}}>Should it be downloadable?</Typography>
          <Switch label="Download" />
          <Button color='primary' raised type="submit" style={{marginBottom: 10, marginTop: 10, width: '100%'}}>
            Submit
          </Button>
          <Button
            color='default'
            raised
            type="cancel"
            style={{width: '100%'}}
            onClick={toggleEditProject}
          >
            Cancel
          </Button>
        </form>
      </Collapse>
    </Paper>
  );
};

export default CreateComponent;