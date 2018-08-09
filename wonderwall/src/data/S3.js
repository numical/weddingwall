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
};

const getLatestPhotos = async(lastPhotoKey) => {
  const s3 = await initS3();
  const params = {
    Bucket,
    StartAfter: lastPhotoKey
  };
  return new Promise((resolve, reject) => {
    s3.listObjectsV2( params, (err, data) => {
      if (err) {
        reject(err);
      } else {
        resolve(data.Contents);
      }
    })
  });
};

export {
  initS3,
  getLatestPhotos
};

