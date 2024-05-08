const EXCECUTE_HANDLER = Symbol("excecuteHandler");
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

    // NUEVA VENTANA INFO
    this.dropcatWind = document.getElementsByClassName("dropcategory-item");

    this.cont = 0;
    this.openWindows = [];
    this.newWindow = null;
  }

  [EXCECUTE_HANDLER](
    handler,
    handlerArguments,
    scrollElement,
    data,
    url,
    event
  ) {
    handler(...handlerArguments);
    const scroll = document.querySelector(scrollElement);
    //console.log(scroll);
    if (scroll) scroll.scrollIntoView();
    //$(scrollElement).get(0).scrollIntoView();
    history.pushState(data, null, url);
    event.preventDefault();
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
  showRandomDishes(dishes) {
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
  showInfoDish(dishElement) {
    const info = document.createElement("div");
    info.id = "info-dish";

    const h3 = document.createElement("h3");
    h3.innerText = dishElement.dish.name;
    info.append(h3);

    // const pName = document.createElement("p");
    // pName.innerText = `Nombre: ${dishElement.dish.name} `;

    const pDescription = document.createElement("p");
    pDescription.innerText = `Descripción: ${dishElement.dish.description} `;

    // const pIngredient = document.createElement("p");
    // pIngredient.innerText = `Ingredientes: `;
    // dishElement.dish.ingredients.forEach((ingredient) => {
    //   pIngredient.innerText += `${ingredient} `;
    // });

    // const pCategory = document.createElement("p");
    // pCategory.innerText += "Categoría: ";
    // for (const category of categories) {
    //   pCategory.innerText += `${category.name} `;
    // }

    // const pAllergen = document.createElement("p");
    // pAllergen.innerText += "Alérgenos: ";
    // dishElement.allergens.forEach((allergen) => {
    //   pAllergen.innerText += `${allergen.name} `;
    // });

    // info.append(pNombre, pDescription, pIngredient, pCategory, pAllergen);
    info.append(pDescription);

    info.insertAdjacentHTML(
      "beforeend",
      `<div class="btn-container">
      <button class="btn-dish" id="openWindow" data-dish="${dishElement.dish.name}"> + Info </button>
       </div>`
    );
    if (document.getElementById("info-dish")) {
      document.getElementById("info-dish").replaceWith(info);
    } else {
      this.main.append(info);
    }
    // document.getElementById("openWindow").addEventListener("click", (event) => {
    //   handler(dishElement);
    // });
  }

  // createNewWindow(dish, categories) {
  //   this.bindElemNewWin(this.showDishInfoInNewWindow(dish, categories));
  // }

  // MUESTRA LOS RESTAURANTES
  showInfoCategory(cat) {
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
    this.showInfoCategory(cat);

    this.main.replaceChildren();
    this.categories.replaceChildren();
    this.main.id = "dishes-category";

    this.currentCategoryDishes = dishes;
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
  showMenus() {
    this.categories.replaceChildren();
    this.content.replaceChildren();
    this.createBreadcrumbNavigation(["Menú", "Inicio"]);

    this.content.insertAdjacentHTML(
      "beforeend",
      `
      
       <div id="content__title" class="content__title" href="#menu"><h1>MENÚ</h1></div>
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
            <a data-menu="Día" href="#menu" id="menu-dia" class="menu-link"><h1>Día</h1>
          </div>
          <div class="menu">
            <a data-menu="Parejas" href="#menu" id="menu-parejas" class="menu-link"><h1>Parejas</h1>
          </div>
          <div class="menu">
            <a data-menu="Infantil" href="#menu" id="menu-infantil" class="menu-link"><h1>Infantil</h1>
          </div>
          `
    );
    this.categories.append(contentCategories);

    // const menuLinks = document.querySelectorAll(".menu-link");
    // menuLinks.forEach((link) => {
    //   link.addEventListener("click", () => {
    //     menuLinks.forEach((link) => {
    //       link.classList.remove("selected");
    //     });

    //     link.classList.add("selected");
    //   });
    // });
  }

  // MUESTRA LOS PLATOS DE UN MENÚ ESPECÍFICO
  showMenuDishes(dishes, men) {
    this.createBreadcrumbNavigation([men, "Menús", "Inicio"]);

    const title = document.getElementById("categories");

    const newTitle = document.createElement("div");
    newTitle.id = "menu-title";
    newTitle.classList.add("title-menu");
    const h2 = document.createElement("h2");
    h2.innerText = men;
    newTitle.append(h2);
    newTitle.style.textAlign = "center";

    // Reemplazamos el título actual con el nuevo título del menú
    title.replaceChildren(newTitle);

    this.main.replaceChildren();
    this.main.id = "dishes-menu";

    for (const dish of dishes) {
      const contentDishes = document.createElement("div");
      contentDishes.classList = "men-dish";
      contentDishes.insertAdjacentHTML(
        "beforeend",
        `<figure class="dish-image">
          <a data-dish="${dish.name}" href="#" >
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
  showAllergen() {
    this.categories.replaceChildren();
    this.content.replaceChildren();
    this.createBreadcrumbNavigation(["Alergenos", "Inicio"]);

    this.content.insertAdjacentHTML(
      "beforeend",
      `
         <div id="content__title" class="content__title" href="#allergens"><h1>ALERGENOS</h1></div>

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

    // const allergenLinks = document.querySelectorAll(".allergen-link");
    // allergenLinks.forEach((link) => {
    //   link.addEventListener("click", () => {
    //     allergenLinks.forEach((link) => {
    //       link.classList.remove("selected");
    //     });

    //     link.classList.add("selected");
    //   });
    // });
  }

  // MUESTRA LOS PLATOS DE UN ALERGENO ESPECÍFICA
  showAllergenDishes(dishes, aller) {
    this.createBreadcrumbNavigation([aller, "Alérgenos", "Inicio"]);

    const title = document.getElementById("categories");

    const newTitle = document.createElement("div");
    newTitle.id = "aller-title";
    newTitle.classList.add("title-aller");
    const h2 = document.createElement("h2");
    h2.innerText = aller;
    newTitle.append(h2);
    newTitle.style.textAlign = "center";

    title.replaceChildren(newTitle);

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
  showInfoRestaurant(rest) {
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
     <div id="content__title" class="content__title" href="#"><h1>${rest.restaurant.name}</h1></div>

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

  showDishInfoInNewWindow(dishElement, categories) {
    // if (this.newWindow != null) {
    const main = this.newWindow.document.querySelector("main");

    main.replaceChildren();

    const info = document.createElement("div");
    info.id = "info-dish";

    const h3 = document.createElement("h3");
    h3.innerText = dishElement.dish.name;
    info.append(h3);

    const pName = document.createElement("p");
    pName.innerText = `Nombre: ${dishElement.dish.name} `;

    info.insertAdjacentHTML(
      "beforeend",
      `<figure class="newWindow-figure"><img src="./Recursos/platos/${dishElement.dish.image}" /></figure>`
    );

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
      pCategory.innerText += `${category.category.name} `;
    }

    const pAllergen = document.createElement("p");
    pAllergen.innerText += "Alérgenos: ";
    dishElement.allergens.forEach((allergen) => {
      pAllergen.innerText += `${allergen.name} `;
    });

    info.append(pName, pDescription, pIngredient, pCategory, pAllergen);

    main.append(info);
    // }
  }

  // MUESTRA EN CATEGORIA UN DESPEGABLE CON LOS NOMBRES DE CATEGORIAS
  dropdownCategory(categorys) {
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
  dropdownRestaurant(restaurants) {
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

  bindElemNewWin(handler) {
    const buttonOpenWindow = document.getElementById("openWindow");

    buttonOpenWindow.addEventListener("click", (event) => {
      let windowName = "window" + this.cont;
      this.cont++;

      this.newWindow = window.open(
        "windowInfo.html",
        windowName,
        "width=1400, height=900, top=250, left=250, titlebar=yes, toolbar=no, menubar=no, location=no" // Características de la ventana
      );

      this.openWindows.push(this.newWindow);

      this.newWindow.addEventListener("DOMContentLoaded", (event) => {
        // console.log(event.target.dataset);
        handler();

        this.newWindow.focus();
      });
    });
  }

  closeWindows() {
    this.openWindows.forEach((window) => {
      window.close();
    });
    this.openWindows = [];
  }

  bindCloseWindows() {
    const cerrarVentanasBtn = document.getElementById("navbarDropdownVentanas");
    cerrarVentanasBtn.addEventListener("click", () => {
      this.closeWindows();
    });
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
      link.addEventListener("click", function (event) {
        const args = event.currentTarget.dataset.dish;

        event.preventDefault();

        const clickedDish = event.currentTarget.closest(".dish-image");
        if (!clickedDish) return; // Salir si no se encuentra ningún plato

        const allDishes = dishes.querySelectorAll(".dish-image");

        // Si el plato clicado ya está seleccionado, mostrar todos los platos ocultos y salir de la función
        if (clickedDish.classList.contains("selected-dish")) {
          allDishes.forEach((dish) => {
            dish.style.display = "block";
            dish.classList.remove("selected-dish");
          });
          return;
        }

        // Ocultar todos los platos excepto el seleccionado
        allDishes.forEach((dish) => {
          if (dish !== clickedDish) {
            dish.style.display = "none";
          }
        });

        // Mostrar el plato seleccionado en el centro
        clickedDish.style.display = "block";
        clickedDish.classList.add("selected-dish");

        handler(args);
      });
    }
  }

  // MANEJA CLICS EN PLATOS DE MENÚ
  bindDishInMenu(handler) {
    const dishes = document.getElementById("dishes-menu");
    const links = dishes.querySelectorAll("a");
    for (const link of links) {
      link.addEventListener("click", (event) => {
        event.preventDefault();

        const clickedDish = event.currentTarget.closest(".dish-image");
        if (!clickedDish) return; // Salir si no se encuentra ningún plato

        const allDishes = dishes.querySelectorAll(".dish-image");

        // Si el plato clicado ya está seleccionado, mostrar todos los platos ocultos y salir de la función
        if (clickedDish.classList.contains("selected-dish")) {
          allDishes.forEach((dish) => {
            dish.style.display = "block";
            dish.classList.remove("selected-dish");
          });
          return;
        }

        // Ocultar todos los platos excepto el seleccionado
        allDishes.forEach((dish) => {
          if (dish !== clickedDish) {
            dish.style.display = "none";
          }
        });

        // Mostrar el plato seleccionado en el centro
        clickedDish.style.display = "block";
        clickedDish.classList.add("selected-dish");
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
        event.preventDefault();

        const clickedDish = event.currentTarget.closest(".dish-image");
        if (!clickedDish) return; // Salir si no se encuentra ningún plato

        const allDishes = dishes.querySelectorAll(".dish-image");

        // Si el plato clicado ya está seleccionado, mostrar todos los platos ocultos y salir de la función
        if (clickedDish.classList.contains("selected-dish")) {
          allDishes.forEach((dish) => {
            dish.style.display = "block";
            dish.classList.remove("selected-dish");
          });
          return;
        }

        // Ocultar todos los platos excepto el seleccionado
        allDishes.forEach((dish) => {
          if (dish !== clickedDish) {
            dish.style.display = "none";
          }
        });

        // Mostrar el plato seleccionado en el centro
        clickedDish.style.display = "block";
        clickedDish.classList.add("selected-dish");
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
        const args = event.currentTarget.dataset.menu;
        this[EXCECUTE_HANDLER](
          handler,
          [args],
          "div",
          { action: "showMenu", args },
          "#menu",
          event
        );
        handler(args);
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

  // MANEJA CLICS EN MENÚ DE NAVEGACIÓN
  bindNavMenuClick(handler) {
    document
      .getElementById("navbarDropdownMenus")
      .addEventListener("click", (event) => {
        const args = event.currentTarget.dataset.menu;
        this[EXCECUTE_HANDLER](
          handler,
          [],
          "nav",
          { action: "ShowSingleMenu" },
          "#menu",
          event
        );
        handler(args);
      });
  }

  // MANEJA CLICS EN MENÚ DE ALERGENO
  bindNavAllergenClick(handler) {
    document
      .getElementById("navbarDropdownAlergenos")
      .addEventListener("click", (event) => {
        const args = event.currentTarget.dataset.allergen;

        this[EXCECUTE_HANDLER](
          handler,
          [],
          "nav",
          { action: "ShowSingleAllergen" },
          "#allergens",
          event
        );
        handler(args);
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

  // MANEJA CLICS EN CATEGORIA EN LA LISTA
  bindCategoryDropClicks(handler) {
    const cat = document.getElementById("dropdownCategorias");
    const links = cat.querySelectorAll("a");
    for (const link of links) {
      link.addEventListener("click", (event) => {
        const args = event.currentTarget.dataset.category;
        this[EXCECUTE_HANDLER](
          handler,
          [args],
          "nav",
          { action: "ShowCategory", args },
          "#",
          event
        );

        handler(args);
      });
    }
  }

  // MANEJA CLICS EN RESTAURANTES EN LA LISTA
  bindRestaurantClicks(handler) {
    const restau = document.getElementById("dropdownRestaurantes");
    const links = restau.querySelectorAll("a");
    for (const link of links) {
      link.addEventListener("click", (event) => {
        const args = event.currentTarget.dataset.restaurant;
        this[EXCECUTE_HANDLER](
          handler,
          [args],
          "nav",
          { action: "showRestaurant", args },
          "#restaurante",
          event
        );
        handler(args);
      });
    }
  }

  // ASIGNA FUNCIOENS PARA MANEJAR EVENTOS DE INICIO
  bindInit(handler) {
    document.getElementById("init").addEventListener("click", (event) => {
      this[EXCECUTE_HANDLER](
        handler,
        [],
        "body",
        { action: "init" },
        "#",
        event
      );
    });
    document.getElementById("logo").addEventListener("click", (event) => {
      this[EXCECUTE_HANDLER](
        handler,
        [],
        "body",
        { action: "init" },
        "#",
        event
      );
    });
    document.getElementById("content").addEventListener("click", (event) => {
      this[EXCECUTE_HANDLER](
        handler,
        [],
        "body",
        { action: "init" },
        "#",
        event
      );
    });
  }

  mouseenterCategories() {
    this.dropCat.addEventListener("mouseenter", (event) => {
      // handler();
    });
  }

  // MANEJA EL EVENTO MOUSEENTER EN LOS MENUS
  mouseenterMenus() {
    this.dropMen.addEventListener("mouseenter", (event) => {
      // handler();
    });
  }

  // MANEJA EL EVENTO MOUSEENTER EN LOS ALERGENOS
  mouseenterAllergens() {
    this.dropAller.addEventListener("mouseenter", (event) => {
      // handler();
    });
  }

  // MANEJA EL EVENTO MOUSEENTER EN LOS RESTAURANTES
  mouseenterRestaurant() {
    this.dropRest.addEventListener("mouseenter", (event) => {
      // handler();
    });
  }
}

export default RestaurantView;
