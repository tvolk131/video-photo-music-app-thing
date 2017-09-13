import React from 'react';

class ImageButton extends React.Component {
  constructor (props) {
    super(props);
    this.onClick = this.onClick.bind(this);
    this.clickRelease = this.clickRelease.bind(this);
    this.style = {
      transition: 'background-color 0.218s, border-color 0.218s, box-shadow 0.218s',
      outline: 'none',
      width: '15em',
      borderRadius: '3px',
      WebkitFilter: 'drop-shadow(2px 2px 3px #555)'
    }
    this.state = {
      imageSrc: props.unpressedImage
    };
  }

  onClick () {
    this.props.onClick();
    this.setState({imageSrc: this.props.pressedImage});
  }
  clickRelease () {
    this.setState({imageSrc: this.props.unpressedImage});
  }

  render () {
    return <input onMouseDown={this.onClick} onMouseUp={this.clickRelease} type='image' src={this.state.imageSrc} style={this.style} />
  }
}

export default ImageButton;