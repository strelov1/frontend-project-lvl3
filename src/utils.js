import axios from 'axios';

const wrapProxy = (url) => {
  const urlBuilder = new URL('/get', 'https://hexlet-allorigins.herokuapp.com');
  urlBuilder.searchParams.set('url', url);
  urlBuilder.searchParams.set('disableCache', 'true');
  return urlBuilder.toString();
};

export const fetchFeeds = (url) => axios.get(wrapProxy(url))
  .then((response) => response.data.contents);

export const parseErrorType = (error) => {
  if (error.isParsingError) {
    return 'form.errors.rss';
  }
  if (error.isAxiosError) {
    return 'form.errors.network';
  }
  return 'form.errors.unknown';
};
