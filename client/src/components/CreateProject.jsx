import React, { Component } from 'react';
import { connect } from 'react-redux';
import { match } from 'react-router';
import { gql, graphql } from 'react-apollo';

import Grid from 'material-ui/Grid';
import Paper from 'material-ui/Paper';
import { CircularProgress } from 'material-ui/Progress';
import Typography from 'material-ui/Typography';
import Button from 'material-ui/Button';
import ModeEditIcon from 'material-ui-icons/ModeEdit';
import Loading from './Loading.jsx';
import Upload from './Upload.jsx';
import TextField from 'material-ui/TextField';

import Spacer from './Spacer.jsx';

const CreateProject = ({ createProject }) => (
  <Grid container spacing={0} style={{
    padding: '2%',
    margin: 0,
    width: '100%',
    paddingBottom: '0px'
  }}>
    <Spacer hidden={['xs', 's']}/>
    <Grid item xs={12} md={8} lg={6}>
      <Paper>
        <Typography style={{paddingTop: 10, marginBottom: 5}}>
          Upload a thumbnail:
        </Typography>
        <Upload
          style="thumbnail"
          allowedType="image"
        />
        <form style={{textAlign: 'left', padding: 10}} onSubmit={e => {
          let form = e.target;
          e.preventDefault();
          createProject({
            name: form.name.value,
            description: form.description.value,
            tagline: form.tagline.value
          })
        }}>
          <TextField
            label="Name"
            id="name"
            placeholder="My Awesome Project!"
            style={{width: '100%'}}
          />
          <TextField
            label="Description"
            id="description"
            placeholder="This project is a super cool movie about..."
            style={{width: '100%'}}
            multiline
          />
          <TextField
            label="Tagline"
            id="tagline"
            placeholder="The best movie ever. 10/10"
            style={{width: '100%'}}
            multiline
          />
          <Button
            raised
            color='primary'
            type="submit"
            onClick={() => console.log('close')} style={{marginBottom: 10}}
          >
            Submit
          </Button>
        </form>
      </Paper>
    </Grid>
    <Spacer hidden={['m', 's']}/>
  </Grid>
);

const createProject = gql`
  mutation createProject(
    $name: String!
    $tagline: String!
    $description: String!
  ) {
    createProject(
      name: $name
      tagline: $tagline
      description: $description
    ) {
      name
      description
      tagline
    }
  }
`;

const CreateProjectWithData = graphql(createProject, {
  props: ({ ownProps, mutate }) => ({
    createProject(formdata) {
      mutate({variables: {...formdata}, optimisticResponse: {
        __typename: 'Mutation',
        createProject: {
          __typename: 'project',
          ...formdata
        }
      }})
    }
  })
})(CreateProject);


export default CreateProjectWithData;