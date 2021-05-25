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
  };

  const container = document.getElementById('root');

  i18next.init({
    lng: 'ru',
    resources: locales,
  }).then(() => {
    setLocale({
      mixed: {
        default: i18next.t('forms.validation.invalid'),
        required: i18next.t('forms.validation.required'),
      },
    });

    attachWatchers(initState, (state) => {
      render(container, state, i18next);
      bindControllers(container, state);
    });
  });
};
