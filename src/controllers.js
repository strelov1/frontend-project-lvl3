import formState from './constant';
import validateFeed from './validators';

export default (container, state) => {
  const formElement = container.querySelector('.rss-form');
  const { form, feeds } = state;

  formElement.addEventListener('submit', (e) => {
    e.preventDefault();

    const formData = new FormData(e.target);
    const url = formData.get('url').trim();

    form.url = url;

    const errorMsg = validateFeed(form.url, feeds);

    if (errorMsg) {
      form.error = errorMsg;
    } else {
      form.state = formState.FILLED;
    }
  });
};
