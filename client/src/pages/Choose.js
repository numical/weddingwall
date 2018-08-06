import React from 'react';
import Button from '../components/Button';
import Text from '../components/Text';

function Choose (props) {
  const { takePhoto, uploadPhoto } = props;

  return (
    <div className='page'>
      <Text text='Please choose either to' />
      <Button text='Upload an existing picture' onClick={uploadPhoto} />
      <Text text='or to' />
      <Button text='Take a new photo' onClick={takePhoto} />
    </div>
  );
}

export default Choose;
