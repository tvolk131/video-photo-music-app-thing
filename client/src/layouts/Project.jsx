import React, { Component } from 'react';
import { connect } from 'react-redux';
import { gql, graphql } from 'react-apollo';

import Grid from 'material-ui/Grid';
import Paper from 'material-ui/Paper';
import Card, { CardContent, CardMedia } from 'material-ui/Card';
import Divider from 'material-ui/Divider';
import Hidden from 'material-ui/Hidden';
import { CircularProgress } from 'material-ui/Progress';

import ProjectContributors from '../components/ProjectContributors.jsx';
import VideoComponent from '../components/VideoComponent.jsx';
import AudioComponent from '../components/AudioComponent.jsx';
import PhotoComponent from '../components/PhotoComponent.jsx';
import TextComponent from '../components/TextComponent.jsx';

class Project extends Component {
  render() {

    if (this.props.data.loading) {
      return (
        <Paper style={{padding: 25}}>
          <CircularProgress/>
        </Paper>
      );
    }

    const {
      components,
      owner,
      contributors
    } = this.props.data.user.project;

    const groupingPreCheck = (componentArray) => {
      let lastType = componentArray[0].type;
      let groups = [];
      let count = 1;

      for (var i = 1; i < componentArray.length; i++) {
        let currentType = componentArray[i].type;
        if (lastType === currentType) {
          count++;
          if (count === 3 && currentType === 'photo') {
            for (var j = 0; j < 3; j++) {
              groups.push(count);
            }
            count = 0;
          }
          if (count === 2 && currentType === 'video') {
            for (var j = 0; j < 2; j++) {
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
          count = 1;
        }
        lastType = currentType;
      }
      return groups;
    };
    // TODO: refactor to accept all components and iterate to find featured
    const generateFeaturedComponent = (component) => {
      if (component.type === 'video') {
        return (
          <VideoComponent component={component} />
        );
      } if (component.type === 'photo') {
        return (
          <PhotoComponent component={component} />
        );
      } if (component.type === 'audio') {
        return (
          <AudioComponent component={component} />
        );
      } if (component.type === 'text') {
        return (
          <TextComponent component={component} />
        );
      }
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
          <Hidden only={['md']}>
            <Grid item sm lg/>
          </Hidden>
          <Grid item xs={12} sm={12} md={8} lg={6}>
            {
              // TODO: refactor
              generateFeaturedComponent(components[0])
            }
            <Divider style={{}}/>
          </Grid>
          
          <Grid item xs={12} sm={12} md={4} lg={3}>
            <ProjectContributors
              owner={owner}
              contributors={contributors}
            />
          </Grid>
          <Hidden only={['md']}>
            <Grid item sm lg/>
          </Hidden>
        </Grid>
        <Grid container spacing={0} style={{
          padding: '2%',
          margin: 0,
          width: '100%',
          paddingTop: '0px'
        }}>
          <Grid item lg />
          <Grid item xs={12} lg={6} md={8}>
            <Grid container direction="row" spacing={24} style={{
              margin: 0,
              width: '100%'
            }}>
              {components.map((component, key) => {

                if (component.type === 'video') {
                  return (
                    <VideoComponent key={key} component={component} group={groups[key]}/>
                  );
                } if (component.type === 'photo') {
                  return (
                    <PhotoComponent key={key} component={component} group={groups[key]} />
                  );
                } if (component.type === 'audio') {
                  return (
                    <AudioComponent key={key} component={component} />
                  );
                } if (component.type === 'text') {
                  return (
                    <TextComponent key={key} component={component} />
                  );
                }
              })}
            </Grid>
          </Grid>
          <Grid item xs={12} sm={12} md={4} lg={3} />
          <Grid item lg />
        </Grid>
      </div>
    );
  }
}

const projectQuery = gql`
  query projectQuery($projectName: String! $username: String!) {
    user(username: $username) {
      project(name: $projectName) {
        name
        description
        tagline
        contributors {
          name
          avatarUrl
        }
        owner {
          name
          username
          avatarUrl
        }
        components {
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