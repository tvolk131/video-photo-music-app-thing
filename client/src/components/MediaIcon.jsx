import React from 'react';
 
import ImageIcon from 'material-ui-icons/Image';
import AudiotrackIcon from 'material-ui-icons/Audiotrack';
import TextFieldsIcon from 'material-ui-icons/TextFields';
import TheatersIcon from 'material-ui-icons/Theaters';
import List, { ListItem, ListItemText, ListItemAvatar } from 'material-ui/List';

const MediaIcon = ({ type }) => {
  const style = {
    height: 30,
    width: 30,
    margin: 0,
    color: '#3F51B5'
  };
 
  if (type === 'text') {
    return (<TextFieldsIcon style={style} />);

  } else if (type === 'audio') {
    return (<AudiotrackIcon style={style} />);

  } else if (type === 'image') {
    return (<ImageIcon style={style} />);

  } else if (type === 'video') {
    return (<TheatersIcon style={style} />);
  }
};

export default MediaIcon;