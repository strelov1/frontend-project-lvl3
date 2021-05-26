import onChange from 'on-change';
import _ from 'lodash';

import parseRss from './parser';
import fetchFeeds from './utils';
import formState from './constant';

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

export default (initState, onUpdate) => {
  const state = onChange(initState, function watch(path, value) {
    switch (path) {
      case 'form.error':
        if (value) {
          this.form.state = formState.EMPTY;
        }
        break;
      default:
        break;
    }
    onUpdate(this);
  });

  // first render
  onUpdate(state);

  const refreshPosts = () => {
    const promises = state.feeds.map((feed) => updatePosts(feed, state));
    Promise.all(promises).finally(() => {
      setTimeout(() => refreshPosts(state), refreshPostsTimeout);
    });
  };

  setTimeout(() => refreshPosts(), refreshPostsTimeout);
};
