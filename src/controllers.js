import validateUrl from './validators';

export default (container, state) => {
  const formElement = container.querySelector('.rss-form');
  const { form, feeds } = state;

  formElement.addEventListener('submit', (e) => {
    e.preventDefault();

    const formData = new FormData(e.target);
    const url = formData.get('url');

    form.value = url;

    const [hasError, errorDescription] = validateUrl(form.value, feeds);

    if (hasError) {
      form.error = errorDescription;
    } else {
      feeds.push(form.value);
      form.value = '';
      form.error = '';
    }
  });
};
