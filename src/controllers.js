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

export const formHandlers = (elements, state) => {
  const { formContainer } = elements;

  const { form, feeds } = state;

  formContainer.addEventListener('submit', (e) => {
    e.preventDefault();

    const formData = new FormData(e.target);
    const url = formData.get('url').trim();

    form.url = url;
    form.state = formState.LOADING;

    const validationError = validateFeed(form.url, feeds);

    if (validationError) {
      form.error = validationError;
      form.state = formState.ERROR;
      return;
    }

    loadNewFeeds(form.url, state)
      .then(() => {
        form.url = '';
        form.error = null;
        form.state = formState.COMPLETED;
      })
      .catch((loadingError) => {
        form.error = ({ key: parseErrorType(loadingError) });
        form.state = formState.ERROR;
      });
  });
};

export const postsHandlers = (elements, state) => {
  const { postContainer } = elements;

  const modalButtons = postContainer.querySelectorAll('button[data-bs-toggle="modal"]');

  modalButtons.forEach((button) => {
    button.addEventListener('click', (e) => {
      const postId = e.target.dataset.id;
      // eslint-disable-next-line no-param-reassign
      state.selectedPostId = postId;
      state.viewedPosts.add(postId);
    });
  });
};
