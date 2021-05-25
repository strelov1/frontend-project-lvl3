import i18next from 'i18next';
import { setLocale } from 'yup';

import watchers from './watchers';
import bindControllers from './controllers';
import render from './view';
import { formState } from './constant';

export default () => {
  const initState = {
    form: {
      url: '',
      error: '',
      success: '',
      state: formState.EMPTY,
    },
    feeds: [],
    posts: [],
  };

  const container = document.getElementById('root');

  i18next.init({
    lng: 'ru',
    resources: {
      en: {
        translation: {
          example: 'Example',
          feeds: 'Feeds',
          posts: 'Posts',
          forms: {
            success: '',
            validation: {
              invalid: '',
              required: '',
            },
          },
        },
      },
      ru: {
        translation: {
          example: 'Пример',
          feeds: 'Фиды',
          posts: 'Посты',
          forms: {
            validation: {
              invalid: '',
              required: '',
            },
          },
        },
      },
    },
  }).then(() => {
    setLocale({
      mixed: {
        default: i18next.t('forms.validation.invalid'),
        required: i18next.t('forms.validation.required'),
      },
    });
    watchers(initState, (state) => {
      render(container, state, i18next);
      bindControllers(container, state);
    });
  });
};
