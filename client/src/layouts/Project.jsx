import React, { Component } from 'react';
import { connect } from 'react-redux';
import { gql, graphql } from 'react-apollo';

import Grid from 'material-ui/Grid';
import Paper from 'material-ui/Paper';
import { CircularProgress } from 'material-ui/Progress';

import ProjectContributors from '../components/ProjectContributors.jsx';
import MediaComponent from '../components/MediaComponent';
import Spacer from '../components/Spacer.jsx';
import DisplayProjectCard from '../components/DisplayProjectCard.jsx';

import { toggleEditProject } from '../actions/controlActions';


////////////////////////////////////////
//---RUN THESE COMMANDS IN TERMINAL---//
////////////////////////////////////////
// mysql -u root;
// use thesis;
// update components set isFeatured=true where name="Tear's of Steel";
//
// To see if the command worked run the following command:
// select * from components where isFeatured=true;

const Project = ({ currentUser, editingProject, toggleEditProject, data }) => {

  if (data.loading) {
    return (
      <Paper style={{padding: 25}}>
        <CircularProgress />
      </Paper>
    );
  }

  const COMPONENT_ELEVATION = 4;
  const FEATURED_ELEVATION = 8;

  let {
    components,
    featuredComponent,
    owner,
    contributors
  } = data.user.project;

  const groupingPreCheck = (componentArray) => {
    const MAX_PHOTO_GRID = 3;
    const MAX_VIDEO_GRID = 2;
    const FIRST_OF_NEW_TYPE = 1;
    let lastType = componentArray[0].type;
    let groups = [];
    let count = FIRST_OF_NEW_TYPE;

    for (var i = 1; i < componentArray.length; i++) {
      let currentType = componentArray[i].type;
      if (lastType === currentType) {
        count++;
        if (count === MAX_PHOTO_GRID && currentType === 'image') {
          for (var j = 0; j < MAX_PHOTO_GRID; j++) {
            groups.push(count);
          }
          count = 0;
        }
        if (count === MAX_VIDEO_GRID && currentType === 'video') {
          for (var j = 0; j < MAX_VIDEO_GRID; j++) {
            groups.push(count);
          }
          count = 0;
        }
        if (i === componentArray.length - 1) {
          for (var j = 0; j < count; j++) {
            groups.push(count);
          }
        }
      } else {
        for (var j = 0; j < count; j++) {
          groups.push(count);
        }
        count = FIRST_OF_NEW_TYPE;
      }
      lastType = currentType;
    }
    return groups;
  };

  let groups = groupingPreCheck(components);

  return (
    <Grid container >
      <Grid item xs={12} hidden={{ smDown: true }}>
        <Grid container spacing={24} style={{
          padding: '2%',
          margin: 0,
          width: '100%',
        }}>
          <Spacer hidden={['md']} />
          <Grid item xs={12} md={8} lg={6}>
            <Grid container>
              <Grid item xs={12}>
                <MediaComponent content={featuredComponent} elevation={FEATURED_ELEVATION} />
              </Grid>
              <Grid item xs={12} style={{padding: 0}}>
                <Grid container direction="row" spacing={24} style={{
                  padding: 0,
                  margin: 0,
                  width: '100%'
                }}>
                  {components.map((content, key) => {
                    return ( <MediaComponent content={content} key={key} group={groups[key]} elevation={COMPONENT_ELEVATION} /> );
                  })}
                </Grid>
              </Grid>
            </Grid>
          </Grid>
          <Grid item xs={12} md={4} lg={3}>
            <Grid container>
              <Grid item xs={12}>
                <DisplayProjectCard
                  editingProject={editingProject}
                  currentUser={currentUser}
                  error={data.error}
                  loading={data.loading}
                  project={data.user.project}
                  toggleEditProject={toggleEditProject}
                />
              </Grid>
              <Grid item xs={12}>
                <ProjectContributors owner={owner} contributors={contributors} />
              </Grid>
            </Grid>
          </Grid>
          <Spacer hidden={['md']} />
        </Grid>
      </Grid>

      <Grid item xs={12} hidden={{ mdUp: true }}>
        <Grid container spacing={24} style={{
          padding: '2%',
          margin: 0,
          width: '100%',
        }}>
          <Grid item xs={12} md={8} lg={6}>
            <Grid container>
              <Grid item xs={12}>
                <MediaComponent content={featuredComponent} elevation={FEATURED_ELEVATION} />
              </Grid>
              <Grid item xs={12}>
                <DisplayProjectCard
                  editingProject={editingProject}
                  currentUser={currentUser}
                  error={data.error}
                  loading={data.loading}
                  project={data.user.project}
                  toggleEditProject={toggleEditProject}
                />
              </Grid>
              <Grid item xs={12}>
                <ProjectContributors owner={owner} contributors={contributors} />
              </Grid>
              <Grid item xs={12} style={{padding: 0}}>
                <Grid container direction="row" spacing={24} style={{
                  padding: 0,
                  margin: 0,
                  width: '100%'
                }}>
                  {components.map((content, key) => {
                    return ( <MediaComponent content={content} key={key} group={groups[key]} elevation={COMPONENT_ELEVATION} /> );
                  })}
                </Grid>
              </Grid>
            </Grid>
          </Grid>
        </Grid>
      </Grid>
    </Grid>
  );
};


const projectQuery = gql`
  query projectQuery($projectName: String! $username: String!) {
    user(username: $username) {
      project(name: $projectName) {
        id
        name
        description
        tagline
        thumbnailUrl
        featuredComponent {
          name
          resourceUrl
          description
          type
          author {
            name
            username
            avatarUrl
          }
        }
        contributors {
          name
          avatarUrl
          username
          role
        }
        owner {
          name
          username
          avatarUrl
        }
        components(includeFeatured: false) {
          name
          resourceUrl
          description
          type
          author {
            name
            username
            avatarUrl
          }
        }
      }
    }
  }
`;

const mapStateToProps = state => ({
  currentUser: state.session.currentUser,
  editingProject: state.control.editingProject
});

const mapDispatchToProps = dispatch => ({
  toggleEditProject() {
    dispatch(toggleEditProject());
  }
});


const projectWithData = graphql(projectQuery, {
  options: ({ match }) => {
    return {variables: {
      projectName: match.params.projectName.split('_').join(' '),
      username: match.params.username
    }
    };
  }})(Project);

export default connect(mapStateToProps, mapDispatchToProps)(projectWithData);