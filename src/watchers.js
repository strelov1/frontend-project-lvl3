import axios from 'axios';
import onChange from 'on-change';
import parseRss from './parser';
import { formState } from './constant';

const feedLoader = (url) => axios.get(url)
  .then((response) => response.data)
  .catch((error) => {
    console.log(error);
  });

const formHandler = (state) => {
  const { form, feeds, posts } = state;
  if (form.state === formState.FILLED) {
    feedLoader(form.url).then((xmlString) => {
      const data = parseRss(xmlString);
      if (data) {
        feeds.push({
          url: form.url,
          title: data.title,
          description: data.description,
        });
        posts.push(...data.items);
      }
      form.state = formState.EMPTY;
      form.url = '';
      form.error = '';
    }).catch((e) => {
      form.error = e.message;
    });
  }
};

export default (initState, onUpdate) => {
  const state = onChange(initState, function (path, value) {
    switch (path) {
      case 'form.state':
        formHandler(this);
        break;
      default:
        break;
    }
    onUpdate(this);
  });

  // first render
  onUpdate(state);
};
