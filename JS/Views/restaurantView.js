import {
  createDishValidation,
  deleteDishValidation,
  dishMenuValidation,
  restaurantValidation,
  deleteCategoryValidation,
  createCategoryValidation,
  addDishCategoryValidation,
} from "../Utils/validation.js";
import { setCookie } from "../Utils/cookie.js";

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

  showCookiesMessage() {
    const toast = `<div class="fixed-top p-5 mt-5">
    <div id="cookies-message" class="toast fade show w-100 mw-100" role="alert" aria-live="assertive" aria-atomic="true">
        <div class="toast-header">
            <h4 class="me-auto">Aviso de uso de cookies</h4>
            <button type="button" class="btn-close" data-bs-dismiss="toast" aria-label="Close" id="btnDismissCookie"></button>
        </div>
        <div class="toast-body p-4 d-flex flex-column">
            <p>
                Este sitio web almacena datos en cookies para activar su
                funcionalidad, entre las que se encuentra
                datos analíticos y personalización. Para poder utilizar este
                sitio, estás automáticamente aceptando
                que
                utilizamos cookies.
            </p>
            <div class="ml-auto">
                <button type="button" class="btn btn-outline-danger mr-3 deny" id="btnDenyCookie" data-bs-dismiss="toast">
                    Denegar
                </button>
                <button type="button" class="btn btn-primary" id="btnAcceptCookie" data-bs-dismiss="toast">
                  Aceptar
                </button>
            </div>
        </div>
    </div>
</div>`;
    document.body.insertAdjacentHTML("afterbegin", toast);

    const cookiesMessage = document.getElementById("cookies-message");
    cookiesMessage.addEventListener("hidden.bs.toast", (event) => {
      event.currentTarget.parentElement.remove();
    });

    const btnAcceptCookie = document.getElementById("btnAcceptCookie");
    btnAcceptCookie.addEventListener("click", (event) => {
      setCookie("acceptedCookieMessage", "true", 1);
    });

    const denyCookieFunction = (event) => {
      this.main.replaceChildren();
      this.main.insertAdjacentHTML(
        "afterbegin",
        `<div class="container my-3"><div class="alert alert-warning" role="alert">
        <strong>Para utilizar esta web es necesario aceptar el uso de cookies. Debe recargar la página y aceptar las condicones para seguir navegando. Gracias.</strong>
      </div></div>`
      );
      document.getElementById("mainNavItems").remove();
      this.categories.remove();
      this.content.remove();
    };
    const btnDenyCookie = document.getElementById("btnDenyCookie");
    btnDenyCookie.addEventListener("click", denyCookieFunction);
    const btnDismissCookie = document.getElementById("btnDismissCookie");
    btnDismissCookie.addEventListener("click", denyCookieFunction);
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

    const pDescription = document.createElement("p");
    pDescription.innerText = `Descripción: ${dishElement.dish.description} `;

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
  }

  // MUESTRA LAS CATEGORÍAS
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
  }

  // MUESTRA LOS PLATOS DE UN MENÚ ESPECÍFICO
  showMenuDishes(dishes, men) {
    const menuLinks = document.querySelectorAll(".menu-link");
    menuLinks.forEach((link) => {
      link.classList.remove("selected");
    });

    const menuTitle = men == "Día" ? "dia" : men.toLowerCase();
    const menu = document.getElementById(`menu-${menuTitle}`);
    menu.classList.add("selected");

    this.createBreadcrumbNavigation([men, "Menús", "Inicio"]);

    // const title = document.getElementById("div");
    // const newTitle = document.createElement("div");
    // newTitle.id = "menu-title";
    // newTitle.classList.add("title-menu");
    // const h2 = document.createElement("h2");
    // h2.innerText = men;
    // newTitle.append(h2);
    // newTitle.style.textAlign = "center";
    // Reemplazamos el título actual con el nuevo título del menú
    // title.replaceChildren(newTitle);

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
              <a data-allergen="Gluten" href="#allergens" id="allergen-gluten" class="allergen-link"><h1>Gluten</h1>
            </div>
            <div class="allergen">
              <a data-allergen="Lactosa" href="#allergens" id="allergen-lactosa" class="allergen-link"><h1>Lactosa</h1>
            </div>
            <div class="allergen">
              <a data-allergen="Frutos Secos" href="#allergens" id="allergen-frutos-secos" class="allergen-link"><h1>Frutos Secos</h1>
            </div>
            <div class="allergen">
            <a data-allergen="Soja" href="#allergens" id="allergen-soja" class="allergen-link"><h1>Soja</h1>
          </div>
            `
    );
    this.categories.append(contentCategories);
  }

  // MUESTRA LOS PLATOS DE UN ALERGENO ESPECÍFICA
  showAllergenDishes(dishes, aller) {
    const allergenLinks = document.querySelectorAll(".allergen-link");
    allergenLinks.forEach((link) => {
      link.classList.remove("selected");
    });
    const allergenTitle =
      aller == "Frutos Secos" ? "frutos-secos" : aller.toLowerCase();
    const allergen = document.getElementById(`allergen-${allergenTitle}`);
    allergen.classList.add("selected");

    this.createBreadcrumbNavigation([aller, "Alérgenos", "Inicio"]);

    // const title = document.getElementById("div");
    // const newTitle = document.createElement("div");
    // newTitle.id = "aller-title";
    // newTitle.classList.add("title-aller");
    // const h2 = document.createElement("h2");
    // h2.innerText = aller;
    // newTitle.append(h2);
    // newTitle.style.textAlign = "center";
    // title.replaceChildren(newTitle);

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
  }

  showAdmin() {
    this.categories.replaceChildren();
    this.content.replaceChildren();
    this.createBreadcrumbNavigation(["Admin", "Inicio"]);

    this.main.replaceChildren();
    this.content.insertAdjacentHTML(
      "beforeend",
      `<div id="content__title" class="content__title">
          <h1>Administración</h1>
        </div>
        `
    );
  }

  showCreateDish(categories, allergens) {
    let html = `
      <div id="accordion">
        <div class="card">
          <div class="card-header title" id="headingOne">
            <h5 class="mb-0">
              <button class="btn btn-link custom-btn" data-toggle="collapse" data-target="#collapseOne" aria-expanded="true" aria-controls="collapseOne">
                CREAR NUEVO PLATO
              </button>
            </h5>
          </div>
          <div id="collapseOne" class="collapse" aria-labelledby="headingOne" data-parent="#accordion">
            <div class="card-body">
              <form action="" name="createDish">
                <fieldset>
                  <div class="form__name">
                    <label for="validationServer01" class="form-label">Nombre del Plato*</label><br />
                    <input
                      type="text"
                      name="dishName"
                      id="validationServer01"
                      class="form-control w-100"
                      placeholder="Escribe el nombre del plato"
                      pattern=".{3,25}"
                      required
                    />
                    <div id="validationServer01Feedback" class="invalid-feedback">
                      Introduzca un nombre válido
                    </div>
                    <div class="valid-feedback">
                      Nombre válido
                    </div>
                  </div>
                  <div class="form__desc">
                    <label for="validationServer02" class="form-label">Descripción del plato*</label><br />
                    <input
                      type="text"
                      name="dishDescription"
                      id="validationServer02"
                      class="form-control"
                      placeholder="Breve descripción"
                      pattern=".{5,200}"
                      required
                    />
                    <div id="validationServer02Feedback" class="invalid-feedback">
                      Introduzca una descripción
                    </div>
                    <div class="valid-feedback">
                      Descripción válida
                    </div>
                  </div>
                  <div class="form__categ">
                    <label for="validationServer03" class="form-label">Categoría</label>
                    <select name="dishCate" class="form-select" id="validationServer03" aria-describedby="validationServer03Feedback" required>
                      <option value="" ></option>`;

    for (const category of categories) {
      html += `<option value="${category.category.name}">${category.category.name}</option>`;
    }

    html += `</select>
                  <div id="validationServer03Feedback" class="invalid-feedback">
                    Por favor, seleccione una categoría.
                  </div>
                  <div class="valid-feedback"></div>
              </div>
              <div class="form__aller">
                <label for="validationServer04" class="form-label">Alérgenos</label>
                <select name="dishAllergen"  class="form-select" id="validationServer04" aria-describedby="validationServer04Feedback">
                  <option value="" ></option>`;

    for (const allergen of allergens) {
      html += `<option value="${allergen.name}">${allergen.name}</option>`;
    }

    html += `</select>
                  <div id="validationServer03Feedback" class="invalid-feedback">
                    Por favor, seleccione un alergeno.
                  </div>
                  <div class="valid-feedback"></div>
              </div>
              <div class="form-button" id="buttonDish">
                <button id="btn-CreateDish" type="submit" class="btn btn-primary">Crear Plato</button>
                <button class="btn btn-primary" type="reset">Resetear</button>
              </div>
            </fieldset>
          </form>
        </div>
      </div>
    </div>
  `;

    this.main.insertAdjacentHTML("afterbegin", html);
  }

  showDeleteDish(dishes) {
    let html = `
    <div class="card">
      <div class="card-header title" id="headingTwo">
        <h5 class="mb-0">
          <button class="btn btn-link collapsed custom-btn" data-toggle="collapse" data-target="#collapseTwo" aria-expanded="false" aria-controls="collapseTwo">
            ELIMINAR PLATO
          </button>
        </h5>
      </div>
      <div id="collapseTwo" class="collapse" aria-labelledby="headingTwo" data-parent="#accordion">
        <div class="card-body">
          <form action="" name="deleteDish">
            <fieldset>
              <div class="form__dishes">
                <label for="validationServer05" class="form-label">Selecciona el plato a eliminar</label>
                <br />
                <select name="dDish" id="validationServer05" class="form-select" aria-describedby="validationServer04Feedback" required>
                  <option value=""></option>`;

    for (const dish of dishes) {
      html += `<option data-dish="${dish.dish.name}" value="${dish.dish.name}">${dish.dish.name}</option>`;
    }

    html += `</select>
                  <div id="validationServer05Feedback" class="invalid-feedback">
                    Por favor, seleccione un Plato para eliminarlo
                  </div>
                  <div class="valid-feedback"></div>
                </div>
                <br>
                <div class="form-button" id="buttonDish">
                  <button id="btn-DeleteDish" type="submit" class="btn btn-danger">Eliminar Plato</button>
                </div>
              </fieldset>
            </form>
          </div>
        </div>
      </div>
    </div>
  `;
    this.main.querySelector("#accordion").insertAdjacentHTML("beforeend", html);
    // this.main.insertAdjacentHTML("beforeend", html);
  }

  showAdminDishMenu(menus, dishes) {
    let html = `
    <div class="card">
      <div class="card-header title" id="headingThree">
        <h5 class="mb-0">
          <button class="btn btn-link collapsed custom-btn" data-toggle="collapse" data-target="#collapseThree" aria-expanded="false" aria-controls="collapseThree">
            ASIGNACIÓN Y DESIGNACIÓN DE PLATO A MENÚ
          </button>
        </h5>
      </div>
      <div id="collapseThree" class="collapse" aria-labelledby="headingThree" data-parent="#accordion">
        <div class="card-body">
          <form action="" name="dishMenu">
            <fieldset>
              <div class="form__dishes">
                <label for="validationServer06" class="form-label">Selecciona una opción</label>
                <br />
                <select name="adOption" id="validationServer06" class="form-select" aria-describedby="validationServer04Feedback">
                  <option value="asignar" selected >Asignar Plato a Menú</option>
                  <option value="designar" >Desasignar Plato a Menú</option>
                  <div id="validationServer07Feedback" class="invalid-feedback">
                     Por favor, seleccione una Opción
                  </div>
                  <div class="valid-feedback"></div>
                </select>
              </div>
              <br>
              <div class="form__menus">
                <label class="form-label"> Selecciona un menú </label>
                <select name="adMenu" class="form-select" id="selMenu" aria-describedby="validationServer08Feedback" required >
                <option value=""  ></option>`;

    for (const menu of menus) {
      html += `<option data-menu="${menu.menu.name}" value="${menu.menu.name}">${menu.menu.name}</option>`;
    }

    html += `</select>
                  <div id="validationServer07Feedback" class="invalid-feedback">
                    Por favor, Seleccione un menú
                  </div>
                  <div class="valid-feedback"></div>
                </div>
                <br>
                <div class="form__dishes">
                <label class="form-label"> Selecciona un plato </label>
                <select name="adDish" class="form-select" id="selDish" aria-describedby="validationServer09Feedback" required>
                  <option value=""  ></option>`;

    for (const dish of dishes) {
      html += `<option data-dish="${dish.dish.name}" value="${dish.dish.name}">${dish.dish.name}</option>`;
    }

    html += `</select>
                  <div id="validationServer07Feedback" class="invalid-feedback">
                    Por favor, seleccione un plato
                  </div>
                  <div class="valid-feedback"></div>
                </div>
                <br>
                <div class="form-button" id="buttonDish">
                
                  <button id="btn-dishMenu" type="submit" class="btn btn-primary">Realizar Opción</button>
                </div>
            </fieldset>
          </form>
        </div>
      </div>
    </div>`;

    this.main.querySelector("#accordion").insertAdjacentHTML("beforeend", html);
  }

  showCreaDelCategory(categories) {
    let html = `
    <div class="card">
      <div class="card-header title" id="headingFour">
        <h5 class="mb-0">
          <button class="btn btn-link collapsed custom-btn" data-toggle="collapse" data-target="#collapseFour" aria-expanded="false" aria-controls="collapseFour">
            ADMINISTRACIÓN CATEGORÍAS
          </button>
        </h5>
      </div>
      <div id="collapseFour" class="collapse" aria-labelledby="headingThree" data-parent="#accordion">
        <div class="card-body">
          <form action="" name="cCategory">
            <fieldset>
              <div class="form__nameCat">
                <label for="validationServer08" class="form-label">Nombre de la Categoría*</label>
                <br />
                <input
                type="text"
                name="cCate"
                id="validationServer08"
                class="form-control w-100"
                placeholder="Escribe el nombre de la categoría"
                pattern=".{3,35}"
                required
                />
                <div id="validationServer08Feedback" class="invalid-feedback">
                  Introduzca un nombre válido
                </div>
                <div  class="valid-feedback">
                  Nombre válido
                </div>
              </div>
              <br>
              <div class="form-button" id="btnCreaCat">
                <button id="btn-dishMenu" type="submit" class="btn btn-primary">Crear Categoría</button>
              </div>
            </fieldset>
          </form>
          <br>
          <form action="" name="dCategory">
            <fieldset>
              <div class="form__category">
                <label class="form-label"> Selecciona una Categoría* </label>
                  <select name="dCate" class="form-select" id="selMenu" aria-describedby="validationServer09Feedback" required>
                  <option value=""  ></option>
         
      `;
    for (const category of categories) {
      html += `<option data-cate="${category.category.name}" value="${category.category.name}">${category.category.name}</option>`;
    }

    html += ` </select>
              <div id="validationServer09Feedback" class="invalid-feedback">
                Por favor, seleccione una Categoría
              </div>
              <div class="valid-feedback"></div>
              <br>
            </div>
            <div class="form-button" id="btndelCat">
              <button id="btnDCate" type="submit" class="btn btn-danger">Eliminar Categoría</button>
            </div>
          </fieldset>
        </form>
      </div>
    </div>
  </div>`;

    this.main.querySelector("#accordion").insertAdjacentHTML("beforeend", html);
  }

  showCreateRestaurant() {
    let html = `
  <div class="card">
    <div class="card-header title" id="headingFive">
      <h5 class="mb-0">
        <button class="btn btn-link collapsed custom-btn" data-toggle="collapse" data-target="#collapseFive" aria-expanded="false" aria-controls="collapseFive">
          CREAR RESTAURANTE
        </button>
      </h5>
    </div>
    <div id="collapseFive" class="collapse" aria-labelledby="headingFive" data-parent="#accordion">
    <div class="card-body">
    <form action="" name="cRestaurant">
      <div class="form__nameRest">
        <label for="validationServer10" class="form-label">Nombre del Restaurante*</label><br />
          <input
          type="text"
          name="restauName"
          class="form-control"
          id="validationServer10"
          placeholder="Escribe el nombre del Restaurante"
          pattern=".{3,35}"
          required
          />
          <div id="validationServer10Feedback" class="invalid-feedback">
          Introduzca un nombre válido
          </div>
          <div class="valid-feedback">
            Nombre válido
          </div>
        </div><br>
        <h5 class="title">COORDENADAS</h5><br>
        <div class="form__RLatitude">
          <label for="validationServer11" class="form-label"> Indique la latitud del Restaurante* </label><br />
            <input
              type="text"
              name="cooLat"
              class="form-control"
              id="validationServer11"
              placeholder="Escribe la latitud"
              pattern="^(-?[0-9]{1,2}(\\.\\d+)?|90(\\.0+)?)$"
              required
            />
            <div id="validationServer11Feedback" class="invalid-feedback">
              Introduzca una latitud válida
            </div>
            <div  class="valid-feedback">
              Latitud válida
            </div>
       </div><br>
       <div class="form__RLongitude">
          <label for="validationServer13" class="form-label"> Indique la longitud del Restaurante* </label><br />
            <input
              type="text"
              name="cooLong"
              class="form-control"
              id="validationServer13"
              placeholder="Escribe la longitud"
              pattern="^(-?[0-9]{1,3}(\\.\\d+)?|180(\\.0+)?)$"
              required
            />
            <div id="validationServer13Feedback" class="invalid-feedback">
              Introduzca una longitud válida
            </div>
            <div  class="valid-feedback">
              Longitud válida
            </div>
        </div><br>
        <div class="form-button" id="buttonRest">
          <button id="btnRest" type="submit" class="btn btn-primary">Crear Restaurante</button>
          <button class="btn btn-danger" type="reset">Resetear</button>
        </div>
      </form>
    </div>
  </div>
</div>`;

    this.main.querySelector("#accordion").insertAdjacentHTML("beforeend", html);
  }

  showUpdateCatDish() {
    let html = `
    <div class="card" id="updateCatDish">
      <div class="card-header title" id="headingSix">
        <h5 class="mb-0">
          <button class="btn btn-link collapsed custom-btn" data-toggle="collapse" data-target="#collapseSix" aria-expanded="false" aria-controls="collapseSix">
            MODIFICAR CATEGORÍAS DE UN PLATO
          </button>
        </h5>
      </div>
      <div id="collapseSix" class="collapse" aria-labelledby="headingSix" data-parent="#accordion">
        <div class="card-body">
          <form action="" name="catDish">
            <fieldset>
              <p>Selecciona una opción:*</p>
              <div class="form-check">
                <input class="form-check-input radioCatDish" type="radio" name="option" id="radioA" data-opt="radioA"/>
                <label class="form-check-label" for="radioA">Añadir plato a una categoría
                </label>
              </div>
              <div class="form-check">
                <input class="form-check-input radioCatDish" type="radio" name="option" id="radioD" data-opt="radioD"/>
                <label class="form-check-label" for="radioD">Eliminar plato de una categoría</label>
              </div>
            </fieldset>
          </form>
        </div>
      </div>
    </div>
  </div>`;

    this.main.querySelector("#accordion").insertAdjacentHTML("beforeend", html);
  }

  showDishSelection(dishes) {
    let html = `
    <div aria-labelledby="headingSix" data-parent="#updateCatDish" class="catDishSelection">
      <div class="card-body">
        <form action="" name="upDish">
        <div id="firstPart">
          <label class="form-label"> Selecciona un Plato* </label> 
          <select name="dishcat" class="form-select" id="selectDish" aria-describedby="validationServer14Feedback" required>
          <option value=""  ></option>`;

    for (const dish of dishes) {
      html += `<option data-dish="${dish.dish.name}" value="${dish.dish.name}">${dish.dish.name}</option>`;
    }

    html += `<div id="validationServer14Feedback" class="invalid-feedback">
                Por favor, seleccione un plato
               </div>
              <div  class="valid-feedback"></div>  
            </div>
          </form>
        </div>
      </div>`;

    this.main
      .querySelector("#updateCatDish")
      .insertAdjacentHTML("beforeend", html);
  }

  showAddCategorySelection(categories) {
    let html = `
    <div  aria-labelledby="headingSix" data-parent="#updateCatDish" class="catDishSelection">
      <div class="card-body">
        <form action="" name="upCat">
          <div id="secondPart">
          <label class="form-label"> Selecciona la Categoría que quieres añadir* </label> 
          <select name="catedish" class="form-select" id="selcatdish" aria-describedby="validationServer15Feedback" required>
            <option value=""  ></option>`;

    for (const category of categories) {
      html += `<option data-cate="${category.category.name}" value="${category.category.name}">${category.category.name}</option>`;
    }

    html += `<div id="validationServer15Feedback" class="invalid-feedback">
                Por favor, seleccione una categoría
              </div>
              <div  class="valid-feedback"></div>
            </select>
            <div class="form-button" id="btnAddCat">
              <button id="btnAddCatD" type="submit" class="btn btn-primary">Añadir</button>
            </div>
          </div>
          </form>
        </div>
      </div>`;

    this.main
      .querySelector("#updateCatDish")
      .insertAdjacentHTML("beforeend", html);
  }

  showDeleCategorySelection(categories) {
    let html = `
    <div  aria-labelledby="headingSix" data-parent="#updateCatDish" class="catDishSelection">
      <div class="card-body">
        <form action="" name="upCat">
          <div id="secondPart">
          <label class="form-label"> Selecciona la Categoría que quieres eliminar* </label> 
          <select name="catedish" class="form-select" id="selcatdish" aria-describedby="validationServer15Feedback" required>
            <option value=""  ></option>`;

    for (const category of categories) {
      html += `<option data-cate="${category.category.name}" value="${category.category.name}">${category.category.name}</option>`;
    }

    html += `<div id="validationServer15Feedback" class="invalid-feedback">
                Por favor, seleccione una categoría
              </div>
              <div  class="valid-feedback"></div>
            </select>
            <div class="form-button" id="btnDelCat">
              <button id="btnDelCatD" type="submit" class="btn btn-danger">Eliminar</button>
            </div>
          </div>
          </form>
        </div>
      </div>`;

    this.main
      .querySelector("#updateCatDish")
      .insertAdjacentHTML("beforeend", html);
  }

  showCreateDishModal(name, complete, error) {
    const messageContainer = document.getElementById("messageModal");
    const messageModal = new bootstrap.Modal(messageContainer);
    const title = document.getElementById("modal-title");
    title.innerHTML = "Nuevo Plato";
    const body = messageContainer.querySelector(".modal-body");
    body.replaceChildren();
    if (complete) {
      body.insertAdjacentHTML(
        "afterbegin",
        `<div class="p-3">El plato
    <strong>${name}</strong> ha sido creado correctamente.</div>`
      );
    } else {
      body.insertAdjacentHTML(
        "afterbegin",
        `<div class="error text-danger p-3"><i class="bi bi-exclamationtriangle"></i> El plato <strong>${name}</strong> ya está
    creado.<br>${error}</div>`
      );
    }
    messageModal.show();
    const listener = (event) => {
      if (complete) {
        document.createDish.reset();
      }
      document.createDish.dishName.focus();
    };
    messageContainer.addEventListener("hidden.bs.modal", listener, {
      once: true,
    });
  }

  showDeleteDishModal(dish, complete, error) {
    const messageContainer = document.getElementById("messageModal");
    const messageModal = new bootstrap.Modal(messageContainer);
    const title = document.getElementById("modal-title");
    title.innerHTML = "Plato eliminar";
    const body = messageContainer.querySelector(".modal-body");
    body.replaceChildren();
    if (complete) {
      body.insertAdjacentHTML(
        "afterbegin",
        `<div class="p-3">El plato
    <strong>${dish}</strong> ha sido eliminado correctamente.</div>`
      );
    } else {
      body.insertAdjacentHTML(
        "afterbegin",
        `<div class="error text-danger p-3"><i class="bi bi-exclamationtriangle"></i> El plato no se puede eliminar.<br>${error}</div>`
      );
    }
    messageModal.show();
    const listener = (event) => {
      document.deleteDish.dDish.focus();
    };
    messageContainer.addEventListener("hidden.bs.modal", listener, {
      once: true,
    });
  }

  showDishMenuModal(complete, error) {
    const messageContainer = document.getElementById("messageModal");
    const messageModal = new bootstrap.Modal(messageContainer);
    const title = document.getElementById("modal-title");
    title.innerHTML = "Asignación y designación de plato a menú";
    const body = messageContainer.querySelector(".modal-body");
    body.replaceChildren();

    if (complete) {
      body.insertAdjacentHTML(
        "afterbegin",
        `<div class="p-3">La acción se ha realizado correctamente.</div>`
      );
    } else {
      body.insertAdjacentHTML(
        "afterbegin",
        `<div class="error text-danger p-3"><i class="bi bi-exclamationtriangle"></i>La acción no se ha realizado<br>${error}</div>`
      );
    }
    messageModal.show();
    const listener = (event) => {
      document.dishMenu.focus();
    };
    messageContainer.addEventListener("hidden.bs.modal", listener, {
      once: true,
    });
  }

  showCreateCategoryModal(categ, complete, error) {
    const messageContainer = document.getElementById("messageModal");
    const messageModal = new bootstrap.Modal(messageContainer);
    const title = document.getElementById("modal-title");
    title.innerHTML = "Crear Categoría";
    const body = messageContainer.querySelector(".modal-body");
    body.replaceChildren();

    if (complete) {
      body.insertAdjacentHTML(
        "afterbegin",
        `<div class="p-3">La categoría
        <strong>${categ}</strong> ha sido creado correctamente.</div>`
      );
    } else {
      body.insertAdjacentHTML(
        "afterbegin",
        `<div class="error text-danger p-3"><i class="bi bi-exclamationtriangle"></i> La categoría <strong>${categ}</strong> 
          ya esta creada.<br>${error}</div>`
      );
    }
    messageModal.show();
    const listener = (event) => {
      if (done) {
        document.cCategory.reset();
      }
      document.cCategory.cCate.focus();
    };
    messageContainer.addEventListener("hidden.bs.modal", listener, {
      once: true,
    });
  }

  showDeleteCategoryModal(categ, complete, error) {
    const messageContainer = document.getElementById("messageModal");
    const messageModal = new bootstrap.Modal(messageContainer);
    const title = document.getElementById("modal-title");
    title.innerHTML = "Eliminar Categoría";
    const body = messageContainer.querySelector(".modal-body");
    body.replaceChildren();

    if (complete) {
      body.insertAdjacentHTML(
        "afterbegin",
        `<div class="p-3">La categoría
        <strong>${categ}</strong> ha sido eliminada correctamente.</div>`
      );
    } else {
      body.insertAdjacentHTML(
        "afterbegin",
        `<div class="error text-danger p-3"><i class="bi bi-exclamationtriangle"></i> La categoría <strong>${categ}</strong> 
          no se ha podido eliminar.<br>${error}</div>`
      );
    }
    messageModal.show();
    const listener = (event) => {
      if (done) {
        document.dCategory.reset();
      }
      document.dCategory.dCate.focus();
    };
    messageContainer.addEventListener("hidden.bs.modal", listener, {
      once: true,
    });
  }

  showRestaurantModal(name, complete, error) {
    const messageContainer = document.getElementById("messageModal");
    const messageModal = new bootstrap.Modal(messageContainer);
    const title = document.getElementById("modal-title");
    title.innerHTML = "Crear Restaurante";
    const body = messageContainer.querySelector(".modal-body");
    body.replaceChildren();

    if (complete) {
      body.insertAdjacentHTML(
        "afterbegin",
        `<div class="p-3">El restaurante
        <strong>${name}</strong> ha sido creado correctamente.</div>`
      );
    } else {
      body.insertAdjacentHTML(
        "afterbegin",
        `<div class="error text-danger p-3"><i class="bi bi-exclamationtriangle"></i> El restaurate <strong>${name}</strong> 
          no ha podido crearse.<br>${error}</div>`
      );
    }
    messageModal.show();
    const listener = (event) => {
      if (complete) {
        document.cRestaurant.reset();
      }
      document.cRestaurant.restauName.focus();
    };
    messageContainer.addEventListener("hidden.bs.modal", listener, {
      once: true,
    });
  }

  showAddCategoryDishModal(dishName, catName, complete, error) {
    const messageContainer = document.getElementById("messageModal");
    const messageModal = new bootstrap.Modal(messageContainer);
    const title = document.getElementById("modal-title");
    title.innerHTML = "Añadir Categoría a Plato";
    const body = messageContainer.querySelector(".modal-body");
    body.replaceChildren();

    if (complete) {
      body.insertAdjacentHTML(
        "afterbegin",
        `<div class="p-3">La categoría
        <strong>${catName}</strong> ha sido añadida correctamente al plato <strong>${dishName}</strong>.</div>`
      );
    } else {
      body.insertAdjacentHTML(
        "afterbegin",
        `<div class="error text-danger p-3"><i class="bi bi-exclamationtriangle"></i> La categoría <strong>${catName}</strong> 
          no se ha podido añadir al plato <strong>${dishName}</strong>.<br>${error}</div>`
      );
    }
    messageModal.show();
    const listener = (event) => {
      if (complete) {
        // document.getElementById("updateCatDish").focus();
        document.btnAddCat.focus();
      }
    };
    messageContainer.addEventListener("hidden.bs.modal", listener, {
      once: true,
    });

    /*
    messageModal.show();
    const listener = (event) => {
      document.dishMenu.focus();
    };
    messageContainer.addEventListener("hidden.bs.modal", listener, {
      once: true,
    });
    */
  }
  showDelCategoryDishModal(dishName, catName, complete, error) {
    const messageContainer = document.getElementById("messageModal");
    const messageModal = new bootstrap.Modal(messageContainer);
    const title = document.getElementById("modal-title");
    title.innerHTML = "Eliminar Categoría a Plato";
    const body = messageContainer.querySelector(".modal-body");
    body.replaceChildren();

    if (complete) {
      body.insertAdjacentHTML(
        "afterbegin",
        `<div class="p-3">La categoría
        <strong>${catName}</strong> ha sido eliminada correctamente al plato <strong>${dishName}</strong>.</div>`
      );
    } else {
      body.insertAdjacentHTML(
        "afterbegin",
        `<div class="error text-danger p-3"><i class="bi bi-exclamationtriangle"></i> La categoría <strong>${catName}</strong> 
          no se ha podido eliminar del plato <strong>${dishName}</strong>.<br>${error}</div>`
      );
    }
    messageModal.show();
    const listener = (event) => {
      if (complete) {
        // document.getElementById("updateCatDish").focus();
        document.btnDelCat.focus();
      }
    };
    messageContainer.addEventListener("hidden.bs.modal", listener, {
      once: true,
    });
  }
  showIdentificationLink() {
    const userArea = document.getElementById("userArea");
    userArea.replaceChildren();
    userArea.insertAdjacentHTML(
      "afterbegin",
      `<div class="nav-tiem dropdown">
			<a id="login" href="#" class="nav-link"><i class="bi bi-person-circle" aria-hidden="true"></i> Identificate</a>
		</div>`
    );
  }

  showLogin() {
    this.categories.replaceChildren();
    this.content.replaceChildren();
    this.main.replaceChildren();
    const login = `<div class="container h-100">
    <div class="d-flex justify-content-center h-100">
      <div class="user_card">
        <div class="d-flex justify-content-center form_container">
        <form name="fLogin" role="form" novalidate>
            <div class="input-group mb-3">
              <div class="input-group-append">
                <span class="input-group-text"><i class="bi bi-person-circle"></i></span>
              </div>
              <input type="text" name="username" class="form-control input_user" value="" placeholder="usuario">
            </div>
            <div class="input-group mb-2">
              <div class="input-group-append">
                <span class="input-group-text"><i class="bi bi-key-fill"></i></span>
              </div>
              <input type="password" name="password" class="form-control input_pass" value="" placeholder="contraseña">
            </div>
            <div class="form-group">
              <div class="custom-control custom-checkbox">
                <input name="remember" type="checkbox" class="custom-control-input" id="customControlInline">
                <label class="custom-control-label" for="customControlInline">Recuerdame</label>
              </div>
            </div>
              <div class="d-flex justify-content-center mt-3 login_container">
                <button class="btn login_btn" type="submit">Acceder</button>
          </div>
          </form>
        </div>
      </div>
    </div>
  </div>`;
    this.main.insertAdjacentHTML("afterbegin", login);
  }

  showAuthUserProfile(user) {
    const userArea = document.getElementById("userArea");
    userArea.replaceChildren();
    userArea.insertAdjacentHTML(
      "afterbegin",
      `<div class="user-profile d-flex align-items-center">
      <li class="account d-flex mx-2 flex-column" style="text-align: right">Bienvenid@,
          ${user.username} <a id="aCloseSession" href="#">Cerrar sesión</a>
      </li>
      <div class="imageLogin">
          <img src="./Recursos/Login.png" />
      </div>
  </div>`
    );
  }

  showAdminTools() {
    let adminTools = document.getElementById("adminNavItem");

    adminTools.style.visibility = "visible";
  }

  showInvalidUserMessage() {
    this.main.insertAdjacentHTML(
      "beforeend",
      `<div class="invalid-message"><div class="alert alert-warning" role="alert">
		<strong>El usuario y la contraseña no son válidos. Inténtelo nuevamente.</strong>
	</div></div>`
    );
    document.forms.fLogin.reset();
    document.forms.fLogin.username.focus();
  }

  // MUESTRA EN CATEGORIA UN DESPEGABLE CON LOS NOMBRES DE CATEGORIAS
  dropdownCategory(categorys) {
    this.navDropCat.replaceChildren();
    this.navDropCat.style.zIndex = 10;
    for (const category of categorys) {
      this.navDropCat.insertAdjacentHTML(
        "beforeend",
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
        "beforeend",
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
        const args = event.currentTarget.dataset.dish;
        this[EXCECUTE_HANDLER](
          handler,
          [args],
          "main",
          { action: "showDishes", args },
          "#single-product",
          event
        );
        handler(args);
      });
    }
  }

  // MANEJA CLICS EN CATEGORÍAS
  bindCategoryClicks(handler) {
    const cats = document.getElementById("list-categories");
    const links = cats.querySelectorAll("a");
    for (const link of links) {
      link.addEventListener("click", (event) => {
        const args = event.currentTarget.dataset.category;
        this[EXCECUTE_HANDLER](
          handler,
          [args],
          "div",
          { action: "showDishesFromCategory", args },
          "#single-product",
          event
        );
        handler(args);
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

        const state = { action: "showDishInCategory", args };
        history.pushState(state, null, args); // Esto agregará el estado al historial

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

        const state = { action: "showDishInCategory", args };
        history.pushState(state, null, args);

        handler(args);
      });
    }
  }

  // MANEJA CLICS EN PLATOS DE ALERGENOS
  bindDishInAllergen(handler) {
    const dishes = document.getElementById("dishes-allergen");
    const links = dishes.querySelectorAll("a");
    for (const link of links) {
      link.addEventListener("click", (event) => {
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

        const state = { action: "showDishInCategory", args };
        history.pushState(state, null, args);

        handler(args);
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
        const args = event.currentTarget.dataset.allergen;
        this[EXCECUTE_HANDLER](
          handler,
          [args],
          "div",
          { action: "showAllergen", args },
          "#allergens",
          event
        );
        handler(args);
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
        this[EXCECUTE_HANDLER](
          handler,
          [],
          "nav",
          { action: "ShowSingleMenu" },
          "#menu",
          event
        );
        handler();
      });
  }

  // MANEJA CLICS EN MENÚ DE ALERGENO
  bindNavAllergenClick(handler) {
    document
      .getElementById("navbarDropdownAlergenos")
      .addEventListener("click", (event) => {
        // const args = event.currentTarget.dataset.allergen;
        this[EXCECUTE_HANDLER](
          handler,
          [],
          "nav",
          { action: "ShowSingleAllergen" },
          "#allergens",
          event
        );
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

  bindNavAdminClick(handler) {
    document
      .getElementById("navbarDropdownAdmin")
      .addEventListener("click", (event) => {
        this[EXCECUTE_HANDLER](
          handler,
          [],
          "nav",
          { action: "showAdmin" },
          "#",
          event
        );
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

  bindCreateDish(handler) {
    createDishValidation(handler);
  }

  bindDeleteDish(handler) {
    deleteDishValidation(handler);
  }

  bindDishMenu(handler) {
    dishMenuValidation(handler);
  }

  bindCreateCategory(handler) {
    createCategoryValidation(handler);
  }

  bindDeleteCategory(handler) {
    deleteCategoryValidation(handler);
  }

  bindRestaurant(handler) {
    restaurantValidation(handler);
  }

  bindUpdateCatDish(handler) {
    let radios = document.getElementsByClassName("radioCatDish");
    for (const r of radios) {
      r.addEventListener("click", (event) => {
        const opt = event.currentTarget.dataset.opt;

        // this[EXCECUTE_HANDLER](
        //   handler,
        //   [opt],
        //   "document.fACD",
        //   { action: "showAdminFormCatDish", opt },
        //   "#",
        //   event
        // );
        handler(opt);
      });
    }
  }

  bindDishSelection(handler) {
    const firstSelect = document.getElementById("selectDish");
    addDishCategoryValidation(handler);

    // addDishValidation(handler);
    firstSelect.addEventListener("change", (event) => {
      const dish = firstSelect.value;

      // this[EXCECUTE_HANDLER](
      //   handler,
      //   [dish],
      //   "document.fACD",
      //   { action: "showCatDish", dish },
      //   "#",
      //   event
      // );
      handler(dish);
    });
  }

  bindAddCatDish(handler) {
    addDishCategoryValidation(handler);
    // AddDelCateValidation(handler);
    // const form = document.forms.fACD;
    // let button = document.getElementById("btnAddCatD");
    // let dish = "";
    // let cat = "";
    // button.addEventListener("click", function (event) {
    //   event.preventDefault();
    //   event.stopPropagation();
    // addDishCategoryValidation(handler);
    // });
  }

  bindDelCatDish(handler) {
    addDishCategoryValidation(handler);
  }

  bindIdentificationLink(handler) {
    const login = document.getElementById("login");
    login.addEventListener("click", (event) => {
      this[EXCECUTE_HANDLER](
        handler,
        [],
        "main",
        { action: "login" },
        "#",
        event
      );
    });
  }

  bindLogin(handler) {
    const form = document.forms.fLogin;
    form.addEventListener("submit", (event) => {
      handler(form.username.value, form.password.value, form.remember.checked);
      event.preventDefault();
    });
  }

  bindCloseSession(handler) {
    document
      .getElementById("aCloseSession")
      .addEventListener("click", (event) => {
        handler();
        event.preventDefault();
      });
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

  initHistory() {
    history.replaceState({ action: "init" }, null);
  }

  setUserCookie(user) {
    setCookie("activeUser", user.username, 1);
  }

  deleteUserCookie() {
    setCookie("activeUser", "", 0);
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
