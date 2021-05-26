import _ from 'lodash';

import formState from './constant';
import validateFeed from './validators';
import parseRss from './parser';
import fetchFeeds from './utils';

const loadNewFeeds = (url, state) => fetchFeeds(url).then((xmlString) => {
  const data = parseRss(xmlString);
  if (data) {
    const feed = {
      id: _.uniqueId('feed_'),
      url,
      title: data.title,
      description: data.description,
    };

    state.feeds.unshift(feed);
    state.posts.unshift(...data.items.map((item) => ({
      id: _.uniqueId('post_'),
      feedId: feed.id,
      ...item,
    })));
  }
});

export default (container, state, i18n) => {
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
      form.state = formState.ERROR;
      return;
    }

    form.state = formState.LOADING;

    loadNewFeeds(form.url, state)
      .then(() => {
        form.url = '';
        form.error = '';
        form.state = formState.COMPLETED;
      })
      .catch((error) => {
        const errorKey = error.isParsingError ? 'rss_error' : 'network_error';
        form.error = i18n.t(`form.validation.${errorKey}`);
        form.state = formState.FILLING;
      });
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
