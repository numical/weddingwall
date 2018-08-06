import { imageFormat } from '../config/imageConstants';

const apiVersion = '2006-03-01';
const region = 'eu-central-1';
const IdentityPoolId = 'eu-central-1:3ed79cf4-ea52-4931-a2b0-fe3735eb98f5';
const Bucket = 'photos-from-the-wedding';

let loadedS3;

const loadS3 = () => import (/* webpackChunkName: "aws" */ 'aws-sdk').then(AWS => {
  AWS.config.update({
    region,
    credentials: new AWS.CognitoIdentityCredentials({
      IdentityPoolId
    })
  });
  return new AWS.S3({
    apiVersion,
    params: { Bucket }
  });
});

const initS3 = async() => {
  if (!loadedS3) {
    loadedS3 = await loadS3();
  }
  return loadedS3;
}

// with thanks to https://stackoverflow.com/questions/13198131/how-to-save-an-html5-canvas-as-an-image-on-a-server
const b64ToUint8Array = async(image) => {
  const img = atob(image.split(',')[1]);
  const imgBuffer = [];
  for (let i=0 ; i < img.length; i++) {
    imgBuffer.push(img.charCodeAt(i));
  }
  return new Uint8Array(imgBuffer);
}

const prepareUpload = async(imageName, image) => {
  const [S3, Body] = await Promise.all([initS3(), b64ToUint8Array(image)]);
  const params = {
    ACL: 'public-read',
    ContentType: imageFormat,
    Body,
    Key: imageName
  };
  return S3.upload(params);
}

export {
  initS3,
  prepareUpload
};

