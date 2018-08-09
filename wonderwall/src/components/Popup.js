import React from 'react';
import './Popup.css';

function Popup (props) {
  const { content = null, menuVisible, setPopupContent } = props;

  if (menuVisible || content === null) {
    return null;
  }

  // The tile is passed through the images or videos (tech debt but...)
  const { tile = {} } = content.props;
  const { deedTypeId = '', nickname = '' } = tile;
  const closePopup = setPopupContent.bind(null, null);
  return (
    <div className='Popup' onClick={closePopup}>
      <div className='Popup_close'>X</div>
      <div className='Popup_deed-type'>{deedTypeId}</div>
      {content}
      {/*<div className='Popup_time-labels'>*/}
        {/*{getTimeLabel('Started on:', createdTimestamp)}*/}
        {/*{getTimeLabel('Completed on:', completedTimestamp)}*/}
      {/*</div>*/}
      <div className='Popup_nickname'>{nickname}</div>
    </div>
  );
}

export default Popup;
