import _ from 'lodash';

import formState from './constant';
import validateFeed from './validators';
import parseRss from './parser';
import { fetchFeeds, parseErrorType } from './utils';

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

export const formHandlers = (container, state) => {
  const formElement = container.querySelector('.rss-form');

  const { form, feeds } = state;

  formElement.addEventListener('submit', (e) => {
    e.preventDefault();

    const formData = new FormData(e.target);
    const url = formData.get('url').trim();

    form.url = url;

    const validationError = validateFeed(form.url, feeds);

    if (validationError) {
      form.error = validationError;
      form.state = formState.ERROR;
      return;
    }

    form.state = formState.LOADING;

    loadNewFeeds(form.url, state)
      .then(() => {
        form.url = '';
        form.error = null;
        form.state = formState.COMPLETED;
      })
      .catch((loadingError) => {
        console.log('ERROR', loadingError);
        form.error = parseErrorType(loadingError);
        form.state = formState.ERROR;
      });
  });
};

export const postsHandlers = (container, state) => {
  const modalButtons = container.querySelectorAll('button[data-bs-toggle="modal"]');

  const modal = document.getElementById('exampleModal');
  const modalTitle = modal.querySelector('.modal-title');
  const modalBody = modal.querySelector('.modal-body');
  const modalLink = modal.querySelector('.full-article');

  const { readPosts, posts } = state;

  modalButtons.forEach((button) => {
    button.addEventListener('click', (e) => {
      const postId = e.target.dataset.id;
      const foundPost = posts.find((item) => item.id === postId);

      modalTitle.textContent = foundPost.title;
      modalBody.textContent = foundPost.description;
      modalLink.href = foundPost.link;

      readPosts.push(postId);
    });
  });
};
