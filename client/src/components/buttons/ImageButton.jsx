import React from 'react';

const style = {
  transition: 'background-color 0.218s, border-color 0.218s, box-shadow 0.218s',
  outline: 'none',
  width: '15em',
  borderRadius: '3px',
  WebkitFilter: 'drop-shadow(2px 2px 3px #555)'
};

export default (props) => {
  return (
    <input onMouseDown={props.onClick} type='image' src={props.image} style={style} />
  );
};