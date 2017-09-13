import React from 'react';
import { Route } from 'react-router-dom';

import Grid from 'material-ui/Grid';
import Paper from 'material-ui/Paper';
import Card, { CardContent, CardMedia } from 'material-ui/Card';
import Typography from 'material-ui/Typography';
import Avatar from 'material-ui/Avatar';
import List, { ListItem, ListItemText, ListItemAvatar } from 'material-ui/List';
import Divider from 'material-ui/Divider';
import Button from 'material-ui/Button';

import MediaIcon from './MediaIcon.jsx';
import SocialButtons from './SocialButtons.jsx';

const ListingItem = ({ content }) => {

  let smallIcon = {
    height: 30,
    width: 30,
    margin: 5,
    marginLeft: 0
  };

  const randomCount = () => {
    return Math.floor(Math.random() * 1000);
  };
  
  return (
    <Grid container spacing={0}>
      <Grid item sm />
      <Grid item style={{paddingBottom: 0}} xs={12} sm={10} md={8}>
        <Route render={({history}) => (
          <ListItem
            button
            onClick={() => { history.push('/project/' + content.owner.username + '/' + content.name.split(' ').join('_')); }}
            style={{width: '100%', padding: 0}}
          > 
            <Grid container>
              <Grid item xs={3} style={{
                marginTop: 'auto',
                marginBottom: 'auto',
                align: 'right',
                padding: 0
              }}>
                <MediaIcon type={content.featuredComponent.type}/>
              </Grid>
              <Grid item style={{textAlign: 'left'}}>
                <h4 style={{marginBottom: 0}}>{content.name}</h4>
                <Grid
                  container
                  align='center'
                  spacing={0}
                  style={{
                    marginTop: 0,
                    marginBottom: 'auto'
                  }}
                >
                  <Grid item>
                    <Avatar
                      src={content.owner ? content.owner.avatarUrl : content.author.avatarUrl}
                      style={smallIcon}
                    />
                  </Grid>
                  <Grid item>
                    {content.author ? content.author.name : content.owner.name}
                  </Grid>
                </Grid>
              </Grid>
              <SocialButtons likeCount={randomCount()}/>
            </Grid>
          </ListItem> 
        )} />
        <Divider />
      </Grid>
      <Grid item sm></Grid>
    </Grid>
  );
};

export default ListingItem;