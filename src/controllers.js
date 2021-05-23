import validateInput from './validators';
import { formState } from './constant';

export default (container, state) => {
  const formElement = container.querySelector('.rss-form');
  const { form } = state;

  formElement.addEventListener('submit', (e) => {
    e.preventDefault();

    const formData = new FormData(e.target);
    const url = formData.get('url');

    form.value = url;

    const error = validateInput(form.value);

    if (error) {
      form.error = error;
      form.state = formState.EMPTY;
    } else {
      form.error = '';
      form.state = formState.FILLED;
    }
  });
};
