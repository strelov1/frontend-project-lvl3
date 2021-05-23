import classNames from 'classnames';

const renderFrom = ({ form }) => (
  `<section class="jumbotron">
      <div class="container-fluid bg-dark p-5">
        <div class="row">
            <div class="col-md-10 col-lg-8 mx-auto text-white">
              <h1>RSS агрегатор</h1>
              <p class="lead text-muted">Начните читать RSS сегодня! Это легко, это красиво.</p>
              <form class="rss-form">
                <div class="input-group mb-3">
                <input type="text" autofocus name="url" class="${classNames('form-control', { 'is-invalid': !!form.error })}" placeholder="ссылка RSS" aria-label="ссылка RSS" aria-describedby="button-addon" value="${form.value}">
                <div class="input-group-append">
                    <button class="btn btn-outline-secondary" type="submit" id="button-addon">ADD</button>
                  </div>
                </div>
              </form>
              <p class="text-muted">
                Пример: https://ru.hexlet.io/lessons.rss
              </p>
              ${form.error ? `<div class="feedback text-danger">${form.error}</div>` : ''}
          </div>
        </div>
      </div>
    </section>
    `
);

const renderFeeds = ({ feeds }) => {
  if (!feeds.length) {
    return '';
  }
  return (
    `<section class="container-fluid p-5">
      <div class="row">
        <div class="col-md-10 col-lg-8 mx-auto feeds">
          <h2>Фиды</h2>
          <ul class="list-group mb-5">
            <li class="list-group-item">
              <h3>Новые уроки на Хекслете</h3>
              <p>Практические уроки по программированию</p>
            </li>
          </ul>
        </div>
      </div>
      <div class="row">
        <div class="col-md-10 col-lg-8 mx-auto posts">
          <h2>Посты</h2>
            <ul class="list-group">
              <li class="list-group-item d-flex justify-content-between align-items-start">
                <a href="https://ru.hexlet.io/courses/python-declarative-programming/lessons/outro/theory_unit" class="font-weight-bold" data-id="2" target="_blank" rel="noopener noreferrer">Заключение / Python: Декларативное программирование</a>
                <button type="button" class="btn btn-primary btn-sm" data-id="2" data-toggle="modal" data-target="#modal">Просмотр</button>
              </li>
              <li class="list-group-item d-flex justify-content-between align-items-start">
                <a href="https://ru.hexlet.io/courses/python-declarative-programming/lessons/generator-functions/theory_unit" class="font-weight-bold" data-id="3" target="_blank" rel="noopener noreferrer">Функции-генераторы / Python: Декларативное программирование</a>
                <button type="button" class="btn btn-primary btn-sm" data-id="3" data-toggle="modal" data-target="#modal">Просмотр</button>
              </li>
              <li class="list-group-item d-flex justify-content-between align-items-start">
                <a href="https://ru.hexlet.io/courses/python-advanced-testing/lessons/files/theory_unit" class="font-weight-bold" data-id="4" target="_blank" rel="noopener noreferrer">Тестирование кода, взаимодействующего с файлами / Python: Продвинутое тестирование</a><button type="button" class="btn btn-primary btn-sm" data-id="4" data-toggle="modal" data-target="#modal">Просмотр</button></li><li class="list-group-item d-flex justify-content-between align-items-start"><a href="https://ru.hexlet.io/courses/python-advanced-testing/lessons/side-effects/theory_unit" class="font-weight-bold" data-id="5" target="_blank" rel="noopener noreferrer">Побочные эффекты / Python: Продвинутое тестирование</a><button type="button" class="btn btn-primary btn-sm" data-id="5" data-toggle="modal" data-target="#modal">Просмотр</button></li><li class="list-group-item d-flex justify-content-between align-items-start"><a href="https://ru.hexlet.io/courses/python-advanced-testing/lessons/fixtures/theory_unit" class="font-weight-bold" data-id="6" target="_blank" rel="noopener noreferrer">Фикстуры / Python: Продвинутое тестирование</a><button type="button" class="btn btn-primary btn-sm" data-id="6" data-toggle="modal" data-target="#modal">Просмотр</button></li><li class="list-group-item d-flex justify-content-between align-items-start"><a href="https://ru.hexlet.io/courses/python-advanced-testing/lessons/errors/theory_unit" class="font-weight-bold" data-id="7" target="_blank" rel="noopener noreferrer">Тестирование ошибок / Python: Продвинутое тестирование</a><button type="button" class="btn btn-primary btn-sm" data-id="7" data-toggle="modal" data-target="#modal">Просмотр</button></li><li class="list-group-item d-flex justify-content-between align-items-start"><a href="https://ru.hexlet.io/courses/python-advanced-testing/lessons/init/theory_unit" class="font-weight-bold" data-id="8" target="_blank" rel="noopener noreferrer">Введение / Python: Продвинутое тестирование</a><button type="button" class="btn btn-primary btn-sm" data-id="8" data-toggle="modal" data-target="#modal">Просмотр</button></li><li class="list-group-item d-flex justify-content-between align-items-start"><a href="https://ru.hexlet.io/courses/css-transform/lessons/2d-rotate/theory_unit" class="font-weight-bold" data-id="9" target="_blank" rel="noopener noreferrer">2D трансформации. Вращение / CSS: Transform</a><button type="button" class="btn btn-primary btn-sm" data-id="9" data-toggle="modal" data-target="#modal">Просмотр</button></li><li class="list-group-item d-flex justify-content-between align-items-start"><a href="https://ru.hexlet.io/courses/css-transform/lessons/2d-translate/theory_unit" class="font-weight-bold" data-id="10" target="_blank" rel="noopener noreferrer">2D трансформации. Перемещение / CSS: Transform</a>
                <button type="button" class="btn btn-primary btn-sm" data-id="10" data-toggle="modal" data-target="#modal">Просмотр</button>
              </li>
              <li class="list-group-item d-flex justify-content-between align-items-start">
                <a href="https://ru.hexlet.io/courses/css-transform/lessons/intro/theory_unit" class="font-weight-bold" data-id="11" target="_blank" rel="noopener noreferrer">Введение / CSS: Transform</a>
                <button type="button" class="btn btn-primary btn-sm" data-id="11" data-toggle="modal" data-target="#modal">Просмотр</button>
              </li>
            </ul>
        </div>
      </div>
    </section>`
  );
};

export default (container, state) => {
  // eslint-disable-next-line no-param-reassign
  container.innerHTML = `
    ${renderFrom(state)}
    ${renderFeeds(state)}
  `;
};
