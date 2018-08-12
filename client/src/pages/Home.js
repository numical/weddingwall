import React from 'react';
import Button from '../components/Button';
import Image from '../components/Image';
import Text from '../components/Text';
import Title from '../components/Title';
import { version } from '../../package';
import happyCouple from '../images/happy-couple.png';
import './Home.css';

function Home (props) {
  const { share, view } = props;
  return (
    <div className='page' >
      <Title text='Congratulations Cristina and&nbsp;Alexandru!' />
      <Image src={happyCouple} className='Home_image' />
      <Button text='Share a photo' onClick={share} />
      <Button text='View shared photos' onClick={view} />
      <Text className='Home_version' text={`v${version}`} />
    </div>
  );
}

export default Home;
