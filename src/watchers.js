import axios from 'axios';
import onChange from 'on-change';
import _ from 'lodash';

import parseRss from './parser';
import formState from './constant';

const refreshPostsTimeout = 5 * 1000;

const fetchFeeds = (url) => axios.get(url)
  .then((response) => response.data);

const loadNewFeeds = (url, state) => fetchFeeds(url).then((xmlString) => {
  const data = parseRss(xmlString);
  if (data) {
    const feed = {
      id: _.uniqueId('feed_'),
      url,
      title: data.title,
      description: data.description,
    };

    state.feeds.push(feed);
    state.posts.push(...data.items.map((item) => ({
      id: _.uniqueId('post_'),
      feedId: feed.id,
      ...item,
    })));
  }
});

const updatePosts = (feed, state) => fetchFeeds(feed.url).then((xmlString) => {
  const data = parseRss(xmlString);
  if (data) {
    const oldPosts = state.posts.filter((post) => post.feedId === feed.id);
    const newPosts = data.items.map((post) => ({ ...post, feedId: feed.id, id: _.uniqueId('post_') }));
    const diff = _.differenceBy(oldPosts, newPosts, 'title');
    if (!_.isEmpty(diff)) {
      state.posts.unshift(...diff);
    }
  }
});

const refreshPosts = (state) => {
  const promises = state.feeds.map((feed) => updatePosts(feed, state));
  Promise.all(promises).finally(() => {
    setTimeout(() => refreshPosts(state), refreshPostsTimeout);
  });
};

export default (initState, onUpdate) => {
  const state = onChange(initState, function watch(path, value) {
    switch (path) {
      case 'form.state':
        if (this.form.state === formState.FILLED) {
          loadNewFeeds(this.form.url, this)
            .then(() => {
              this.form.state = formState.COMPLETED;
              this.form.url = '';
              this.form.error = '';
            })
            .catch((e) => {
              this.form.error = e.message;
            });
        }
        break;
      case 'form.error':
        // clean completed on error
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

  setTimeout(() => refreshPosts(state), refreshPostsTimeout);
};
