import React from 'react';
import rootURLs from '../config/rootURLs';
import './Image.css';

function createSrc (props) {
  const { src, type } = props;
  const key = (type) || 'webImage';

  if (key in rootURLs) {
    return `${rootURLs[key]}${src}`;
  } else {
    throw new Error(`Unknown image type '${type}'`);
  }
}

function isEmbeddedSvg (src) {
  return src.includes('image/svg+xml');
}

function Image (props) {
  const { onClick, onLoad, style } = props;
  const alt = props.alt ? props.alt : 'placeholder';
  const className = props.className ? props.className : 'Image-default';
  const src = createSrc(props);
  const commonProps = {alt, className, crossOrigin: 'anonymous', onClick, onLoad, style  };
  return (isEmbeddedSvg(src))
    ? (<object type="image/svg+xml" aria-label={alt} data={src} {...commonProps} ></object>)
    : (<img src={src} {...commonProps} />);
}

export default Image;
