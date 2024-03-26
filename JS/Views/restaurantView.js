class RestaurantView {
  init() {
    this.content.replaceChildren();
    this.content.insertAdjacentHTML(
      "afterbegin",
      `<ul class="breadcrumb" id="breadcrumb"> 
              <li class="breadcrumb-item"><a id="init-bread" href="#"> Inicio </a></li>
           </ul>
           </div>
           <div id="content__title" class="content__title"><h1>cocina vegetariana/vegana</h1></div>
            `
    );
  }
}
