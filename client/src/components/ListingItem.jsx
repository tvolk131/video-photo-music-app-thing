import React from 'react';
import Grid from 'material-ui/Grid';
import Paper from 'material-ui/Paper';
import Card, { CardContent, CardMedia } from 'material-ui/Card';
import Typography from 'material-ui/Typography';
import IconButton from 'material-ui/IconButton';
import FavoriteIcon from 'material-ui-icons/Favorite';
import ShareIcon from 'material-ui-icons/Share';
import TheatersIcon from 'material-ui-icons/Theaters';
import ImageIcon from 'material-ui-icons/Image';
import AudiotrackIcon from 'material-ui-icons/Audiotrack';
import TextFieldsIcon from 'material-ui-icons/TextFields';
import Avatar from 'material-ui/Avatar';
import List, { ListItem, ListItemText, ListItemAvatar } from 'material-ui/List';
import Divider from 'material-ui/Divider';
import Button from 'material-ui/Button';
import { Route } from 'react-router-dom';

const ListingItem = ({ content, id}) => {
  let title = 0;
  let relation = 0;
  let avatar = 0;
  let person = 0;
  let image = 0;
  let buttons = 0;
  let count = 0;
  let smallIcon = {
    height: 30,
    width: 30,
    margin: 5,
    marginLeft: 0
  };
  let largeIcon = {
    height: 70,
    width: 70,
    margin: 15,
    marginLeft: 35
  };

  const setIcon = (type, content) => {
    let large = {
      height: '70%',
      width: '70%',
      maxWidth: 100,
      color: '#3F51B5'
    };


    if (type === 'text') {
      return (<TextFieldsIcon style={large} />);
    } else if (type === 'audio') {
      return (<AudiotrackIcon style={large} />);
    } else if (type === 'photo') {
      return (<ImageIcon style={large} />);
    } else if (type === 'video') {
      return (<TheatersIcon style={large} />);
    }
  };

  const randomCount = () => {
    return Math.floor(Math.random() * 1000)
  };

  const incrementCount = () => {
    count = count++;
  }

  const getButtons = (type) => {
    if (type === 'project' || type === 'component') {
      return (
        <Grid item style={{marginLeft: 'auto'}}>
          <Grid container spacing={0} align='center'>
            <Grid item>
              <h4 style={{margin: 0, width: 50, textAlign: 'right'}}>
                {count}
              </h4>
            </Grid>
            <Grid item>
              <IconButton onClick={() => console.log('Like ' + id)} aria-label="Add to favorites" style={{zIndex: 1000, align: 'left'}}>
                <FavoriteIcon />
              </IconButton>
            </Grid>
            <Grid item>
              <IconButton aria-label="Share">
                <ShareIcon />
              </IconButton>
            </Grid>
          </Grid>
        </Grid>
      );
    } else {
      return (
        <Grid item style={{marginLeft: 'auto'}}>
          <Button raised onClick={() => console.log('Add Friend ' + id)} style={{margin: 10}}>
            Add as Friend
          </Button>
          <Grid container spacing={0} align='center' style={{margin: 10}}>
            <Grid item>
              <h4 style={{margin: 5, width: 50, textAlign: 'right'}}>
                {count}
              </h4>
            </Grid>
            <Grid item>
              <Button raised onClick={() => console.log('Follow ' + id)} style={{marginRight: 10}}>
                Follow
              </Button>
            </Grid>
          </Grid>
        </Grid>
      );
    }
  }

  if (content.contentType === 'component') {
    title = content.name;
    relation = 'Author: '
    person = content.author.name;
    avatar = (<Avatar src={content.author.avatarUrl} style={smallIcon} />);
    image = setIcon(content.type, content);
    count = randomCount();
    buttons = getButtons(content.contentType);
  } else if (content.contentType === 'user') {
    title = content.name;
    relation = null;
    person = content.jobTitle;
    image = (<Avatar src={content.avatarUrl} style={largeIcon} />);
    count = randomCount();
    buttons = getButtons(content.contentType);
  } else {
    title = content.name;
    relation = 'Owner: '
    person = content.owner.name;
    avatar = (<Avatar src={content.owner.avatarUrl} style={smallIcon} />);
    image = setIcon(content.featuredComponent.type, content);
    count = randomCount();
    buttons = getButtons(content.contentType);
  }

  return (
    <Grid container spacing={24}>
      <Grid item sm />
      <Grid item style={{paddingBottom: 0}} xs={12} sm={10} md={8}>
        <Route render={({history}) => (
          <ListItem button onClick={() => { history.push('/project/'+content.owner.username+'/'+content.name.split(' ').join('_'))}} style={{width: '100%', padding: 0}}> 
            <Grid container>
              <Grid item xs={3} style={{marginTop: 'auto', marginBottom: 'auto', align: 'right'}}>
                {image}
              </Grid>
              <Grid item style={{textAlign: 'left'}}>
                <h2 style={{marginBottom: 0}}>{title}</h2>
                <Grid container align='center' spacing={0} style={{marginTop: 0, marginBottom: 'auto'}}>
                  <Grid item>
                    {avatar}
                  </Grid>
                  <Grid item>
                    {person}
                  </Grid>
                </Grid>
              </Grid>
              {buttons}
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