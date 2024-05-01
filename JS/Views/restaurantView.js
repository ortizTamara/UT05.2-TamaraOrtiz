class RestaurantView {
  constructor() {
    //Accedemos a los contenedores y elementos
    this.main = document.getElementById("dishes");
    this.content = document.getElementById("content");
    this.categories = document.getElementById("categories");
    this.dropCat = document.getElementById("navbarDropdownCategorias");
    this.dropRest = document.getElementById("dropdownRestaurantes");
  }
  init() {
    // MIGAS DE PAN
    this.content.replaceChildren();
    this.content.insertAdjacentHTML(
      "afterbegin",
      `<ul class="breadcrumbs" id="breadcrumbs"> 
              <li class="breadcrumbs-item"><a id="init-bread" href="#"> Inicio </a></li>
           </ul>
           </div>
            `
    );

    // INICIO -> CARGA CENTRAL CON CATEGORIAS
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

  // PLATOS RANDOM
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

  // INFO DE LOS PLATOS
  showInfoDish(dishElement, categories) {
    const info = document.createElement("div");
    info.id = "info-dish";

    const h3 = document.createElement("h3");
    h3.innerText = dishElement.dish.name;
    info.append(h3);

    const pNombre = document.createElement("p");
    pNombre.innerText = `Nombre: ${dishElement.dish.name} `;

    const pDescription = document.createElement("p");
    pDescription.innerText = `Descripción: ${dishElement.dish.description} `;

    const pIngredient = document.createElement("p");
    pIngredient.innerText = `Ingredientes: `;

    dishElement.dish.ingredients.forEach((ingredient) => {
      pIngredient.innerText += `${ingredient} `;
    });

    // const pCategory = document.createElement("p");
    // pCategory.innerText += "Categoría: ";
    // pCategory.innerText += `${categories.category.name} `;

    const pAllergen = document.createElement("p");
    pAllergen.innerText += "Alérgenos: ";
    dishElement.allergens.forEach((allergen) => {
      pAllergen.innerText += `${allergen.name} `;
    });

    info.append(pNombre, pDescription, pIngredient, pAllergen);
    // info.append(pNombre, pDescription, pIngredient, pCategory, pAllergen);

    if (document.getElementById("info-dish")) {
      document.getElementById("info-dish").replaceWith(info);
    } else {
      this.main.append(info);
    }
  }

  // MUESTRA EN RESTAURANTE UN DESPEGABLE CON LOS NOMBRES DE RESTAURANTE
  DropdownRestaurant(restaurants) {
    this.dropRest.replaceChildren();
    this.dropRest.style.zIndex = 10;
    for (const restaurant of restaurants) {
      this.dropRest.insertAdjacentHTML(
        "beforeEnd",
        `<div class="droprestaurant-item" ><a href="#restaurante" data-restaurant="${restaurant.restaurant.name}"> 
            <p>${restaurant.restaurant.name}<p>
            </a>
          </div>`
      );
    }
  }
  //MUESTRA LAS CATEGORÍAS EN LA INTERFAZ E INCLUYE MIGAS DE PAN
  showCategories() {
    this.content.replaceChildren();
    this.content.insertAdjacentHTML(
      "afterbegin",
      `<ul class="breadcrumbs" id="breadcrumbs"> 
              <li class="breadcrumbs-item"><a id="init-bread" href="#"> Inicio </a></li>
              <li class="breadcrumbs-item"><a id="init-bread" href="#"> Categorías </a></li>
           </ul>
           </div>
            `
    );

    this.main.replaceChildren();

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

  // ACTUALIZAMOS MIGAS DE PAN Y TITULO DEPENDIENDO DE QUE CATEGORÍA ESTAMOS ADEMÁS DE MOSTRAR LOS PLATOS DE DICHA CATEGORÍA
  showCategoryDishes(dishes, cat) {
    const bread = document.getElementById("breadcrumbs");

    const li = document.createElement("li");
    li.id = "category-bread";
    li.innerText = cat;

    const elem = document.getElementById("category-bread");
    elem ? elem.replaceWith(li) : bread.append(li);

    const title = document.getElementById("content__title");
    const newtitle = document.createElement("div");
    newtitle.id = "cat-title";
    newtitle.classList.add("title-cat");
    const h1 = document.createElement("h2");
    h1.innerText = cat;
    newtitle.append(h1);
    newtitle.style.textAlign = "center";

    // document.getElementById("cate-title");
    // ? title.lastChild.replaceWith(newtitle)
    // : title.append(newtitle);

    this.main.replaceChildren();
    this.main.id = "dishes-category";

    for (const dish of dishes) {
      const contentDishes = document.createElement("div");
      contentDishes.classList = "cat-dish";
      contentDishes.insertAdjacentHTML(
        "beforeend",
        `<figure class="dish-image">
          <a data-dish="${dish.name}" href="#categorias" >
            <img src="./Recursos/platos/${dish.image}" />
            <figcaption class="dish__name">
              <h1>${dish.name}<h1>
            </figcaption>
          </a> 
        </figure>`
        // DEBAJO DE ESTO PONER EL NOMBRE DE LA CATEGORÍA EN EL QUE ESTAMOS
      );
      this.main.append(contentDishes);
    }
  }

  // MUESTRA LOS RESTAURANTES Y LA MIGA DE PAN
  ShowRestaurants() {
    this.categories.replaceChildren();
    this.content.replaceChildren();
    this.content.insertAdjacentHTML(
      "afterbegin",
      `<ul class="breadcrumbs" id="breadcrumbs"> 
        <li class="breadcrumbs-item"><a id="init-bread" href="#"> Inicio </a></li>
        <li class="breadcrumbs-item"><a id="init-bread" href="#"> Restaurantes </a></li>
     </ul>
     </div>
      `
    );

    this.main.replaceChildren();

    const contentRest = document.createElement("div");
    contentRest.id = "list-rests";
    for (const restau of restaurants) {
      contentRest.insertAdjacentHTML(
        "afterbegin",
        `
      <div class="restaurant">
        <a data-restaurant="rest-Ciu" href="#restaurante"><h1>Ciudad Real</h1>
      </div>
      <div class="restaurant">
        <a data-restaurant="rest-madrid" href="#restaurante"><h1>Madrid</h1>
      </div>
      <div class="restaurant">
        <a data-restaurant="rest-valencia" href="#restaurante"><h1>Valencia</h1>
      </div>
      `
      );
    }
    this.main.append(contentRest);
  }

  // AL HACER CLIC EN UN PLATO, SE EJECUTA LA FUNCIÓN PARA MOSTRAR SU INFO
  bindDishRandom(handler) {
    const dishes = document.getElementById("dishes-random");
    const links = dishes.querySelectorAll("a");
    for (const link of links) {
      link.addEventListener("click", (event) => {
        handler(event.currentTarget.dataset.dish);
      });
    }
  }

  // AL HACER CLIC EN LA CATEGORÍA, SE EJECUTA LA FUNCIÓN ASOCIADA
  bindNavCategoryClick(handler) {
    document
      .getElementById("navbarDropdownCategorias")
      .addEventListener("click", (event) => {
        handler();
      });
  }

  // AL HACER CLIC EN UN PLATO DENTRO DE UNA CATEGORÍA SE EJECUTA LA FUNCIÓN ESPECIFICA
  bindDishInCategory(handler) {
    const dishes = document.getElementById("dishes-category");
    const links = dishes.querySelectorAll("a");
    for (const link of links) {
      link.addEventListener("click", (event) => {
        handler(event.currentTarget.dataset.dish);
      });
    }
  }

  // AL HACER CLIC EN UNA CATEGORÍA SE EJECUTA LA FUNCIÓN ESPECIFICA
  bindCategoryClicks(handler) {
    const cats = document.getElementById("list-categories");
    const links = cats.querySelectorAll("a");
    for (const link of links) {
      link.addEventListener("click", (event) => {
        handler(event.currentTarget.dataset.category);
      });
    }
  }

  bindSingleRestaurant(handler) {
    const rests = document.getElementById("list-rests");

    const links = rests.querySelectorAll("a");
    for (const link of links) {
      link.addEventListener("click", (event) => {
        handler(event.currentTarget.dataset.rest);
      });
    }
  }

  bindRestaurantDrop(handler) {
    const links = this.dropRest.querySelectorAll("a");
    for (const link of links) {
      link.addEventListener("click", (event) => {
        handler(event.currentTarget.dataset.restaurant);
      });
    }
  }

  // AL HACER CLIC EN UNA RESTAURANTE SE EJECUTA LA FUNCIÓN ESPECIFICA
  bindRestaurantClicks(handler) {
    const restau = document.getElementById("list-rests");
    const links = restau.querySelectorAll("a");
    for (const link of links) {
      link.addEventListener("click", (event) => {
        handler(event.currentTarget.dataset.rest);
      });
    }
  }

  // AL PASAR EL RATÓN POR ENCIMA DE CATEGORÍA, SE ACTIVA SU FUNCIÓN
  mouseenterCategories(handler) {
    this.dropCat.addEventListener("mouseenter", (event) => {
      handler();
    });
  }

  // AL HACER CLIC EN UNA DE LAS CATEGORÍAS DEL DESPEGABLE, SE MUESTRA INFORMACIÓN
  bindCategoryDrop(handler) {
    const links = this.dropCat.querySelectorAll("a");
    for (const link of links) {
      link.addEventListener("click", (event) => {
        handler(event.currentTarget.dataset.category);
      });
    }
  }

  // AL HACER CLIC EN UNA DE LOS RESTAURANTES DEL DESPEGABLE, SE MUESTRA INFORMACIÓN
  bindDropRestaurantClicks(handler) {
    const links = this.dropRest.querySelectorAll("a");
    for (const link of links) {
      link.addEventListener("click", (event) => {
        handler(event.currentTarget.dataset.restaurant);
      });
    }
  }

  // AL HACER CLIC EN EL RESTAURANTE, SE EJECUTA LA FUNCIÓN ASOACIADA
  bindNavRestaurantClick(handler) {
    document
      .getElementById("navbarDropdownRestaurantes")
      .addEventListener("click", (event) => {
        handler();
      });
  }

  // AL PASAR EL RATÓN POR ENCIMA DE CATEGORÍA, SE ACTIVA SU FUNCIÓN
  mouseenterRestaurant(handler) {
    this.dropRest.addEventListener("mouseenter", (event) => {
      handler();
    });
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
    document.getElementById("content").addEventListener("click", (event) => {
      handler();
    });
  }
}

export default RestaurantView;
