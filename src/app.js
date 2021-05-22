import watchers from './watchers';
import bindControllers from './controllers';
import render from './view';

export default () => {
  const initState = {
    form: {
      value: '',
      state: 'empty',
      valid: true,
      error: '',
    },
  };

  const container = document.querySelector('.rss-form');

  watchers(initState, (state) => {
    render(container, state);
    bindControllers(container, state);
  });
};
