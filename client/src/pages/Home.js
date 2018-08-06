import React from 'react';
import Button from '../components/Button';
import Image from '../components/Image';
import Title from '../components/Title';
import cheesy from '../images/cheesy.jpg';
import './Home.css';

function Home (props) {
  const { share, view } = props;
  return (
    <div className='page'>
      <Title text='Congratulations Cristina and Alexandru!' />
      <Image src={cheesy} className='Home-superdeed-icon' />
      <Button text='Share' onClick={share} />
      <Button text='View' onClick={view} />
    </div>
  );
}

export default Home;
