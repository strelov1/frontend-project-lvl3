import axios from 'axios';

const wrapProxy = (url) => `https://hexlet-allorigins.herokuapp.com/get?url=${encodeURIComponent(url)}`;

const fetchFeeds = (url) => axios.get(wrapProxy(url))
  .then((response) => response.data.contents);

export default fetchFeeds;