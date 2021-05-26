import onChange from 'on-change';
import _ from 'lodash';

import bindControllers from './controllers';
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
  const state = onChange(initState, function watch(path) {
    switch (path) {
      case 'form.state':
        renderForm(container, this, i18Instance);
        renderFormStatus(container, this, i18Instance);
        bindControllers(container, this, i18Instance);
        break;
      case 'feeds':
        renderFeeds(container, this, i18Instance);
        break;
      case 'posts':
      case 'readPosts':
        renderPosts(container, this, i18Instance);
        bindControllers(container, state, i18Instance);
        break;
      default:
        break;
    }
  });

  // first render
  renderFull(container, state, i18Instance);
  bindControllers(container, state, i18Instance);

  const refreshPosts = () => {
    const promises = state.feeds.map((feed) => updatePosts(feed, state));
    Promise.all(promises).finally(() => {
      setTimeout(() => refreshPosts(state), refreshPostsTimeout);
    });
  };

  setTimeout(() => refreshPosts(), refreshPostsTimeout);
};
