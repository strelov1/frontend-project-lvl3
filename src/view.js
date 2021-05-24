import template from './templates/main.mustache';

export default (container, state) => {
  // eslint-disable-next-line no-param-reassign
  container.innerHTML = template(state);
};
