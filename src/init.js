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
    viewedPosts: new Set(),
    selectedPostId: null,
  };

  const container = document.getElementById('root');
  const formContainer = container.querySelector('.rss-form');
  const feedContainer = container.querySelector('.feeds');
  const postContainer = container.querySelector('.posts');

  const modalContainer = document.getElementById('exampleModal');

  const elements = {
    formContainer,
    feedContainer,
    postContainer,
    modalContainer,
  };

  const i18Instance = i18next.createInstance();

  return i18Instance.init({
    lng: 'ru',
    resources: locales,
  }).then(() => {
    setLocale({
      mixed: {
        default: () => ({ key: 'form.validation.invalid' }),
        notOneOf: () => ({ key: 'form.validation.already_exist' }),
      },
      string: {
        default: () => ({ key: 'form.validation.invalid' }),
        url: () => ({ key: 'form.validation.invalid' }),
      },
    });

    attachWatchers(initState, elements, i18Instance);
  });
};
