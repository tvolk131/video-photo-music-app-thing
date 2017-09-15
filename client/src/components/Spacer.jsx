import React from 'react';
import Hidden from 'material-ui/Hidden';
import Grid from 'material-ui/Grid';


const Spacer = ({ hidden }) => {
  return (
    <Hidden only={hidden}>
      <Grid item sm lg/>
    </Hidden>
  );
};

export default Spacer;