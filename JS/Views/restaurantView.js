class RestaurantView {
  constructor() {
    //Accedemos a los contenedores y elementos
    this.main = document.getElementById("dishes");
    this.content = document.getElementById("content");
    this.categories = document.getElementById("categories");
    this.dropcat = document.getElementById("dropdown-categories");
    this.droprest = document.getElementById("dropdown-restaurant");
    this.navcategdrop = document.getElementById("nav-categories");
    this.navrestaudrop = document.getElementById("nav-restaurant");
  }
  init() {
    this.content.replaceChildren();
    this.content.insertAdjacentHTML(
      "afterbegin",
      `<ul class="breadcrumbs" id="breadcrumbs"> 
              <li class="breadcrumbs-item"><a id="init-bread" href="#"> Inicio </a></li>
           </ul>
           </div>
            `
    );

    this.categories.replaceChildren();
    const contentCategories = document.createElement("div");
    contentCategories.id = "list-categories";

    contentCategories.insertAdjacentHTML(
      "afterbegin",
      `
        <div class="category">
          <a data-category="Entrantes" href="#categorias"><h1>Entrantes</h1>
        </div>
        <div class="category">
          <a data-category="Platos Principales" href="#categorias"><h1>Platos Principales</h1>
        </div>
        <div class="category">
          <a data-category="Postres" href="#categorias"><h1>Postres</h1>
        </div>
        `
    );
    this.categories.append(contentCategories);
  }

  ShowRandomDishes(dishes) {
    this.main.replaceChildren(); //Limpiamos el contenido principal
    this.main.id = "dishes-random";
    const arrDishes = Array.from(dishes); //Nos aseguramos que haya platos

    for (let index = 0; index < 3; index++) {
      let elem = arrDishes.splice(
        Math.floor(Math.random() * arrDishes.length),
        1
      );
      // let dishName = elem[0].dish.name;
      // console.log(elem[0].dish.name);
      this.main.insertAdjacentHTML(
        "afterbegin",
        ` 
      </figure>
        <div class="dish">
          <figure class="dish-image">
            <a data-dish="${elem[0].dish.name}" "href="#single-product">
              <img src="./Recursos/platos/${elem[0].dish.image}" alt="Imagen de un plato de ${elem[0].dish.name}" />
              <figcaption class="dish__name">
                <h1>${elem[0].dish.name}</h1>
              </figcaption>
            </a> 
          </figure>
          </div>`
      );
    }
  }

  showInfoDish(dish) {
    console.log("Valor de dish:", dish);
    const info = document.createElement("div");
    info.id = "info-dish";
    const h3 = document.createElement("h3");
    h3.innerText = dish.name;
    info.append(h3);
    const p = document.createElement("p");
    p.innerText =
      "Nombre: " +
      dish.name +
      " Descripción: " +
      dish.description +
      " Ingredientes: ";
    dish.ingredients.forEach((ing) => {
      p.innerText += ing + " ";
    });
    p.innerText += "Categoría: ";

    for (const c of dish.categories.keys()) {
      p.innerText += c + " ";
    }
    p.innerText += "Alérgenos: ";
    for (const a of dish.allergens.values()) {
      p.innerText += a.name + " ";
    }
    info.append(p);
    if (document.getElementById("info-dish")) {
      document.getElementById("info-dish").replaceWith(info);
    } else {
      this.main.append(info);
    }
  }

  bindInit(handler) {
    // INICIO
    document.getElementById("init").addEventListener("click", (event) => {
      handler();
    });
    // LOGO
    document.getElementById("logo").addEventListener("click", (event) => {
      handler();
    });

    // MIGA DE PAN INICIO
    document.getElementById("init-bread").addEventListener("click", (event) => {
      handler();
    });
  }

  bindDishRandom(handler) {
    const dishes = document.getElementById("dishes-random");
    const links = dishes.querySelectorAll("a");
    for (const link of links) {
      link.addEventListener("click", (event) => {
        handler(event.currentTarget.dataset.dish);
      });
    }
  }
}

export default RestaurantView;
