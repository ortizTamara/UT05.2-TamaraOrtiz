class RestaurantView {
  constructor() {
    this.main = document.getElementById("dishes");
  }
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

  ShowRandomDishes(dishes) {
    this.main.replaceChildren();
    this.main.id = "dishes-random";
    const arrDishes = Array.from(dishes);

    for (let index = 0; index < 3; index++) {
      let elem = arrDishes.splice(
        Math.floor(Math.random() * arrDishes.length),
        1
      );
      this.main.insertAdjacentHTML(
        "afterbegin",
        ` 
      </figure>
        <div class="dish">
          <figure class="dish-image">
            <a data-dish="${elem[0][1].dish.name}" "href="#single-product">
              <img src="./Recursos/platos/${elem[0][1].dish.image}" alt="Imagen de un plato de ${elem[0][1].dish.name}" />
              <figcaption class="dish__name">
                <h1>${elem[0][1].dish.name}</h1>
              </figcaption>
            </a> 
          </figure>`
      );
    }
  }
}

export default RestaurantView;
