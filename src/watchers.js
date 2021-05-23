import onChange from 'on-change';
import { formState } from './constant';

export default (initState, onUpdate) => {
  const state = onChange(initState, function (path, value) {
    console.log('onChange', path, value);
    switch (path) {
      case 'form.state':
        if (value === formState.FILLED) {
          console.log('load rss');
        }
        break;
      default:
        break;
    }
    onUpdate(this);
  });

  // first render
  onUpdate(state);
};
