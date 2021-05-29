import i18next from 'i18next';
import { setLocale } from 'yup';
import locales from './locales';

import attachWatchers from './watchers';
import formState from './constant';

export default () => {
  const initState = {
    form: {
      url: '',
      error: null,
      state: formState.FILLING,
    },
    feeds: [],
    posts: [],
    readPosts: [],
  };

  const container = document.getElementById('root');
  const form = container.querySelector('.rss-form');
  const feedContainer = container.querySelector('.rss-form');
  const postContainer = container.querySelector('.posts');

  const modal = document.getElementById('exampleModal');
  const modalTitle = modal.querySelector('.modal-title');
  const modalBody = modal.querySelector('.modal-body');
  const modalLink = modal.querySelector('.full-article');

  const elements = {
    form,
    feedContainer,
    postContainer,
    modal: {
      title: modalTitle,
      body: modalBody,
      link: modalLink,
    }
  };

  const i18Instance = i18next.createInstance();

  return i18Instance.init({
    lng: 'ru',
    resources: locales,
  }).then(() => {
    setLocale({
      mixed: {
        default: 'form.validation.invalid',
        notOneOf: 'form.validation.already_exist',
      },
      string: {
        url: 'form.validation.invalid',
        default: 'form.validation.invalid',
      },
    });

    attachWatchers(initState, elements, i18Instance);
  });
};
