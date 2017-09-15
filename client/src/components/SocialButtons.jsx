import React from 'react';

import Grid from 'material-ui/Grid';
import IconButton from 'material-ui/IconButton';
import FavoriteIcon from 'material-ui-icons/Favorite';
import ShareIcon from 'material-ui-icons/Share';

const SocialButtons = ({ likeCount }) => (
  <Grid item style={{marginLeft: 'auto'}}>
    <Grid container spacing={0} align='center'>
      <Grid item>
        <h4 style={{margin: 0, width: 50, textAlign: 'right'}}>
          {likeCount}
        </h4>
      </Grid>
      <Grid item>
        <IconButton
          onClick={() => console.log('Like ' + id)}
          aria-label="Add to favorites"
          style={{zIndex: 1000, align: 'left'}}
        >
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

export default SocialButtons;