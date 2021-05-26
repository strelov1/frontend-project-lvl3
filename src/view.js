import Mustache from 'mustache';
import formState from './constant';

const formTemplate = `
<div class="input-group mb-3">
    <input
        {{# formLoading }}readonly{{/ formLoading }}
        type="text"
        autofocus
        required
        name="url"
        class="form-control {{# form.error}}is-invalid{{/ form.error}}"
        placeholder="ссылка RSS"
        aria-label="url"
        aria-describedby="button-addon"
        value="{{ form.url }}"
    >
    <div class="input-group-append">
        <button 
            class="btn btn-outline-secondary"
            type="submit"
            id="button-addon"
            aria-label="add"
            {{# formLoading }}disabled{{/ formLoading }}
        >
            ADD
        </button>
    </div>
</div>
`;

const formStatusTemplate = `
<p class="text-muted">
{{#i18n}}form.example{{/i18n}} https://ru.hexlet.io/lessons.rss
</p>
{{# form.error }}
<div class="feedback text-danger">{{ form.error }}</div>
{{/ form.error }}
{{# formCompleted }}
<div class="feedback text-success">
    {{#i18n}}form.success{{/i18n}}
</div>
{{/ formCompleted }}
{{# formLoading }}Loading...{{/ formLoading }}
`

const fullTemplate = `
<section class="jumbotron">
    <div class="container-fluid bg-dark p-5">
        <div class="row">
            <div class="col-md-10 col-lg-8 mx-auto text-white">
                <h1>{{#i18n}}form.title{{/i18n}}</h1>
                <p class="lead text-muted">{{#i18n}}form.description{{/i18n}}</p>
                <form class="rss-form">
                   ${formTemplate}
                </form>
                ${formStatusTemplate}
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
<h2>{{#i18n}}posts{{/i18n}}</h2>
<ul class="list-group">
    {{#posts}}
    <li class="list-group-item d-flex justify-content-between align-items-start">
        {{#isReadPost}}
            <a href="{{ link }}" class="font-weight-normal" data-id="{{ id }}" target="_blank" rel="noopener noreferrer">
                {{ title }}
            </a>
        {{/isReadPost}}
        {{^isReadPost}}
            <a href="{{ link }}" class="font-weight-bold" data-id="{{ id }}" target="_blank" rel="noopener noreferrer">
                {{ title }}
            </a>
        {{/isReadPost}}
        <button type="button" class="btn btn-primary btn-sm" data-id="{{ id }}" data-bs-toggle="modal" data-bs-target="#exampleModal">
            Просмотр
        </button>
    </li>
    {{/posts}}
</ul>
`

export const renderForm = (container, state, i18next) => {
    const formContainer = container.querySelector('.rss-form');
    const content = Mustache.render(formTemplate, {
        form: state.form,
        i18n: () => (key) => i18next.t(key),
        formCompleted: state.form.state === formState.COMPLETED,
        formLoading: state.form.state === formState.LOADING,
    });
    formContainer.innerHTML = content;
};

export const renderFormStatus = (container, state, i18next) => {
    const formContainer = container.querySelector('.rss-form');
    const content = Mustache.render(formStatusTemplate, {
        form: state.form,
        i18n: () => (key) => i18next.t(key),
        formCompleted: state.form.state === formState.COMPLETED,
        formLoading: state.form.state === formState.LOADING,
    });
    formContainer.nextElementSibling.innerHTML = content;
};

export const renderFeeds = (container, state, i18next) => {
   const feedsContainer = container.querySelector('.feeds');
   const content = Mustache.render(feedsTemplate,  {
    i18n: () => (key) => i18next.t(key),
    feeds: state.feeds,
   });
   feedsContainer.innerHTML = content;
};

export const renderPosts = (container, state, i18next) => {
   const postsContainer = container.querySelector('.posts');
   const content = Mustache.render(postsTemplate, {
        i18n: () => (key) => i18next.t(key),
        posts: state.posts.map((post) => ({
        ...post, isReadPost: state.readPosts.includes(post.id),
        })),
   });
   postsContainer.innerHTML = content;
};


 
export default (container, state, i18next) => {
  document.title = i18next.t('form.title');
  container.innerHTML = Mustache.render(fullTemplate, {
    ...state,
    i18n: () => (key) => i18next.t(key),
    formCompleted: state.form.state === formState.COMPLETED,
    formLoading: state.form.state === formState.LOADING,
    posts: state.posts.map((post) => ({
      ...post, isReadPost: state.readPosts.includes(post.id),
    })),
  });
};
