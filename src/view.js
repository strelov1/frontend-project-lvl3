export default (container, state) => {
  const { value, error } = state.form;

  // eslint-disable-next-line no-param-reassign
  container.innerHTML = `
      <form action="" class="rss-form2">
        <div class="form-row">
          <div class="col">
            <input autofocus="" required="" name="url" aria-label="url" class="form-control form-control-lg w-100" placeholder="ссылка RSS" value="${value}">
          </div>
          ${error}
          <div class="col-auto">
            <button type="submit" aria-label="add" class="btn btn-lg btn-primary px-sm-5">
             Add
            </button>
          </div>
        </div>
      </form>
  `;
};
