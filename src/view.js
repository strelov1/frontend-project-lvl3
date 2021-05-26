import Mustache from 'mustache';
import formState from './constant';

const template = `
<section class="jumbotron">
    <div class="container-fluid bg-dark p-5">
        <div class="row">
            <div class="col-md-10 col-lg-8 mx-auto text-white">
                <h1>{{#i18n}}form.title{{/i18n}}</h1>
                <p class="lead text-muted">{{#i18n}}form.description{{/i18n}}</p>
                <form class="rss-form">
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
                </form>
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
            </div>
        </div>
    </div>
</section>
{{#feeds.0}}
  <section class="container-fluid p-5">
      <div class="row">
          <div class="col-md-10 col-lg-8 mx-auto feeds">
              <h2>{{#i18n}}feeds{{/i18n}}</h2>
              <ul class="list-group mb-5">
              {{#feeds}}
                <li class="list-group-item">
                    <h3>{{ title }}</h3>
                    <p>{{ description }}</p>
                </li>
              {{/feeds}}
              </ul>
          </div>
      </div>
      <div class="row">
      <div class="col-md-10 col-lg-8 mx-auto posts">
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
        </div>
      </div>
  </section>
{{/feeds.0}}
`;

export default (container, state, i18next) => {
  // eslint-disable-next-line no-param-reassign
  container.innerHTML = Mustache.render(template, {
    ...state,
    i18n: () => (key) => i18next.t(key),
    formCompleted: state.form.state === formState.COMPLETED,
    formLoading: state.form.state === formState.LOADING,
    posts: state.posts.map((post) => ({
      ...post, isReadPost: state.readPosts.includes(post.id),
    })),
  });
  document.title = i18next.t('form.title');
};
