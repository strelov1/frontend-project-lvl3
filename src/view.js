import formState from './constant';

const buildAddInput = (view, i18n) => {
  const input = document.createElement('input');

  input.setAttribute('type', 'text');
  input.setAttribute('name', 'url');
  input.setAttribute('autofocus', true);
  input.setAttribute('required', true);
  input.setAttribute('placeholder', i18n.t('form.label'));
  input.setAttribute('aria-label', 'url');
  input.setAttribute('aria-describedby', 'button-addon');
  input.setAttribute('value', view.form.url);

  input.classList.add('form-control');

  if (view.form.error) {
    input.classList.add('is-invalid');
  }
  if (view.formLoading) {
    input.setAttribute('readonly', true);
  }
  return input;
};

const buildAddButton = (view, i18n) => {
  const button = document.createElement('button');

  button.setAttribute('type', 'submit');
  button.setAttribute('id', 'button-addon');
  button.setAttribute('aria-label', 'add');
  button.textContent = i18n.t('form.button');

  button.classList.add('btn', 'btn-outline-secondary');

  if (view.formLoading) {
    button.setAttribute('disabled', true);
  }
  return button;
};

const buildFormStatus = (state, i18n) => {
  const fragment = document.createDocumentFragment();

  const example = document.createElement('div');
  example.classList.add('text-muted');
  example.textContent = `${i18n.t('form.example')} https://ru.hexlet.io/lessons.rss`;
  fragment.appendChild(example);

  if (state.form.error) {
    const feedbackError = document.createElement('div');
    feedbackError.classList.add('feedback', 'text-danger');
    feedbackError.textContent = i18n.t(state.form.error);
    fragment.appendChild(feedbackError);
  }

  if (state.form.state === formState.COMPLETED) {
    const feedbackSuccess = document.createElement('div');
    feedbackSuccess.classList.add('feedback', 'text-success');
    feedbackSuccess.textContent = i18n.t('form.success');
    fragment.appendChild(feedbackSuccess);
  }

  if (state.form.state === formState.LOADING) {
    const formLoading = document.createElement('div');
    formLoading.classList.add('text-muted');
    formLoading.textContent = i18n.t('form.loading');
    fragment.appendChild(formLoading);
  }

  return fragment;
};

const buildTitle = (text) => {
  const title = document.createElement('h2');
  title.textContent = text;
  return title;
};

const buildFeedList = (feed) => {
  const liElement = document.createElement('li');
  liElement.classList.add('list-group-item');

  const title = document.createElement('h3');
  title.textContent = feed.title;

  const p = document.createElement('p');
  p.textContent = feed.description;

  liElement.append(title);
  liElement.append(p);
  return liElement;
};

export const renderForm = (container, state, i18n) => {
  const formContainer = container.querySelector('.rss-form');

  const addInput = buildAddInput(state, i18n);
  const addButton = buildAddButton(state, i18n);

  const inputGroupWrapper = document.createElement('div');
  inputGroupWrapper.classList.add('input-group-append');
  inputGroupWrapper.appendChild(addButton);

  const divWrapper = document.createElement('div');
  divWrapper.classList.add('input-group', 'mb-3');

  divWrapper.appendChild(addInput);
  divWrapper.appendChild(inputGroupWrapper);

  formContainer.innerHTML = '';
  formContainer.appendChild(divWrapper);

  const formStatus = buildFormStatus(state, i18n);
  formContainer.append(formStatus);
};

export const renderFeeds = (container, state, i18n) => {
  const feedsContainer = container.querySelector('.feeds');
  const fragment = document.createDocumentFragment();

  const titleElement = buildTitle(i18n.t('feeds'));
  fragment.append(titleElement);

  const ulElement = document.createElement('ul');
  ulElement.classList.add('list-group', 'mb-5');

  const liElements = state.feeds.map(buildFeedList);

  ulElement.append(...liElements);
  fragment.append(ulElement);

  feedsContainer.innerHTML = '';
  feedsContainer.append(fragment);
};

const buildLink = (post) => {
  const link = document.createElement('a');
  link.setAttribute('href', post.link);

  link.setAttribute('target', '_blank');
  link.setAttribute('rel', 'noopener noreferrer');

  if (post.isReadPost) {
    link.classList.add('font-weight-normal', 'fw-normal');
  } else {
    link.classList.add('font-weight-bold', 'fw-bold');
  }

  link.textContent = post.title;
  return link;
};

const buildButton = (post, i18n) => {
  const button = document.createElement('button');
  button.setAttribute('type', 'button');
  button.setAttribute('data-id', post.id);
  button.setAttribute('data-bs-toggle', 'modal');
  button.setAttribute('data-bs-target', '#exampleModal');

  button.classList.add('btn', 'btn-primary', 'btn-sm');

  button.textContent = i18n.t('posts.show');

  return button;
};

const buildPostList = (post, i18n) => {
  const liElement = document.createElement('li');
  liElement.classList.add('list-group-item', 'd-flex', 'justify-content-between', 'align-items-start');

  const link = buildLink(post);
  const button = buildButton(post, i18n);

  liElement.append(link);
  liElement.append(button);
  return liElement;
};

export const renderPosts = (container, state, i18n) => {
  const posts = state.posts.map((post) => ({
    ...post, isReadPost: state.readPosts.includes(post.id),
  }));

  const postsContainer = container.querySelector('.posts');
  const fragment = document.createDocumentFragment();

  const titleElement = buildTitle(i18n.t('posts.title'));
  fragment.append(titleElement);

  const ulElement = document.createElement('ul');
  ulElement.classList.add('list-group');

  const liElements = posts.map((post) => buildPostList(post, i18n));

  ulElement.append(...liElements);
  fragment.append(ulElement);

  postsContainer.innerHTML = '';
  postsContainer.append(fragment);
};
