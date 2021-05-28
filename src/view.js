import Mustache from 'mustache';
import formState from './constant';

const fullTemplate = `
<section class="jumbotron">
    <div class="container-fluid bg-dark p-5">
        <div class="row">
            <div class="col-md-10 col-lg-8 mx-auto text-white">
                <h1>{{#i18n}}form.title{{/i18n}}</h1>
                <p class="lead text-muted">{{#i18n}}form.description{{/i18n}}</p>
                <form class="rss-form">
                </form>
            </div>
        </div>
    </div>
</section>
<section class="container-fluid p-5">
    <div class="row">
    <div class="col-md-10 col-lg-8 mx-auto feeds"></div>
    </div>
    <div class="row">
    <div class="col-md-10 col-lg-8 mx-auto posts"></div>
    </div>
</section>
`;

const feedsTemplate = `
<h2>{{#i18n}}feeds{{/i18n}}</h2>
    <ul class="list-group mb-5">
    {{#feeds}}
        <li class="list-group-item">
            <h3>{{ title }}</h3>
            <p>{{ description }}</p>
        </li>
    {{/feeds}}
</ul>
`;

const postsTemplate = `
<h2>{{#i18n}}posts.title{{/i18n}}</h2>
<ul class="list-group">
    {{#posts}}
    <li class="list-group-item d-flex justify-content-between align-items-start">
        {{#isReadPost}}
            <a href="{{ link }}" class="font-weight-normal fw-normal" data-id="{{ id }}" target="_blank" rel="noopener noreferrer">
                {{ title }}
            </a>
        {{/isReadPost}}
        {{^isReadPost}}
            <a href="{{ link }}" class="font-weight-bold fw-bold" data-id="{{ id }}" target="_blank" rel="noopener noreferrer">
                {{ title }}
            </a>
        {{/isReadPost}}
        <button type="button" class="btn btn-primary btn-sm" data-id="{{ id }}" data-bs-toggle="modal" data-bs-target="#exampleModal">
            {{#i18n}}posts.show{{/i18n}}
        </button>
    </li>
    {{/posts}}
</ul>
`;

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

export const renderFeeds = (container, state, i18next) => {
  const feedsContainer = container.querySelector('.feeds');
  feedsContainer.innerHTML = Mustache.render(feedsTemplate, {
    i18n: () => (key) => i18next.t(key),
    feeds: state.feeds,
  });
};

export const renderPosts = (container, state, i18next) => {
  const postsContainer = container.querySelector('.posts');
  postsContainer.innerHTML = Mustache.render(postsTemplate, {
    i18n: () => (key) => i18next.t(key),
    posts: state.posts.map((post) => ({
      ...post, isReadPost: state.readPosts.includes(post.id),
    })),
  });
};

export default (container, state, i18next) => {
  document.title = i18next.t('form.title');
  // eslint-disable-next-line no-param-reassign
  container.innerHTML = Mustache.render(fullTemplate, {
    ...state,
    i18n: () => (key) => i18next.t(key),
    posts: state.posts.map((post) => ({
      ...post, isReadPost: state.readPosts.includes(post.id),
    })),
  });
};
