import React, { Component } from 'react';
import PropTypes from 'prop-types';
import { connect } from 'react-redux';
import { gql, graphql } from 'react-apollo';

import Paper from 'material-ui/Paper';
import Typography from 'material-ui/Typography';
import Button from 'material-ui/Button';
import Loading from './Loading.jsx';
import Upload from './Upload.jsx';
import TextField from 'material-ui/TextField';

import { setUploadedFileUrl } from '../actions/controlActions.js';

const EditProjectCard = ({ project, loading, error, toggleEditProject, submitChanges, uploadedFileUrl, setUploadedFileUrl }) => (
  loading &&
  <Loading />

  ||

  error &&
  <Paper style={{padding: 25}}>
    <Typography style={{fontSize: 20}}>Project info not found</Typography>
  </Paper>

  ||

  project &&
  <Paper>
    <Typography style={{paddingTop: 10, marginBottom: 5}}>Upload a new thumbnail image:</Typography>
    <Upload 
      allowedType="image"
      setUploadedFileUrl={setUploadedFileUrl}
    />
    <form style={{textAlign: 'left', padding: 10}} onSubmit={e => {
      let form = e.target
      e.preventDefault();
      toggleEditProject();
      submitChanges({
        id: project.id,
        thumbnailUrl: uploadedFileUrl || project.thumbnailUrl || '',
        name: form.name.value || project.name,
        tagline: form.tagline.value || project.tagline,
        description: form.description.value || project.description || null
      });
    }}>
      <TextField
        id="name"
        label="Name"
        placeholder={project.name}
        style={{width: '100%'}}
      />
      <TextField
        id="tagline"
        label="tagline"
        placeholder={project.tagline}
        style={{width: '100%'}}
      />
      <TextField
        id="description"
        label="description"
        placeholder={project.description}
        multiline
        style={{width: '100%'}}
      />
      <Button
        color='default'
        raised
        type="cancel"
        style={{marginBottom: 10}}
        onClick={toggleEditProject}
      >
        Cancel
      </Button>
      <Button color='primary' raised type="submit" style={{marginBottom: 10}}>
        Submit
      </Button>
    </form>
  </Paper>
);

const editProject = gql`
  mutation editProject(
    $id: Int!
    $thumbnailUrl: String!
    $name: String!
    $tagline: String!
    $description: String!
  ) {
    editProject(
      id: $id
      thumbnailUrl: $thumbnailUrl
      name: $name
      tagline: $tagline
      description: $description
    ) {
      id
      thumbnailUrl
      name
      tagline
      description
    }
  }
`;

const EditProjectCardWithData = graphql(editProject, {
  props: ({ ownProps, mutate }) => ({
    submitChanges(formdata) {
      mutate({variables: {...formdata}, optimisticResponse: {
        __typename: 'Mutation',
        editProject: {
          __typename: 'project',
          ...formdata
        }
      }});
    }
  })
})(EditProjectCard);

const mapStateToProps = state => ({
  uploadedFileUrl: state.control.uploadedFileUrl
});

const mapDispatchToProps = dispatch => ({
  setUploadedFileUrl(fileUrl) {
    console.log(dispatch)
    dispatch(setUploadedFileUrl(fileUrl));
  }
});

export default connect(
  mapStateToProps,
  mapDispatchToProps
)(EditProjectCardWithData);