import onChange from 'on-change';
import { validateInput } from './validators';
import render from './view';

export default () => {
  const elements = {
    form: document.getElementById('rss-form'),
    input: document.querySelector('#rss-form input'),
    submitButton: document.getElementById('button-addon'),
  };

  const initState = {
    form: {
      value: '',
      state: 'empty',
      valid: true,
      error: '',
    },
  };

  const state = onChange(initState, (path, value) => {
    console.log('onChange', path, value);
    switch (path) {
      case 'form.state':
        handleInput();
        break;
      default:
        break;
    }
    render(elements.form, state);
  });

  const handleInput = () => {
    const error = validateInput(state.form.value);
    if (error) {
      state.form.error = error;
    }
  };

  elements.input.addEventListener('change', (e) => {
    state.form.value = e.target.value;
  });

  elements.submitButton.addEventListener('click', (e) => {
    e.preventDefault();
    state.form.state = 'filled';
    console.log('state', state.form.value);
  });
};
