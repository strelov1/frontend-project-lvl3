import watchers from './watchers';
import bindControllers from './controllers';
import { formState } from './constant';
import render from './view';

import './app.css';

export default () => {
  const initState = {
    form: {
      value: '',
      state: formState.EMPTY,
      error: '',
    },
    feeds: [],
  };

  const container = document.getElementById('root');

  watchers(initState, (state) => {
    render(container, state);
    bindControllers(container, state);
  });
};
