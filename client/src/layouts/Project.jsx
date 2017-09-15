import React, { Component } from 'react';
import { connect } from 'react-redux';
import { gql, graphql } from 'react-apollo';

import Grid from 'material-ui/Grid';
import Paper from 'material-ui/Paper';
import { CircularProgress } from 'material-ui/Progress';

import ProjectContributors from '../components/ProjectContributors.jsx';
import MediaComponent from '../components/MediaComponent';
import Spacer from '../components/Spacer.jsx';

////////////////////////////////////////
//---RUN THESE COMMANDS IN TERMINAL---//
////////////////////////////////////////
// mysql -u root;
// use thesis;
// update components set isFeatured=true where name="Tear's of Steel";
//
// To see if the command worked run the following command:
// select * from components where isFeatured=true;

const Project = ({ data }) => {

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
    <div>
      <Grid container spacing={24} style={{
        padding: '2%',
        margin: 0,
        width: '100%',
        paddingBottom: '0px'
      }}>

        <Spacer hidden={['md']} />
        <Grid item xs={12} md={8} lg={6}>
          <MediaComponent content={featuredComponent} elevation={FEATURED_ELEVATION} />
        </Grid>
        <Grid item xs={12} md={4} lg={3}>
          <ProjectContributors owner={owner} contributors={contributors} />
        </Grid>
        <Spacer hidden={['md']} />

      </Grid>
      <Grid container spacing={0} style={{
        padding: '2%',
        margin: 0,
        width: '100%',
        paddingTop: '0px'
      }}>

        <Spacer hidden={['sm']} />
        <Grid item xs={12} md={8} lg={6}>
          <Grid container direction="row" spacing={24} style={{
            margin: 0,
            width: '100%'
          }}>
            {components.map((content, key) => {
              return ( <MediaComponent content={content} key={key} group={groups[key]} elevation={COMPONENT_ELEVATION} /> );
            })}
          </Grid>
        </Grid>
        <Grid item xs={12} md={4} lg={3} />
        <Spacer hidden={['sm']} />

      </Grid>
    </div>
  );
};


const projectQuery = gql`
  query projectQuery($projectName: String! $username: String!) {
    user(username: $username) {
      project(name: $projectName) {
        name
        description
        tagline
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

export default graphql(projectQuery, {
  options: ({ match }) => {
    return {variables: {
      projectName: match.params.projectName.split('_').join(' '),
      username: match.params.username
    }
    };
  }})(Project);