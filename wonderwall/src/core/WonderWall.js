/* global localStorage */

import React, { Component }from 'react';
import Photo from '../tiles/Photo';
import Popup from '../components/Popup';
import Video from '../tiles/Video';
import startPolling from '../data/poller';
import './WonderWall.css';

const methods = [
  'addPhoto',
  'addTile',
  'addVideo',
  'setPopupContent',
  'updateState'
];

class WonderWall extends Component {
  constructor (props) {
    super(props);
    methods.forEach((method) => { this[method] = this[method].bind(this); });
    this.state = {
      popupContent: undefined,
      tiles: []
    };
  }

  componentDidMount () {
    const callbackEvents = {
      'photo': this.addPhoto,
      'video': this.addVideo
    };
    startPolling(callbackEvents);
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

  render () {
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
}

export default WonderWall;
