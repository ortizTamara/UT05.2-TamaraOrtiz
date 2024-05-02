class RestaurantView {
  constructor() {
    //Accedemos a los contenedores y elementos
    this.main = document.getElementById("dishes");
    this.content = document.getElementById("content");
    this.categories = document.getElementById("categories");
    this.dropCat = document.getElementById("navbarDropdownCategorias");
    this.dropMen = document.getElementById("navbarDropdownMenus");
    this.dropAller = document.getElementById("navbarDropdownAlergenos");
    this.navDropCat = document.getElementById("dropdownCategorias");
    this.dropRest = document.getElementById("dropdownRestaurantes");
  }

  // INICIALIZA LA INTERFAZ
  init() {
    // MIGAS DE PAN
    this.content.replaceChildren();

    this.createBreadcrumbNavigation(["Inicio"]);

    // INICIO -> CARGA CENTRAL CON CATEGORIAS
    this.categories.replaceChildren();
    const contentCategories = document.createElement("div");
    contentCategories.id = "list-categories";

    // TODO: MEJORA -> RECORRERLO CON UN FOR PARA PODER AÑADIR + CATEGORÍAS
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

  createBreadcrumbNavigation(crumbs) {
    this.content.replaceChildren();
    this.content.insertAdjacentHTML(
      "afterbegin",
      `
      <ul class="breadcrumbs" id="breadcrumbs"></ul>
      `
    );

    const breadcrumbsList = this.content.querySelector("#breadcrumbs");

    for (let crumb of crumbs) {
      breadcrumbsList.insertAdjacentHTML(
        "afterbegin",
        `
          <li class="breadcrumbs-item"><a id="init-bread" href="#"> ${crumb} </a></li>
        `
      );
    }

    this.content.insertAdjacentHTML(
      "beforeend",
      `
      </div>
      `
    );
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

  // MUESTRA LOS RESTAURANTES
  ShowInfoCategory(cat) {
    this.categories.replaceChildren();
    this.main.replaceChildren();
    this.content.replaceChildren();
    this.createBreadcrumbNavigation([cat, "Inicio"]);
    this.content.insertAdjacentHTML(
      "beforeend",
      `
      
     <div id="content__title" class="content__title"><h1>${cat}</h1></div>

      `
    );
  }

  // MUESTRA LOS PLATOS DE UNA CATEGORÍA ESPECÍFICA
  showCategoryDishes(dishes, cat) {
    this.ShowInfoCategory(cat);

    this.main.replaceChildren();
    this.categories.replaceChildren();
    this.main.id = "dishes-category";

    for (const dish of dishes) {
      const contentDishes = document.createElement("div");
      contentDishes.classList = "cat-dish";
      contentDishes.insertAdjacentHTML(
        "beforeend",
        `
        <figure class="dish-image">
          <a data-dish="${dish.name}" href="#categorias" >
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

  // MUESTRA LOS MENUS
  ShowMenus() {
    this.categories.replaceChildren();
    this.content.replaceChildren();
    this.createBreadcrumbNavigation(["Menú", "Inicio"]);

    this.content.insertAdjacentHTML(
      "beforeend",
      `
      
       <div id="content__title" class="content__title"><h1>MENÚ</h1></div>
        `
    );

    this.main.replaceChildren();

    this.categories.replaceChildren();
    const contentCategories = document.createElement("div");
    contentCategories.id = "list-menu";

    // TODO: MEJORA -> RECORRERLO CON UN FOR PARA PODER AÑADIR + MENÚS
    contentCategories.insertAdjacentHTML(
      "afterbegin",
      `
          <div class="menu">
            <a data-menu="Día" href="#menus" id="menu-dia" class="menu-link"><h1>Día</h1>
          </div>
          <div class="menu">
            <a data-menu="Parejas" href="#menus" id="menu-parejas" class="menu-link"><h1>Parejas</h1>
          </div>
          <div class="menu">
            <a data-menu="Infantil" href="#menus" id="menu-infantil" class="menu-link"><h1>Infantil</h1>
          </div>
          `
    );
    this.categories.append(contentCategories);

    // Seleccionamos todos los enlaces del menú
    const menuLinks = document.querySelectorAll(".menu-link");
    // Para cada enlace del menú
    menuLinks.forEach((link) => {
      //Agregamos un evento de clic a cada enlace del menú
      link.addEventListener("click", () => {
        // Iteramos sobre todos los enlaces del menú nuevamente para así limpiar la selección
        menuLinks.forEach((link) => {
          // Quitamos la clase selected de todos los enlaces del menú para deseleccionar
          link.classList.remove("selected");
        });

        // Subrayamos el enlace del menú seleccionado
        link.classList.add("selected");
      });
    });
  }

  // MUESTRA LOS PLATOS DE UN MENÚ ESPECÍFICO
  showMenuDishes(dishes, men) {
    this.createBreadcrumbNavigation([men, "Menús", "Inicio"]);

    const title = document.getElementById("content__title");

    const newtitle = document.createElement("div");
    newtitle.id = "men-title";
    newtitle.classList.add("title-men");
    const h2 = document.createElement("h2");
    h2.innerText = men;
    newtitle.append(h2);
    newtitle.style.textAlign = "center";

    // title.replaceChildren(newtitle);

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
    this.createBreadcrumbNavigation(["Alergenos", "Inicio"]);

    this.content.insertAdjacentHTML(
      "beforeend",
      `
         <div id="content__title" class="content__title"><h1>ALERGENOS</h1></div>

          `
    );

    this.main.replaceChildren();

    this.categories.replaceChildren();
    const contentCategories = document.createElement("div");
    contentCategories.id = "list-allergen";

    // TODO: MEJORA -> RECORRERLO CON UN FOR PARA PODER AÑADIR + ALERGENOS
    contentCategories.insertAdjacentHTML(
      "afterbegin",
      `
            <div class="allergen">
              <a data-allergen="Gluten" href="#allergens" class="allergen-link"><h1>Gluten</h1>
            </div>
            <div class="allergen">
              <a data-allergen="Lactosa" href="#allergens" class="allergen-link"><h1>Lactosa</h1>
            </div>
            <div class="allergen">
              <a data-allergen="Frutos Secos" href="#allergens" class="allergen-link"><h1>Frutos Secos</h1>
            </div>
            <div class="allergen">
            <a data-allergen="Soja" href="#allergens" class="allergen-link"><h1>Soja</h1>
          </div>
            `
    );
    this.categories.append(contentCategories);

    // Seleccionamos todos los enlaces del alergeno
    const allergenLinks = document.querySelectorAll(".allergen-link");
    // Para cada enlace del alergeno
    allergenLinks.forEach((link) => {
      //Agregamos un evento de clic a cada enlace del alergeno
      link.addEventListener("click", () => {
        // Iteramos sobre todos los enlaces del alergeno nuevamente para así limpiar la selección
        allergenLinks.forEach((link) => {
          // Quitamos la clase selected de todos los enlaces del alergeno para deseleccionar
          link.classList.remove("selected");
        });

        // Subrayamos el enlace del alergeno seleccionado
        link.classList.add("selected");
      });
    });
  }

  // MUESTRA LOS PLATOS DE UN ALERGENO ESPECÍFICA
  showAllergenDishes(dishes, aller) {
    this.createBreadcrumbNavigation([aller, "Alérgenos", "Inicio"]);

    const title = document.getElementById("content__title");
    const newtitle = document.createElement("div");
    newtitle.id = "aller-title";
    newtitle.classList.add("title-aller");
    const h1 = document.createElement("h2");
    h1.innerText = aller;
    newtitle.append(h1);
    newtitle.style.textAlign = "center";

    this.main.replaceChildren();
    this.main.id = "dishes-allergen";

    for (const dish of dishes) {
      const contentDishes = document.createElement("div");
      contentDishes.classList = "aller-dish";

      contentDishes.insertAdjacentHTML(
        "beforeend",
        `
        <figure class="dish-image">
            <a data-dish="${dish.dish.name}" href="#allergens" >
              <img src="./Recursos/platos/${dish.dish.image}" />
              <figcaption class="dish__name">
                <h1>${dish.dish.name}<h1>
              </figcaption>
            </a> 
          </figure>`
      );
      this.main.append(contentDishes);
    }
  }

  // MUESTRA LOS RESTAURANTES
  ShowInfoRestaurant(rest) {
    this.categories.replaceChildren();
    this.main.replaceChildren();
    this.content.replaceChildren();
    this.createBreadcrumbNavigation([
      rest.restaurant.name,
      "Restaurantes",
      "Inicio",
    ]);

    this.content.insertAdjacentHTML(
      "beforeend",
      `
     <div id="content__title" class="content__title"><h1>${rest.restaurant.name}</h1></div>

      `
    );

    const info = document.createElement("div");
    info.id = "info-restaurant";

    const pDescription = document.createElement("p");
    pDescription.innerText = `Descripción: ${rest.restaurant.description} `;

    const pLocation = document.createElement("p");
    pLocation.innerText = `Ubicación: ${rest.restaurant.location} `;

    info.append(pDescription, pLocation);

    if (document.getElementById("info-restaurant")) {
      document.getElementById("info-restaurant").replaceWith(info);
    } else {
      this.main.append(info);
    }
  }

  // MUESTRA EN CATEGORIA UN DESPEGABLE CON LOS NOMBRES DE CATEGORIAS
  DropdownCategory(categorys) {
    this.navDropCat.replaceChildren();
    this.navDropCat.style.zIndex = 10;
    for (const category of categorys) {
      this.navDropCat.insertAdjacentHTML(
        "beforeEnd",
        `<div class="dropcategory-item" ><a href="#category" data-category="${category.category.name}"> 
              <p>${category.category.name}<p>
              </a>
            </div>`
      );
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

  // MANEJA CLICS EN PLATOS DE MENÚ
  bindDishInMenu(handler) {
    const dishes = document.getElementById("dishes-menu");
    const links = dishes.querySelectorAll("a");
    for (const link of links) {
      link.addEventListener("click", (event) => {
        handler(event.currentTarget.dataset.dish);
      });
    }
  }

  // MANEJA CLICS EN PLATOS DE ALERGENOS
  bindDishInAllergen(handler) {
    const dishes = document.getElementById("dishes-allergen");
    const links = dishes.querySelectorAll("a");
    for (const link of links) {
      link.addEventListener("click", (event) => {
        handler(event.currentTarget.dataset.dish);
      });
    }
  }

  // AL HACER CLIC EN UN MENU SE EJECUTA LA FUNCIÓN ESPECIFICA
  bindMenuClicks(handler) {
    const menu = document.getElementById("list-menu");
    const links = menu.querySelectorAll("a");
    for (const link of links) {
      link.addEventListener("click", (event) => {
        handler(event.currentTarget.dataset.menu);
      });
    }
  }

  // AL HACER CLIC EN UN MENU SE EJECUTA LA FUNCIÓN ESPECIFICA
  bindAllergenClicks(handler) {
    const allergen = document.getElementById("list-allergen");
    const links = allergen.querySelectorAll("a");
    for (const link of links) {
      link.addEventListener("click", (event) => {
        handler(event.currentTarget.dataset.allergen);
      });
    }
  }

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

  // MANEJA CLICS EN RESTAURANTES EN LA LISTA
  bindCategoryDropClicks(handler) {
    const cat = document.getElementById("dropdownCategorias");
    const links = cat.querySelectorAll("a");
    for (const link of links) {
      link.addEventListener("click", (event) => {
        handler(event.currentTarget.dataset.category);
      });
    }
  }

  // MANEJA CLICS EN RESTAURANTES EN LA LISTA
  bindRestaurantClicks(handler) {
    const restau = document.getElementById("dropdownRestaurantes");
    const links = restau.querySelectorAll("a");
    for (const link of links) {
      link.addEventListener("click", (event) => {
        handler(event.currentTarget.dataset.restaurant);
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

  mouseenterCategories(handler) {
    this.dropCat.addEventListener("mouseenter", (event) => {});
  }

  // MANEJA EL EVENTO MOUSEENTER EN LOS MENUS
  mouseenterMenus(handler) {
    this.dropMen.addEventListener("mouseenter", (event) => {});
  }

  // MANEJA EL EVENTO MOUSEENTER EN LOS ALERGENOS
  mouseenterAllergens(handler) {
    this.dropAller.addEventListener("mouseenter", (event) => {});
  }

  // MANEJA EL EVENTO MOUSEENTER EN LOS RESTAURANTES
  mouseenterRestaurant(handler) {
    this.dropRest.addEventListener("mouseenter", (event) => {
      handler();
    });
  }
}

export default RestaurantView;
