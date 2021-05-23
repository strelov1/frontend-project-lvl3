import classNames from 'classnames';

export default (container, state) => {
  const { value, error } = state.form;

  // eslint-disable-next-line no-param-reassign
  container.innerHTML = `
    <div class="col-md-10 col-lg-8 mx-auto text-white">
      <h1>RSS агрегатор</h1>
      <p class="lead text-muted">Начните читать RSS сегодня! Это легко, это красиво.</p>
      <form class="rss-form">
        <div class="input-group mb-3">
          <input type="text" autofocus name="url" class="${classNames('form-control', { 'is-invalid': !!error })}" placeholder="ссылка RSS" aria-label="ссылка RSS" aria-describedby="button-addon" value="${value}">
          <div class="input-group-append">
            <button class="btn btn-outline-secondary" type="submit" id="button-addon">ADD</button>
          </div>
        </div>
      </form>
      <p class="text-muted">
        Пример: https://ru.hexlet.io/lessons.rss
      </p>
      ${error ? `<div class="feedback text-danger">${error}</div>` : ''}
    </div>
  `;
};
