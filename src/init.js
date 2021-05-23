import watchers from './watchers';
import bindControllers from './controllers';
import render from './view';

import './app.css';

export default () => {
  const initState = {
    form: {
      value: '',
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
