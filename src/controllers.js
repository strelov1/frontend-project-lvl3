import formState from './constant';
import validateFeed from './validators';

export default (container, state) => {
  const formElement = container.querySelector('.rss-form');
  const modalButtons = container.querySelectorAll('button[data-bs-toggle="modal"]');

  const modal = document.getElementById('exampleModal');
  const modalTitle = modal.querySelector('.modal-title');
  const modalBody = modal.querySelector('.modal-body');
  const modalLink = modal.querySelector('.full-article');

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

  modalButtons.forEach((button) => {
    button.addEventListener('click', (e) => {
      const postId = e.target.dataset.id;
      const post = state.posts.find((item) => item.id === postId);

      modalTitle.textContent = post.title;
      modalBody.textContent = post.description;
      modalLink.href = post.link;

      state.readPosts.push(postId);
    });
  });
};
