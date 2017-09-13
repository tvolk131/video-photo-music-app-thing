import React from 'react';
import VideoComponent from '../components/VideoComponent.jsx';
import AudioComponent from '../components/AudioComponent.jsx';
import PhotoComponent from '../components/PhotoComponent.jsx';
import TextComponent from '../components/TextComponent.jsx';


const MediaComponent = ({ content, group, elevation }) => {
  const COMPONENT_ELEVATION = 4;
  
  if (content.type === 'video') {
    return (
      <VideoComponent component={content} group={group} elevation={COMPONENT_ELEVATION} />
    );
  } if (content.type === 'image') {
    return (
      <PhotoComponent component={content} group={group} elevation={COMPONENT_ELEVATION} />
    );
  } if (content.type === 'audio') {
    return (
      <AudioComponent component={content} elevation={COMPONENT_ELEVATION} />
    );
  } if (content.type === 'text') {
    return (
      <TextComponent component={content} elevation={COMPONENT_ELEVATION} />
    );
  }
};

export default MediaComponent;