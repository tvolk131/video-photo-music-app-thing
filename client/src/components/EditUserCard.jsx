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

const EditUserCard = ({ user, loading, error, toggleEditUser, submitChanges, uploadedFileUrl, setUploadedFileUrl }) => (
  loading &&
  <Loading />

  ||

  error &&
  <Paper style={{padding: 25}}>
    <Typography style={{fontSize: 20}}>User info not found</Typography>
  </Paper>

  ||

  user &&
  <Paper>
    <Typography style={{paddingTop: 10, marginBottom: 5}}>Upload a new profile image:</Typography>
    <Upload 
      allowedType="image"
      setUploadedFileUrl={setUploadedFileUrl}
    />
    <form style={{textAlign: 'left', padding: 10}} onSubmit={e => {
      let form = e.target
      e.preventDefault();
      toggleEditUser();
      console.log('FILEURL: ', uploadedFileUrl)
      submitChanges({
        name: form.name.value || user.name,
        username: form.username.value || user.username,
        email: form.email.value || user.email,
        profession: form.profession.value || 'cat',
        avatarUrl: uploadedFileUrl || user.avatarUrl || '',
        description: form.description.value || user.description || null
      });
    }}>
      <TextField
        id="name"
        label="Name"
        placeholder={user.name}
        style={{width: '100%'}}
      />
      <TextField
        id="profession"
        label="profession"
        placeholder={user.profession}
        style={{width: '100%'}}
      />
      <TextField
        id="username"
        label="Username"
        placeholder={user.username}
        style={{width: '100%'}}
      />
      <TextField
        id="email"
        label="Email"
        placeholder={user.email}
        style={{width: '100%'}}
      />
      <TextField
        id="description"
        label="Bio"
        placeholder={user.description}
        multiline
        style={{width: '100%'}}
      />
    <Button color='primary' raised type="submit" style={{marginBottom: 10}}>
      Submit
    </Button>
    </form>
  </Paper>
);

EditUserCard.propTypes = {
  username: PropTypes.string.isRequired,
};

const editUser = gql`
  mutation editUser(
    $email: String!
    $username: String!
    $name: String!
    $profession: String!
    $description: String!
    $avatarUrl: String!
  ) {
    editUser(
      email: $email
      username: $username
      name: $name
      profession: $profession
      description: $description
      avatarUrl: $avatarUrl
    ) {
      email
      username
      name
      profession
      description
      avatarUrl
    }
  }
`;

const EditUserCardWithData = graphql(editUser, {
  props: ({ ownProps, mutate }) => ({
    submitChanges(formdata) {
      mutate({variables: {...formdata}, optimisticResponse: {
        __typename: 'Mutation',
        editUser: {
          __typename: 'user',
          ...formdata
        }
      }});
    }
  })
})(EditUserCard);

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
)(EditUserCardWithData);