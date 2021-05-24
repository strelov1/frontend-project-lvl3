import watchers from './watchers';
import bindControllers from './controllers';
import render from './view';
import { formState } from './constant';

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

  watchers(initState, (state) => {
    render(container, state);
    bindControllers(container, state);
  });
};
