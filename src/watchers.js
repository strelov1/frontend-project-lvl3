import onChange from 'on-change';
import _ from 'lodash';

import { postsHandlers, formHandlers } from './controllers';
import renderFull, {
  renderFeeds, renderPosts, renderForm, renderFormStatus,
} from './view';
import parseRss from './parser';
import fetchFeeds from './utils';

const refreshPostsTimeout = 5 * 1000;

const updatePosts = (feed, state) => fetchFeeds(feed.url).then((xmlString) => {
  const data = parseRss(xmlString);
  if (data) {
    const oldPosts = state.posts.filter((post) => post.feedId === feed.id);
    const diff = _.differenceBy(data.items, oldPosts, 'title');
    if (!_.isEmpty(diff)) {
      const newPost = diff.map((post) => ({ ...post, feedId: feed.id, id: _.uniqueId('post_') }));
      state.posts.unshift(...newPost);
    }
  }
});

export default (initState, i18Instance, container) => {
  const watchedState = onChange(initState, (path) => {
    switch (path) {
      case 'form.state':
        renderForm(container, watchedState, i18Instance);
        renderFormStatus(container, watchedState, i18Instance);
        formHandlers(container, watchedState, i18Instance);
        break;
      case 'feeds':
        renderFeeds(container, watchedState, i18Instance);
        break;
      case 'readPosts':
      case 'posts':
        renderPosts(container, watchedState, i18Instance);
        postsHandlers(container, watchedState);
        break;
      default:
        break;
    }
  });

  // first render
  renderFull(container, watchedState, i18Instance);
  formHandlers(container, watchedState, i18Instance);

  const refreshPosts = () => {
    const promises = watchedState.feeds.map((feed) => updatePosts(feed, watchedState));
    Promise.all(promises).finally(() => {
      setTimeout(() => refreshPosts(watchedState), refreshPostsTimeout);
    });
  };

  setTimeout(() => refreshPosts(), refreshPostsTimeout);
};
