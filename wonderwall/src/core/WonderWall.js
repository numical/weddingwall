import React, { Component } from 'react';
import Photo from '../tiles/Photo';
import Popup from '../components/Popup';
import Video from '../tiles/Video';
import startPolling from '../data/poller';
import './WonderWall.css';

const methods = [
  'addPhoto',
  'addTile',
  'addVideo',
  'incrementSlide',
  'renderWall',
  'renderSlideShow',
  'setPopupContent',
  'updateState'
];

class WonderWall extends Component {
  constructor (props) {
    super(props);
    methods.forEach((method) => { this[method] = this[method].bind(this); });
    const showSlides = (window.location.href.includes('slideshow'));
    this.state = {
      popupContent: undefined,
      showSlides,
      slideShowIndex: 0,
      tiles: []
    };
  }

  componentDidMount () {
    const { showSlides } = this.state;
    const callbackEvents = {
      'photo': this.addPhoto,
      'video': this.addVideo
    };
    startPolling(callbackEvents);
    if (showSlides) {
      this.incrementSlide();
    }
  }

  incrementSlide () {
    const { state } = this;
    const { slideShowIndex, tiles } = state;
    const numTiles = tiles.length;
    console.log(`Incrementing slide ${slideShowIndex} of ${numTiles} slides`);
    if (tiles.length > 0) {
      let nextSlideShowIndex = slideShowIndex + 1;
      if (nextSlideShowIndex === numTiles) {
        nextSlideShowIndex = 0;
      }
      this.setState({
        ...state,
        slideShowIndex: nextSlideShowIndex
      });
    }
    setTimeout(this.incrementSlide, 5000);
  }

  addPhoto (photo) {
    const tile = {
      type: 'photo',
      ...photo
    };
    this.addTile(tile);
  }

  addVideo (video) {
    const tile = {
      type: 'video',
      ...video
    };
    this.addTile(tile);
  }

  addTile (tile) {
    this.setState(prevState => ({
      ...prevState,
      tiles: [tile, ...prevState.tiles]
    }));
  }

  setPopupContent (content) {
    this.setState({
      ...this.state,
      popupContent: content
    });
  }

  updateState (newProps) {
    this.setState({
      ...this.state,
      ...newProps
    });
  }

  renderSlideShow () {
    const { slideShowIndex, tiles } = this.state;
    let image = null;
    if (tiles.length > 0) {
      const src = `https://s3.eu-central-1.amazonaws.com/photos-from-the-wedding/${tiles[slideShowIndex].src}`;
      const imageProps = {
        alt: 'wedding photo',
        src,
        className: 'Wonderwall_slideshow_image'
      };
      image = (<img {...imageProps} />);
    }
    return (
      <div className='Wonderwall_container'>
        {image}
      </div>
    );
  }

  renderWall () {
    const { setPopupContent, state } = this;
    const { showMenu, popupContent, tiles } = state;
    const numTiles = tiles.length;
    const mappedTiles = tiles.map((tile, index) => {
      const { deedId, src } = tile;
      const tileProps = {
        canPopup: popupContent && !showMenu,
        deedId,
        tile,
        isPopup: false,
        key: numTiles - index - 1,
        setPopupContent,
        src
      };
      switch (tile.type) {
        case 'photo':
          return (<Photo {...tileProps} />);
        case 'video':
          return (<Video {...tileProps} />);
        default:
          return null;
      }
    });

    const popupProps = {
      content: popupContent,
      setPopupContent
    };

    return (
      <div className='Wonderwall_container'>
        {mappedTiles}
        <Popup {...popupProps} />
      </div>
    );
  }

  render () {
    const { showSlides } = this.state;
    return showSlides ? this.renderSlideShow() : this.renderWall();
  }
}

export default WonderWall;
