import formState from './constant';
import template from './templates/main.mustache';

export default (container, state, i18next) => {
  // eslint-disable-next-line no-param-reassign
  container.innerHTML = template({
    ...state,
    i18n: () => (key) => i18next.t(key),
    formCompleted: state.form.state === formState.COMPLETED,
    posts: state.posts.map((post) => ({
      ...post, isReadPost: state.readPosts.includes(post.id),
    })),
  });
  document.title = i18next.t('form.title');
};
