import rootURLs from '../config/rootURLs';

const headers = {
  Accept: 'application/json',
  'Content-Type': 'application/json'
};

const getOptions = {
  headers,
  method: 'GET'
};

const postOptions = {
  headers,
  method: 'POST'
};

const REFRESH = true;

// a cache of Promises per endpoint
const cache = {};

const createError = (endPoint, response) =>
  new Error(`fetch error to endpoint '${endPoint}': HTTP code  ${response.status} : ${response.statusText}`);

const createGetPromise = (endpoint) => {
  return new Promise(async(resolve, reject) => {
    const endPoint = `${rootURLs.data}${endpoint}`;
    try {
      const response = await fetch(endPoint, getOptions);
      if (response.ok) {
        const json = await response.json();
        resolve(json);
      } else {
        delete cache[endpoint];
        reject(createError(endPoint, response));
      }
    } catch (err) {
      delete cache[endpoint];
      reject(err);
    }
  });
};

const getData = (endpoint, force = false) => {
  if (endpoint in cache && !force) {
    return cache[endpoint];
  }
  const cachePromise = createGetPromise(endpoint);
  cache[endpoint] = cachePromise;
  return cachePromise;
};

const postData = async(endpoint, body) => {
  const endPoint = `${rootURLs.data}${endpoint}`;
  const options = { ...postOptions };
  if (body) {
    options.body = JSON.stringify(body);
  }
  const response = await fetch(endPoint, options);
  if (!response.ok) {
    throw createError(endPoint, response);
  }
};

export {
  getData,
  postData,
  REFRESH
};
