import React from 'react';
import Button from '../components/Button';
import Title from '../components/Title';

function Choose (props) {
  const { takePhoto, uploadPhoto } = props;

  return (
    <div className='page'>
      <Title text='Please choose either to' />
      <Button text='Upload an existing picture' onClick={uploadPhoto} />
      <Title text='or to' />
      <Button text='Take a new photo' onClick={takePhoto} />
    </div>
  );
}

export default Choose;
