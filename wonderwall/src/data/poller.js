import { getLatestPhotos } from './S3';

const ONE_SECOND = 1000;
const POLL_INTERVAL = 15 * ONE_SECOND;

let callbackEvents;

const processPhoto = (lastPhotoKey, photo) => {
  const { Key } = photo;
  callbackEvents['photo']({ src: Key});
  return Key;
};

const processPhotos = (photos, lastPhotoKey) => {
  const latestPhotoKey = photos.reduce(processPhoto, lastPhotoKey);
  setTimeout(poll.bind(null, latestPhotoKey), POLL_INTERVAL);
};

const poll = async(lastPhotoKey) => {
  const photos = await getLatestPhotos(lastPhotoKey);
  console.log(`Poll for photos after key '${lastPhotoKey}'; number of photos = ${photos.length}`);
  processPhotos(photos, lastPhotoKey);
};

const start = async(events) => {
  callbackEvents = events;
  await poll();
};

export default start;