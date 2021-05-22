import validateInput from './validators';

export default (container, state) => {
  const input = container.querySelector('.rss-form input');

  const { form } = state;

  container.addEventListener('submit', (e) => {
    e.preventDefault();
  });

  input.addEventListener('change', (e) => {
    e.preventDefault();
    const error = validateInput(e.target.value);
    if (error) {
      form.error = error;
    }
    form.value = e.target.value;
  });
};
