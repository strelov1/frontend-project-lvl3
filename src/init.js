import i18next from 'i18next';
import { setLocale } from 'yup';
import locales from './locales';

import attachWatchers from './watchers';
import formState from './constant';

export default () => {
  const initState = {
    form: {
      url: '',
      error: '',
      state: formState.FILLING,
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

    attachWatchers(initState, i18Instance, container);
  });
};
