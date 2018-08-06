import React, { Component } from 'react';
import PropTypes from 'prop-types';
import uuidv4 from 'uuid/v4';
import Button from '../components/Button';
import Image from '../components/Image';
import ProgressBar from '../components/ProgressBar';
import SocialMedia from '../components/SocialMedia';
import Title from '../components/Title';
import { imageSuffix } from '../config/imageConstants';
import { prepareUpload } from '../data/S3';
import './SavePhoto.css';

const methods = ['createUploadArtifacts', 'setProgress'];

class SavePhoto extends Component {
  constructor (props) {
    super(props);
    const { imageData } = this.props;
    methods.forEach((method) => this[method] = this[method].bind(this));
    this.state = {
      badge: null,
      imageClass: 'fadein',
      imageSrc: imageData,
      progressPercent: 0,
      progressText: 'Uploading your photo...'
    };
  }

  async createUploadArtifacts () {
    const { props, setProgress } = this;
    const { imageData } = props;
    const imageName = `${uuidv4()}.${imageSuffix}`;
    const uploadProgress = await prepareUpload(imageName, imageData);
    uploadProgress.on('httpUploadProgress', (progress) => {
      const { loaded, total } = progress;
      const percentage = Math.round(100 * loaded / total);
      setProgress(null, percentage);
    });
    return uploadProgress.promise();
  }

  async componentDidMount () {
    const { props, setProgress } = this;
    const { error, imageData } = props;
    try {
      const uploadPromise = await this.createUploadArtifacts(imageData);
      await uploadPromise;
      setProgress(null, 100);
    } catch (err) {
      error({err});
    }
  }

  setProgress (text, percent) {
    const { state } = this;
    const { progressPercent, progressText } = state;
    const newProgress = (percent && percent > progressPercent) ? percent : progressPercent;
    const newText = (newProgress === 100) ? 'All done' : (text) || progressText;
    this.setState({
      ...state,
      progressPercent: newProgress,
      progressText: newText
    });
  }

  render () {
    const { props, state } = this;
    const { share, view } = props;
    const { progressPercent, progressText, imageClass, imageSrc } = state;
    const imageProps = {
      className: `CompleteDeed-image ${imageClass}`,
      src: imageSrc,
      type: 'appImage'
    };
    const progressProps = {
      percent: progressPercent,
      text: progressText
    };
    return (
      <div className='page'>
        <Title text='You Deed It!' />
        <Image {...imageProps} />
        <ProgressBar {...progressProps} />
        <SocialMedia />
        <Button text='Upload another photo' onClick={share} />
        <Button text='View all photos' onClick={view} />
      </div>
    );
  }
}

SavePhoto.propTypes = {
  imageData: PropTypes.string
};

export default SavePhoto;
