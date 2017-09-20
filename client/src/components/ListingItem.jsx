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
    height: 50,
    width: 50,
    margin: 0
  };

  const randomCount = () => {
    return Math.floor(Math.random() * 1000);
  };
  
  return (
    <div>
      <Grid container spacing={0}>
        <Route render={({history}) => (
          <ListItem
            button
            onClick={() => {
              let path = '/search';
              if (content.username) {
                path = `/user/${content.username}`;
              } else if (content.owner) {
                path = `/project/${content.owner.username}/${content.name}`;
              } else if (content.author) {
                console.log('no such path yet');
              }
              history.push(path);
            }}
            style={{width: '100%', padding: 0}}
          > 
            <Grid container>
              <Grid item xs={3} style={{
                marginTop: 'auto',
                marginBottom: 'auto',
                align: 'right',
                padding: 0
              }}>
                <img
                  src={content.thumbnailUrl || content.avatarUrl} 
                  style={{
                    height: 75,
                    width: 75
                  }}
                />
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
                  {!content.username &&
                    <div>
                      <Grid item>
                        <Avatar
                          src={content.author ? content.author.avatarUrl : content.owner.avatarUrl}
                          style={smallIcon}
                        />
                      </Grid>
                      <Grid item>
                        {content.author ? content.author.name : content.owner.name}
                      </Grid>
                    </div>
                  }
                </Grid>
              </Grid>
              <SocialButtons likeCount={randomCount()}/>
            </Grid>
          </ListItem> 
        )} />
        </Grid>
      <Divider/>
    </div>
  );
};

export default ListingItem;