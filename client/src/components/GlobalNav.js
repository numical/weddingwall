import React from 'react';
import Image from './Image';
import homeImage from '../images/nav-home.svg';
import shareImage from '../images/newphoto-icon.svg';
import viewImage from '../images/nav-mydeeds.svg';
import './GlobalNav.css';

function NavItem (props) {
  const { imageStyle, onClick, text, src } = props;
  return (
    <div className='GlobalNav-item' onClick={onClick}>
      <Image src={src} className='GlobalNav-image' style={imageStyle} />
      <div>{text}</div>
    </div>
  );
}

function GlobalNav (props) {
  const { home, share, view } = props;
  const shareImageStyle = {
    backgroundColor: 'white',
    padding: '5px',
    borderRadius: '5px'
  };
  return (
    <header className='flexContainerRow GlobalNav-container'>
      <NavItem src={homeImage} text='Home' onClick={home} />
      <NavItem src={shareImage} text='Share' onClick={share} imageStyle={shareImageStyle} />
      <NavItem src={viewImage} text='View' onClick={view} />
    </header>
  );
}

export default GlobalNav;
