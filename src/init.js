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

  const i18Instance = i18next.createInstance();

  return i18Instance.init({
    lng: 'en',
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

    attachWatchers(initState, i18Instance, container);
  });
};
