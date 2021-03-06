import onChange from 'on-change';
import _ from 'lodash';

import { postsHandlers, formHandlers } from './controllers';
import {
  renderFeeds, renderPosts, renderForm, renderModal,
} from './view';
import parseRss from './parser';
import { fetchFeeds } from './utils';

const refreshPostsTimeout = 5 * 1000;

const updatePosts = (feed, state) => fetchFeeds(feed.url).then((xmlString) => {
  const data = parseRss(xmlString);
  const oldPosts = state.posts.filter((post) => post.feedId === feed.id);
  const diff = _.differenceBy(data.items, oldPosts, 'title');
  if (!_.isEmpty(diff)) {
    const newPost = diff.map((post) => ({ ...post, feedId: feed.id, id: _.uniqueId('post_') }));
    state.posts.unshift(...newPost);
  }
});

export default (initState, elements, i18n) => {
  const watchedState = onChange(initState, (path) => {
    switch (path) {
      case 'form.state':
        renderForm(elements, watchedState, i18n);
        break;
      case 'feeds':
        renderFeeds(elements, watchedState, i18n);
        break;
      case 'posts':
      case 'viewedPosts':
        renderPosts(elements, watchedState, i18n);
        postsHandlers(elements, watchedState);
        break;
      case 'selectedPostId':
        renderModal(elements, watchedState);
        break;
      default:
        break;
    }
  });

  // first render
  renderForm(elements, watchedState, i18n);
  formHandlers(elements, watchedState);

  const refreshPosts = () => {
    const promises = watchedState.feeds.map((feed) => updatePosts(feed, watchedState));
    Promise.all(promises).finally(() => {
      setTimeout(() => refreshPosts(watchedState), refreshPostsTimeout);
    });
  };

  setTimeout(() => refreshPosts(), refreshPostsTimeout);
};
