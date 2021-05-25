import template from './templates/main.mustache';

export default (container, state, i18next) => {
  // eslint-disable-next-line no-param-reassign
  container.innerHTML = template({
    ...state,
    i18n: () => (key) => i18next.t(key),
  });
};
