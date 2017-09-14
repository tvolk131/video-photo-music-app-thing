import React, { Component } from 'react';
import image from './button.png';
import ImageButton from '../ImageButton.jsx';

class FacebookButton extends Component {
  render () {
    return <ImageButton onClick={this.props.onClick} image={image} />
  }
}

export default FacebookButton;