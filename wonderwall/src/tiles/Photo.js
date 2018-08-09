import React from 'react';
import Image from './Image';

function Photo (props) {
  const imgProps = { ...props, alt:'wedding photo' };
  return (<Image {...imgProps} />);
}

export default Photo;
