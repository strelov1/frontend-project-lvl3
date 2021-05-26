import i18next from 'i18next';
import { setLocale } from 'yup';
import locales from './locales';

import attachWatchers from './watchers';
import bindControllers from './controllers';
import render from './view';
import formState from './constant';

export default () => {
  const initState = {
    form: {
      url: '',
      error: '',
      state: formState.EMPTY,
    },
    feeds: [],
    posts: [],
    readPosts: [],
  };

  const container = document.getElementById('root');

  const i18Instance = i18next.createInstance();

  return i18Instance.init({
    lng: 'ru',
    resources: locales,
  }).then(() => {
    setLocale({
      mixed: {
        default: i18Instance.t('form.validation.invalid'),
        notOneOf: i18Instance.t('form.validation.already_exist'),
      },
      string: {
        url: i18Instance.t('form.validation.invalid'),
        default: i18Instance.t('form.validation.invalid'),
      },
    });

    attachWatchers(initState, (state) => {
      render(container, state, i18Instance);
      bindControllers(container, state, i18Instance);
    });
  });
};
