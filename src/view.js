export default (container, state) => {
  container.innerHTML = `
    <div class="input-group mb-3">
      <input type="text" class="form-control" placeholder="ссылка RSS" aria-label="ссылка RSS" aria-describedby="button-addon" value="${state.form.value}">
      <div class="input-group-append">
        <button class="btn btn-outline-secondary" type="button" id="button-addon">ADD2</button>
      </div>
      ${state.form.error}
    </div>
  `;
};
