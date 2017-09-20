import React from 'react';
import PropTypes from 'prop-types';

import VideoComponent from './VideoComponent.jsx';
import AudioComponent from './AudioComponent.jsx';
import PhotoComponent from './PhotoComponent.jsx';
import TextComponent from './TextComponent.jsx';

const MediaComponent = ({ content, group, elevation, editingProject, likeCount, id, isFeatured }) => (

  content.type === 'video' &&
    <VideoComponent 
      component={content} 
      group={group} 
      elevation={elevation} 
      editingProject={editingProject} 
      likeCount={likeCount} 
      id={id}
      isFeatured={isFeatured}
    />
  ||

  content.type === 'image' &&
    <PhotoComponent 
      component={content} 
      group={group} 
      elevation={elevation} 
      editingProject={editingProject} 
      likeCount={likeCount} 
      id={id}
      isFeatured={isFeatured}
    />
  ||

  content.type === 'audio' &&
    <AudioComponent 
      component={content} 
      elevation={elevation} 
      editingProject={editingProject} 
      likeCount={likeCount} 
      id={id}
      isFeatured={isFeatured}
    />
  ||

  content.type === 'text' &&
    <TextComponent 
      component={content} 
      elevation={elevation} 
      editingProject={editingProject} 
      likeCount={likeCount} 
      id={id}
      isFeatured={isFeatured}
    />
);

MediaComponent.propTypes = {
  content: PropTypes.object.isRequired,
  group: PropTypes.number,
  elevation: PropTypes.number.isRequired
};

MediaComponent.defaultProps = {
  group: 1
};

export default MediaComponent;