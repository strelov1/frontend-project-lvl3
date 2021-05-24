import { formState } from './constant';
import validateUrl from './validators';

export default (container, state) => {
  const formElement = container.querySelector('.rss-form');
  const { form, feeds } = state;

  formElement.addEventListener('submit', (e) => {
    e.preventDefault();

    const formData = new FormData(e.target);
    const url = formData.get('url').trim();

    form.url = url;

    const [hasError, errorDescription] = validateUrl(form.url, feeds);

    if (hasError) {
      form.error = errorDescription;
    } else {
      form.state = formState.FILLED;
    }
  });
};
