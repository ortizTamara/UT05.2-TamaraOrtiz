class RestaurantView {
  constructor() {
    //Accedemos a los contenedores y elementos
    this.main = document.getElementById("dishes");
    this.content = document.getElementById("content");
    this.categories = document.getElementById("categories");
    this.dropCat = document.getElementById("navbarDropdownCategorias");
    this.dropMen = document.getElementById("navbarDropdownMenus");
    this.dropAller = document.getElementById("navbarDropdownAlergenos");
    this.dropRest = document.getElementById("dropdownRestaurantes");
  }

  // INICIALIZA LA INTERFAZ
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

  // MUESTRA LOS PLATOS ALEATORIOS
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

  // MUESTRA INFORMACIÓN DETALLADA DE LOS PLATOS
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

    const pCategory = document.createElement("p");
    pCategory.innerText += "Categoría: ";
    for (const category of categories) {
      pCategory.innerText += `${category.name} `;
    }

    const pAllergen = document.createElement("p");
    pAllergen.innerText += "Alérgenos: ";
    dishElement.allergens.forEach((allergen) => {
      pAllergen.innerText += `${allergen.name} `;
    });

    info.append(pNombre, pDescription, pIngredient, pCategory, pAllergen);

    if (document.getElementById("info-dish")) {
      document.getElementById("info-dish").replaceWith(info);
    } else {
      this.main.append(info);
    }
  }

  // MUESTRA LAS CATEGORÍAS EN LA INTERFAZ E INCLUYE MIGAS DE PAN
  showCategories() {
    this.content.replaceChildren();
    this.content.insertAdjacentHTML(
      "afterbegin",
      `<ul class="breadcrumbs" id="breadcrumbs"> 
                <li class="breadcrumbs-item"><a id="init-bread" href="#"> Inicio </a></li>
                <li class="breadcrumbs-item"><a id="init-bread" href="#"> Categorías </a></li>
             </ul>
             </div>
             <div id="content__title" class="content__title"><h1>CATEGORÍAS</h1></div>

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

  // MUESTRA LOS PLATOS DE UNA CATEGORÍA ESPECÍFICA
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

  // MUESTRA LOS MENUS
  ShowMenus() {
    this.categories.replaceChildren();
    this.content.replaceChildren();
    this.content.insertAdjacentHTML(
      "afterbegin",
      `<ul id="breadcrumbs" class="breadcrumbs"> 
          <li class="breadcrumbs-item"><a id="init-bread" href="#"> Inicio </a></li>
          <li class="breadcrumbs-item"><a id="init-bread" href="#"> Menú </a></li>
       </ul>
       </div>
       <div id="content__title" class="content__title"><h1>MENÚ</h1></div>
        `
    );

    this.main.replaceChildren();

    this.categories.replaceChildren();
    const contentCategories = document.createElement("div");
    contentCategories.id = "list-menu";

    contentCategories.insertAdjacentHTML(
      "afterbegin",
      `
          <div class="menu">
            <a data-menu="Entrantes" href="#menus"><h1>Día</h1>
          </div>
          <div class="menu">
            <a data-menu="Platos Principales" href="#menus"><h1>Parejas</h1>
          </div>
          <div class="menu">
            <a data-menu="Postres" href="#menus"><h1>Infantil</h1>
          </div>
          `
    );
    this.categories.append(contentCategories);
  }

  // MUESTRA LOS PLATOS DE UN MENÚ ESPECÍFICO
  showMenuDishes(dishes, men) {
    const bread = document.getElementById("breadcrumbs");

    const li = document.createElement("li");
    li.id = "menu-bread";
    li.innerText = men;

    const elem = document.getElementById("menu-bread");
    elem ? elem.replaceWith(li) : bread.append(li);

    const title = document.getElementById("content__title");
    const newtitle = document.createElement("div");
    newtitle.id = "cat-title";
    newtitle.classList.add("title-men");
    const h1 = document.createElement("h2");
    h1.innerText = men;
    newtitle.append(h1);
    newtitle.style.textAlign = "center";

    // document.getElementById("cate-title");
    // ? title.lastChild.replaceWith(newtitle)
    // : title.append(newtitle);

    this.main.replaceChildren();
    this.main.id = "dishes-menu";

    for (const dish of dishes) {
      const contentDishes = document.createElement("div");
      contentDishes.classList = "men-dish";
      contentDishes.insertAdjacentHTML(
        "beforeend",
        `<figure class="dish-image">
          <a data-dish="${dish.name}" href="#menus" >
            <img src="./Recursos/platos/${dish.image}" />
            <figcaption class="dish__name">
              <h1>${dish.name}<h1>
            </figcaption>
          </a> 
        </figure>`
      );
      this.main.append(contentDishes);
    }
  }

  // MUESTRA LOS ALERGENOS
  ShowAllergen() {
    this.categories.replaceChildren();
    this.content.replaceChildren();
    this.content.insertAdjacentHTML(
      "afterbegin",
      `<ul id="breadcrumbs" class="breadcrumbs"> 
            <li class="breadcrumbs-item"><a id="init-bread" href="#"> Inicio </a></li>
            <li class="breadcrumbs-item"><a id="init-bread" href="#"> Alérgenos </a></li>
         </ul>
         </div>
         <div id="content__title" class="content__title"><h1>ALERGENOS</h1></div>
          `
    );

    this.main.replaceChildren();

    this.categories.replaceChildren();
    const contentCategories = document.createElement("div");
    contentCategories.id = "list-allergen";

    contentCategories.insertAdjacentHTML(
      "afterbegin",
      `
            <div class="allergen">
              <a data-allergen="Entrantes" href="#allergens"><h1>Gluten</h1>
            </div>
            <div class="allergen">
              <a data-allergen="Platos Principales" href="#allergens"><h1>Lactosa</h1>
            </div>
            <div class="allergen">
              <a data-allergen="Postres" href="#allergens"><h1>Frutos Secos</h1>
            </div>
            <div class="allergen">
            <a data-allergen="Postres" href="#allergens"><h1>Soja</h1>
          </div>
            `
    );
    this.categories.append(contentCategories);
  }

  // MUESTRA LOS RESTAURANTES
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

  // MANEJA CLICS EN PLATOS ALEATORIOS
  bindDishRandom(handler) {
    const dishes = document.getElementById("dishes-random");
    const links = dishes.querySelectorAll("a");
    for (const link of links) {
      link.addEventListener("click", (event) => {
        handler(event.currentTarget.dataset.dish);
      });
    }
  }

  // MANEJA CLICS EN CATEGORÍAS
  bindCategoryClicks(handler) {
    const cats = document.getElementById("list-categories");
    const links = cats.querySelectorAll("a");
    for (const link of links) {
      link.addEventListener("click", (event) => {
        handler(event.currentTarget.dataset.category);
      });
    }
  }

  // MANEJA CLICS EN PLATOS DE CATEGORÍAS
  bindDishInCategory(handler) {
    const dishes = document.getElementById("dishes-category");
    const links = dishes.querySelectorAll("a");
    for (const link of links) {
      link.addEventListener("click", (event) => {
        handler(event.currentTarget.dataset.dish);
      });
    }
  }

  // AL HACER CLIC EN UN MENU SE EJECUTA LA FUNCIÓN ESPECIFICA
  bindMenuClicks(handler) {
    const menu = document.getElementById("list-menus");
    const links = menu.querySelectorAll("a");
    for (const link of links) {
      link.addEventListener("click", (event) => {
        handler(event.currentTarget.dataset.menu);
      });
    }
  }

  // AL HACER CLIC EN UN MENU SE EJECUTA LA FUNCIÓN ESPECIFICA
  bindAllergenClicks(handler) {
    const allergen = document.getElementById("list-allergens");
    const links = allergen.querySelectorAll("a");
    for (const link of links) {
      link.addEventListener("click", (event) => {
        handler(event.currentTarget.dataset.allergen);
      });
    }
  }

  // MANEJA CLICS EN MENÚ DESPLEGABLE DE CATEGORÍAS
  // bindCategoryDrop(handler) {
  //   const links = this.dropCat.querySelectorAll("a");
  //   for (const link of links) {
  //     link.addEventListener("click", (event) => {
  //       handler(event.currentTarget.dataset.category);
  //     });
  //   }
  // }

  // MANEJA CLICS EN MENÚ DESPLEGABLE DE RESTAURANTES
  // bindDropRestaurantClicks(handler) {
  //   const links = this.dropRest.querySelectorAll("a");
  //   for (const link of links) {
  //     link.addEventListener("click", (event) => {
  //       handler(event.currentTarget.dataset.restaurant);
  //     });
  //   }
  // }

  // MANEJA CLICS EN MENÚ  DE CATEGORÍA
  bindNavCategoryClick(handler) {
    document
      .getElementById("navbarDropdownCategorias")
      .addEventListener("click", (event) => {
        handler();
      });
  }

  // MANEJA CLICS EN MENÚ DE MENU
  bindNavMenuClick(handler) {
    document
      .getElementById("navbarDropdownMenus")
      .addEventListener("click", (event) => {
        handler();
      });
  }

  // MANEJA CLICS EN MENÚ DE ALERGENO
  bindNavAllergenClick(handler) {
    document
      .getElementById("navbarDropdownAlergenos")
      .addEventListener("click", (event) => {
        handler();
      });
  }

  // MANEJA CLICS EN MENÚ DESPEGABLE DE RESTAURANTES
  bindNavRestaurantClick(handler) {
    document
      .getElementById("navbarDropdownRestaurantes")
      .addEventListener("click", (event) => {
        handler();
      });
  }

  // MANEJA CLICS EN RESTAURANTES INDIVIDUALES
  bindSingleRestaurant(handler) {
    const rests = document.getElementById("list-rests");

    const links = rests.querySelectorAll("a");
    for (const link of links) {
      link.addEventListener("click", (event) => {
        handler(event.currentTarget.dataset.rest);
      });
    }
  }

  // MANEJA CLICS EN RESTAURANTES EN LA LISTA
  bindRestaurantClicks(handler) {
    const restau = document.getElementById("list-rests");
    const links = restau.querySelectorAll("a");
    for (const link of links) {
      link.addEventListener("click", (event) => {
        handler(event.currentTarget.dataset.rest);
      });
    }
  }

  // ASIGNA FUNCIOENS PARA MANEJAR EVENTOS DE INICIO
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

  // MANEJA EL EVENTO MOUSEENTER EN LAS CATEGORÍAS
  mouseenterCategories(handler) {
    this.dropCat.addEventListener("mouseenter", (event) => {
      handler();
    });
  }

  // MANEJA EL EVENTO MOUSEENTER EN LOS MENUS
  mouseenterMenus(handler) {
    this.dropMen.addEventListener("mouseenter", (event) => {
      handler();
    });
  }

  // MANEJA EL EVENTO MOUSEENTER EN LOS ALERGENOS
  mouseenterAllergens(handler) {
    this.dropAller.addEventListener("mouseenter", (event) => {
      handler();
    });
  }

  // MANEJA EL EVENTO MOUSEENTER EN LOS RESTAURANTES
  mouseenterRestaurant(handler) {
    this.dropRest.addEventListener("mouseenter", (event) => {
      handler();
    });
  }
}

export default RestaurantView;
