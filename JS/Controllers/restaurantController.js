import Coordinate from "../Models/objectRestaurant.js";
import { getCookie } from "../Utils/cookie.js";

const MODEL = Symbol("RestaurantModel");
const VIEW = Symbol("RestaurantView");
const AUTH = Symbol("AUTH");
const USER = Symbol("USER");
const FAV = Symbol("FAV");

// const LOAD_MANAGER_OBJECTS = Symbol("Load Manager Objects");

class RestaurantController {
  constructor(model, view, auth) {
    this[MODEL] = model;
    this[VIEW] = view;
    this[AUTH] = auth;
    this[USER] = null;
    this[FAV] = [];

    // Eventos iniciales del Controlador
    this.onLoad();
    this.onInit();

    // Enlazamos handlers con la vista
    // this[VIEW].bindInit(this.handleInit);
    this[VIEW].bindInit(this.onInit);

    let selectedDish;
    let selectedCategory;
  }

  // MÉTODO PARA CARGAR LOS OBJETOS INICIALES
  onLoad = () => {
    const url = "../../data/restaurantData.json";
    fetch(url, {
      headers: {
        "Cache-Control": "no-cache, no-store, must-revalidate", // No almacenar en caché
        Expires: "0", // Expirar inmediatamente
      },
    })
      .then((response) => response.json())
      .then((data) => {
        const categories = data.categories;
        const dishes = data.dishes;
        const allergens = data.allergens;
        const menus = data.menus;
        const rests = data.restaurants;

        for (const cat of categories) {
          let cate = this[MODEL].createCategory(cat.name, cat.description);
          this[MODEL].addCategory(cate);
        }

        for (const dish of dishes) {
          let d = this[MODEL].createDish(
            dish.name,
            dish.description,
            dish.ingredients,
            dish.image
          );

          this[MODEL].addDish(d);
        }

        for (const al of allergens) {
          let aller = this[MODEL].createAllergen(al.name, al.description);
          this[MODEL].addAllergen(aller);
        }

        for (const men of menus) {
          let menu = this[MODEL].createMenu(men.name, men.description);

          this[MODEL].addMenu(menu);
        }

        // const category1 = this[MODEL].addCategory("Entrantes");
        // const dish1 = this[MODEL].addDish("Batata Fries").dish;

        // ASIGNACIÓN PLATOS A CATEGORÍAS
        this[MODEL].assignCategoryToDish(
          this[MODEL].getCategoryByName("Entrantes"),
          this[MODEL].getDishByName("Batata Fries").dish
        );

        this[MODEL].assignCategoryToDish(
          this[MODEL].createCategory("Entrantes"),
          this[MODEL].createDish("The Mad Tequeños").dish
        );

        this[MODEL].assignCategoryToDish(
          this[MODEL].createCategory("Entrantes"),
          this[MODEL].createDish("Crunchy Chick'n Nuggets").dish
        );

        this[MODEL].assignCategoryToDish(
          this[MODEL].createCategory("Entrantes"),
          this[MODEL].createDish("Calamares Rebozados").dish
        );

        this[MODEL].assignCategoryToDish(
          this[MODEL].createCategory("Platos Principales"),
          this[MODEL].createDish("Berlin Vegan Wurst").dish
        );
        this[MODEL].assignCategoryToDish(
          this[MODEL].createCategory("Platos Principales"),
          this[MODEL].createDish("Original Mad Burger").dish
        );
        this[MODEL].assignCategoryToDish(
          this[MODEL].createCategory("Platos Principales"),
          this[MODEL].createDish("The Mad Signature").dish
        );
        this[MODEL].assignCategoryToDish(
          this[MODEL].createCategory("Platos Principales"),
          this[MODEL].createDish("Dirty Philly").dish
        );
        this[MODEL].assignCategoryToDish(
          this[MODEL].createCategory("Platos Principales"),
          this[MODEL].createDish("Double Cheese Bacon").dish
        );
        this[MODEL].assignCategoryToDish(
          this[MODEL].createCategory("Platos Principales"),
          this[MODEL].createDish("Rock'n Chick'n").dish
        );
        this[MODEL].assignCategoryToDish(
          this[MODEL].createCategory("Platos Principales"),
          this[MODEL].createDish("The Mad Club Sandwich").dish
        );
        this[MODEL].assignCategoryToDish(
          this[MODEL].createCategory("Platos Principales"),
          this[MODEL].createDish("Los originales del Mad").dish
        );
        this[MODEL].assignCategoryToDish(
          this[MODEL].createCategory("Platos Principales"),
          this[MODEL].createDish("Los chingones de TV").dish
        );

        this[MODEL].assignCategoryToDish(
          this[MODEL].createCategory("Postres"),
          this[MODEL].createDish("Cookies & Cream").dish
        );
        this[MODEL].assignCategoryToDish(
          this[MODEL].createCategory("Postres"),
          this[MODEL].createDish("Tiramisú").dish
        );
        this[MODEL].assignCategoryToDish(
          this[MODEL].createCategory("Postres"),
          this[MODEL].createDish("merican Brownie").dish
        );
        this[MODEL].assignCategoryToDish(
          this[MODEL].createCategory("Postres"),
          this[MODEL].createDish("Tarta de Zanahoria").dish
        );

        // GLUTEN
        this[MODEL].assignAllergenToDish(
          this[MODEL].createAllergen("Gluten"),
          this[MODEL].createDish("The Mad Tequeños").dish
        );
        this[MODEL].assignAllergenToDish(
          this[MODEL].createAllergen("Gluten"),
          this[MODEL].createDish("Crunchy Chick'n Nuggets").dish
        );
        this[MODEL].assignAllergenToDish(
          this[MODEL].createAllergen("Gluten"),
          this[MODEL].createDish("Calamares Rebozados").dish
        );
        this[MODEL].assignAllergenToDish(
          this[MODEL].createAllergen("Gluten"),
          this[MODEL].createDish("Berlin Vegan Wurst").dish
        );
        this[MODEL].assignAllergenToDish(
          this[MODEL].createAllergen("Gluten"),
          this[MODEL].createDish("Original Mad Burger").dish
        );
        this[MODEL].assignAllergenToDish(
          this[MODEL].createAllergen("Gluten"),
          this[MODEL].createDish("The Mad Signature").dish
        );
        this[MODEL].assignAllergenToDish(
          this[MODEL].createAllergen("Gluten"),
          this[MODEL].createDish("Dirty Philly").dish
        );
        this[MODEL].assignAllergenToDish(
          this[MODEL].createAllergen("Gluten"),
          this[MODEL].createDish("Double Cheese Bacon").dish
        );
        this[MODEL].assignAllergenToDish(
          this[MODEL].createAllergen("Gluten"),
          this[MODEL].createDish("Rock'n Chick'n").dish
        );
        this[MODEL].assignAllergenToDish(
          this[MODEL].createAllergen("Gluten"),
          this[MODEL].createDish("The Mad Club Sandwich").dish
        );
        this[MODEL].assignAllergenToDish(
          this[MODEL].createAllergen("Gluten"),
          this[MODEL].createDish("Los originales del Mad").dish
        );
        this[MODEL].assignAllergenToDish(
          this[MODEL].createAllergen("Gluten"),
          this[MODEL].createDish("Los chingones de TV").dish
        );
        this[MODEL].assignAllergenToDish(
          this[MODEL].createAllergen("Gluten"),
          this[MODEL].createDish("Cookies & cream").dish
        );
        this[MODEL].assignAllergenToDish(
          this[MODEL].createAllergen("Gluten"),
          this[MODEL].createDish("Tiramisú").dish
        );
        this[MODEL].assignAllergenToDish(
          this[MODEL].createAllergen("Gluten"),
          this[MODEL].createDish("American Brownie").dish
        );
        this[MODEL].assignAllergenToDish(
          this[MODEL].createAllergen("Gluten"),
          this[MODEL].createDish("tarta de zanahoria").dish
        );
        // LACTOSA
        this[MODEL].assignAllergenToDish(
          this[MODEL].createAllergen("Lactosa"),
          this[MODEL].createDish("The Mad Tequeños").dish
        );
        this[MODEL].assignAllergenToDish(
          this[MODEL].createAllergen("Lactosa"),
          this[MODEL].createDish("Original Mad Burger").dish
        );
        this[MODEL].assignAllergenToDish(
          this[MODEL].createAllergen("Lactosa"),
          this[MODEL].createDish("Dirty Philly").dish
        );
        this[MODEL].assignAllergenToDish(
          this[MODEL].createAllergen("Lactosa"),
          this[MODEL].createDish("Double Cheese Bacon").dish
        );
        this[MODEL].assignAllergenToDish(
          this[MODEL].createAllergen("Lactosa"),
          this[MODEL].createDish("Rock'n Chick'n").dish
        );
        this[MODEL].assignAllergenToDish(
          this[MODEL].createAllergen("Lactosa"),
          this[MODEL].createDish("The Mad Club Sandwich").dish
        );
        this[MODEL].assignAllergenToDish(
          this[MODEL].createAllergen("Lactosa"),
          this[MODEL].createDish("Los originales del Mad").dish
        );
        this[MODEL].assignAllergenToDish(
          this[MODEL].createAllergen("Lactosa"),
          this[MODEL].createDish("Los chingones de TV").dish
        );
        this[MODEL].assignAllergenToDish(
          this[MODEL].createAllergen("Lactosa"),
          this[MODEL].createDish("Tiramisú").dish
        );
        // FRUTOS SECOS
        this[MODEL].assignAllergenToDish(
          this[MODEL].createAllergen("Frutos Secos"),
          this[MODEL].createDish("American Brownie").dish
        );
        this[MODEL].assignAllergenToDish(
          this[MODEL].createAllergen("Frutos Secos"),
          this[MODEL].createDish("tarta de zanahoria").dish
        );

        // SOJA
        this[MODEL].assignAllergenToDish(
          this[MODEL].createAllergen("Soja"),
          this[MODEL].createDish("Crunchy Chick'n Nuggets").dish
        );
        this[MODEL].assignAllergenToDish(
          this[MODEL].createAllergen("Soja"),
          this[MODEL].createDish("Calamares Rebozados").dish
        );
        this[MODEL].assignAllergenToDish(
          this[MODEL].createAllergen("Soja"),
          this[MODEL].createDish("Berlin Vegan Wurst").dish
        );
        this[MODEL].assignAllergenToDish(
          this[MODEL].createAllergen("Soja"),
          this[MODEL].createDish("Original Mad Burger").dish
        );
        this[MODEL].assignAllergenToDish(
          this[MODEL].createAllergen("Soja"),
          this[MODEL].createDish("Double Cheese Bacon").dish
        );
        this[MODEL].assignAllergenToDish(
          this[MODEL].createAllergen("Soja"),
          this[MODEL].createDish("Rock'n Chick'n").dish
        );
        this[MODEL].assignAllergenToDish(
          this[MODEL].createAllergen("Soja"),
          this[MODEL].createDish("Los chingones de TV").dish
        );

        // ASIGNACIÓN PLATO A MENÚ
        // DÍA
        this[MODEL].assignDishToMenu(
          this[MODEL].createMenu("Día").menu,
          this[MODEL].createDish("Batata Fries").dish
        );
        this[MODEL].assignDishToMenu(
          this[MODEL].createMenu("Día").menu,
          this[MODEL].createDish("Original Mad Burger").dish
        );
        this[MODEL].assignDishToMenu(
          this[MODEL].createMenu("Día").menu,
          this[MODEL].createDish("Cookies & cream").dish
        );

        // PAREJAS
        this[MODEL].assignDishToMenu(
          this[MODEL].createMenu("Parejas").menu,
          this[MODEL].createDish("Batata Fries").dish
        );
        this[MODEL].assignDishToMenu(
          this[MODEL].createMenu("Parejas").menu,
          this[MODEL].createDish("Double Cheese Bacon").dish
        );
        this[MODEL].assignDishToMenu(
          this[MODEL].createMenu("Parejas").menu,
          this[MODEL].createDish("Rock'n Chick'n").dish
        );
        this[MODEL].assignDishToMenu(
          this[MODEL].createMenu("Parejas").menu,
          this[MODEL].createDish("Tiramisú").dish
        );

        // INFANTIL
        this[MODEL].assignDishToMenu(
          this[MODEL].createMenu("Infantil").menu,
          this[MODEL].createDish("Crunchy Chick'n Nuggets").dish
        );
        this[MODEL].assignDishToMenu(
          this[MODEL].createMenu("Infantil").menu,
          this[MODEL].createDish("The Mad Club Sandwich").dish
        );
        this[MODEL].assignDishToMenu(
          this[MODEL].createMenu("Infantil").menu,
          this[MODEL].createDish("American Brownie").dish
        );

        let ciudadReal = new Coordinate(
          rests[0].location.latitude,
          rests[0].location.longitude
        );
        let madrid = new Coordinate(
          rests[1].location.latitude,
          rests[1].location.longitude
        );
        let valencia = new Coordinate(
          rests[2].location.latitude,
          rests[2].location.longitude
        );

        for (const res of rests) {
          let r = this[MODEL].createRestaurant(res.name, ciudadReal);
          r.description = res.description;
          this[MODEL].addRestaurant(r);
        }
        for (const res of rests) {
          let r = this[MODEL].createRestaurant(res.name, madrid);
          r.description = res.description;
          this[MODEL].addRestaurant(r);
        }
        for (const res of rests) {
          let r = this[MODEL].createRestaurant(res.name, valencia);
          r.description = res.description;
          this[MODEL].addRestaurant(r);
        }
      })
      .then(() => {
        if (getCookie("acceptedCookieMessage") !== "true") {
          this[VIEW].showCookiesMessage();
        }

        const userCookie = getCookie("activeUser");
        console.log(userCookie);
        if (userCookie) {
          const user = this[AUTH].getUser(userCookie);
          if (user) {
            this[USER] = user;
            this.onOpenSession();
          }
        } else {
          this.onCloseSession();
        }

        const fav = this[VIEW].getFavs();
        if (fav) {
          this[FAV] = JSON.parse(fav);
        }

        // this[LOAD_MANAGER_OBJECTS]();

        // CATEGORÍAS
        // this[VIEW].bindCategoryDrop(this.handleShowCategory);
        this[VIEW].bindNavCategoryClick(this.handleCategories);

        // MENU
        this[VIEW].bindNavMenuClick(this.handleMenu);

        // ALERGENOS
        this[VIEW].bindNavAllergenClick(this.handleAllergen);

        //RESTAURANTES
        // this[VIEW].bindDropRestaurantClicks(this.handleShowCategory);
        this[VIEW].bindNavRestaurantClick(this.handleRestaurant);

        // ADMIN
        // this[VIEW].bindNavAdminClick(this.handleAdmin);
      });
  };

  // MÉTODO PARA INICIALIZAR LA VISTA
  onInit = () => {
    this[VIEW].init();
    // PLATOS
    this[VIEW].showRandomDishes(this[MODEL].getDishes());

    this[VIEW].bindDishRandom(this.handleDishes);
    // CATEGORIAS
    this[VIEW].bindCategoryClicks(this.handleShowCategory);

    // FAVORITOS
    if (this[USER] != null) {
      this[VIEW].showFavButton();
      this[VIEW].bindFavButton(this.handleFavs);
    }
  };

  //MÉTODO PARA MANEJAR LA SELECCIÓN DE UN PLATO Y MOSTRAR SU INFORMACIÓN EN LA VISTA
  handleDishes = (dataSet) => {
    // TODO: Se repite dos veces por el history en bindDishRandom
    const dish = this[MODEL].getDishByName(dataSet);
    // console.log("Nombre del plato obtenido:", dataSet);

    this.selectedDish = dish;

    // TODO: y en categories sale: categories = getCategoryForDish {<suspended>¡}
    const categories = this[MODEL].getCategoriesForDish(this.selectedDish);
    // console.log("¿Son los mismos objetos?", this.selectedDish === dish);

    this.selectedCategory = categories;

    this[VIEW].showInfoDish(dish);
    this[VIEW].bindElemNewWin(this.handleShowDishInfoInNewWindow);
  };

  // MÉTODO PARA MANEJAR LA CATEGORÍA SELECCIONADA
  handleCategories = () => {
    this[VIEW].dropdownCategory(this[MODEL].getCategories());
    // this[VIEW].showCategories(this[MODEL].getCategories());
    this[VIEW].bindCategoryDropClicks(this.handleShowCategory);
  };

  handleMenu = () => {
    // this.onMenu();
    this[VIEW].showMenus(this[MODEL].getMenus());
    this[VIEW].bindMenuClicks(this.handleShowMenu);
  };

  // MÉTODO PARA MANEJAR LA SELECCIÓN DE UN ALÉRGENO
  handleAllergen = () => {
    // this.onAllergen();
    this[VIEW].showAllergen(this[MODEL].getAllergen());
    this[VIEW].bindAllergenClicks(this.handleShowAllergen);
  };

  // MÉTODO PARA MANEJAR LA SELECCIÓN DE UN RESTAURANTE Y MOSTRAR EL MENÚ DESPLEGABLE DE RESTAURANTES
  handleRestaurant = () => {
    this[VIEW].dropdownRestaurant(this[MODEL].getRestaurants());
    this[VIEW].bindRestaurantClicks(this.handleShowRestaurant);
  };

  // MÉTODO PARA MANEJAR LA SELECCIÓN DE UNA CATEGORÍA Y MOSTRAR LOS PLATOS DE ESA CATEGORÍA
  handleShowCategory = (title) => {
    this.handleCategories;
    const cat = this[MODEL].createCategory(title);
    this[VIEW].showCategoryDishes(
      this[MODEL].getDishesInCategory(cat),
      cat.name
    );

    if (this[USER] != null) {
      this[VIEW].showFavButton();
      this[VIEW].bindFavButton(this.handleFavs);
    }

    this[VIEW].bindDishInCategory(this.handleDishes);
  };

  // MÉTODO PARA MANEJAR LA SELECCIÓN DE UN MENÚ Y MOSTRAR EL MENÚ CORRESPONDIENTE
  handleShowMenu = (title) => {
    this.handleMenu;
    const menu = this[MODEL].getMenuByName(title);
    this[VIEW].showMenuDishes(menu.dishes, title);

    if (this[USER] != null) {
      this[VIEW].showFavButton();
      this[VIEW].bindFavButton(this.handleFavs);
    }

    this[VIEW].bindDishInMenu(this.handleDishes);
  };

  // MÉTODO PARA MANEJAR LA SELECCIÓN DE UN ALÉRGENO Y MOSTRAR LOS PLATOS CON ESE ALÉRGENO
  handleShowAllergen = (title) => {
    this.handleAllergen;
    this[VIEW].showAllergenDishes(
      this[MODEL].getDishesWithAllergen(this[MODEL].getAllergenByName(title)),
      title
    );

    if (this[USER] != null) {
      this[VIEW].showFavButton();
      this[VIEW].bindFavButton(this.handleFavs);
    }

    this[VIEW].bindDishInAllergen(this.handleDishes);
  };

  // MÉTODO PARA MANEJAR LA SELECCIÓN DE UN RESTAURANTE Y MOSTRAR SU INFORMACIÓN
  handleShowRestaurant = (title) => {
    this.handleRestaurant;
    const rest = this[MODEL].getRestaurantByName(title);
    this[VIEW].showInfoRestaurant(rest);
  };

  handleShowDishInfoInNewWindow = () => {
    this[VIEW].showDishInfoInNewWindow(
      this.selectedDish,
      this.selectedCategory
    );
    this[VIEW].bindCloseWindows(this.handleCloseWindows);
  };

  handleCloseWindows = () => {
    this[VIEW].closeWindows();
  };

  handleAdmin = () => {
    this[VIEW].showAdmin();

    this[VIEW].showCreateDish(
      this[MODEL].getCategories(),
      this[MODEL].getAllergen()
    );
    this[VIEW].bindCreateDish(this.handleCreateDish);

    this[VIEW].showDeleteDish(this[MODEL].getDishes());
    this[VIEW].bindDeleteDish(this.handleDeleteDish);

    this[VIEW].showAdminDishMenu(
      this[MODEL].getMenus(),
      this[MODEL].getDishes()
    );
    this[VIEW].bindDishMenu(this.handleDishMenu);

    this[VIEW].showCreaDelCategory(this[MODEL].getCategories());
    this[VIEW].bindCreateCategory(this.handleCreateCategory);
    this[VIEW].bindDeleteCategory(this.handleDeleteCategory);

    this[VIEW].showCreateRestaurant();
    this[VIEW].bindRestaurant(this.handleCreateRestaurant);

    this[VIEW].showUpdateCatDish();
    this[VIEW].bindUpdateCatDish(this.handleUpdateCatDish);
  };

  onOpenSession() {
    // this[LOAD_MANAGER_OBJECTS]();
    this.onInit();
    this[VIEW].initHistory();
    this[VIEW].showAuthUserProfile(this[USER]);
    this[VIEW].bindCloseSession(this.handleCloseSession);
    this[VIEW].showAdminNav();
    this[VIEW].bindAdmin(this.handleAdmin);
    this[VIEW].showFavNav();
    this[VIEW].bindFavNav(this.handleFavNav);
  }

  onCloseSession() {
    this[USER] = null;
    this[VIEW].deleteUserCookie();
    this[VIEW].showIdentificationLink();
    this[VIEW].bindIdentificationLink(this.handleLoginForm);
    this[VIEW].removeAdminNav();
    this[VIEW].showRemoveFavNav();
  }

  onFav() {
    this[VIEW].showFavs(this[FAV]);
  }

  handleLoginForm = () => {
    this[VIEW].showLogin();
    this[VIEW].bindLogin(this.handleLogin);
  };

  handleLogin = (username, password, remember) => {
    if (this[AUTH].validateUser(username, password)) {
      this[USER] = this[AUTH].getUser(username);
      this.onOpenSession();

      // if (username == "admin") {
      // this[VIEW].showAdminTools();
      // this[VIEW].showFavTools();
      // }

      if (remember) {
        this[VIEW].setUserCookie(this[USER]);
      }
    } else {
      this[VIEW].showInvalidUserMessage();
    }
  };

  handleCloseSession = () => {
    this.onCloseSession();
    this.onInit();
    this[VIEW].initHistory();
  };

  handleFavNav = () => {
    this.onFav();
  };

  handleFavs = (fav) => {
    let dish = this[MODEL].createDish(fav);

    if (
      this[FAV].findIndex(
        (element) => JSON.stringify(element) == JSON.stringify(dish)
      ) == -1
    ) {
      this[FAV].push(dish);
      localStorage.setItem("fav", JSON.stringify(this[FAV]));
    }
  };

  handleCreateDish = (name, descrip, cat, aller) => {
    console.log(name + " " + descrip + " " + cat + " " + aller);

    // Creamos el nuevo plato
    const dish = this[MODEL].createDish(name, descrip, cat, "imgDefecto.png");

    // dish.description = descrip;

    let complete;
    let error = "";
    try {
      //Verificamos y gestionamos la asignación de categoría y alérgeno
      if (cat != "") {
        const category = this[MODEL].createCategory(cat);

        //Asignamos la categoría al plato
        this[MODEL].assignCategoryToDish(category, dish);
      }

      if (aller != "") {
        const allergen = this[MODEL].getAllergenByName(aller);

        this[MODEL].assignAllergenToDish(dish, allergen);
      }

      complete = true;
      //lo redirigimos a la vista administrador
      this.handleAdmin();
    } catch (exception) {
      complete = false;
      error = exception;
    }

    //Mostramos el resultado
    this[VIEW].showCreateDishModal(name, complete, error);
  };

  handleDeleteDish = (dishName) => {
    let complete;
    let error = "";

    try {
      let dish = this[MODEL].getDishByName(dishName);
      this[MODEL].removeDish(dish.dish);
      this[MODEL].removeDishCategory(dish.dish);
      this[MODEL].removeDishMenu(dish.dish);

      complete = true;

      this.handleAdmin();
    } catch (exception) {
      complete = false;
      error = exception;
    }

    this[VIEW].showDeleteDishModal(dishName, complete, error);
  };

  handleDishMenu = (option, menuName, dishName) => {
    let complete;
    let error = "";

    try {
      let menu = this[MODEL].getMenuByName(menuName);
      let dish = this[MODEL].getDishByName(dishName);

      if (option == "asignar") {
        this[MODEL].assignDishToMenu(menu.menu, dish.dish);
      }
      if (option == "designar") {
        this[MODEL].deassignDishToMenu(menu.menu, dish.dish);
      }

      complete = true;
      this.handleAdmin();
    } catch (exception) {
      complete = false;
      error = exception;
    }

    this[VIEW].showDishMenuModal(complete, error);
  };

  handleCreateCategory = (catName) => {
    // const categ = this[MODEL].getCategoryByName(catName);
    const categ = this[MODEL].createCategory(catName);

    let complete;
    let error = "";

    try {
      this[MODEL].addCategory(categ);

      complete = true;
      this.handleAdmin;
    } catch (exception) {
      complete = false;
      error = exception;
    }

    this[VIEW].showCreateCategoryModal(catName, complete, error);
  };

  handleDeleteCategory = (catName) => {
    // const categ = this[MODEL].getCategoryByName(catName);
    const categ = this[MODEL].createCategory(catName);

    let complete;
    let error = "";

    try {
      this[MODEL].removeCategory(categ);

      complete = true;
      this.handleAdmin;
    } catch (exception) {
      complete = false;
      error = exception;
    }
    this[VIEW].showDeleteCategoryModal(catName, complete, error);
  };

  handleCreateRestaurant = (name, lat, long) => {
    let complete;
    let error = "";
    try {
      const coor = new Coordinate(lat, long);
      this[MODEL].addRestaurant(this[MODEL].createRestaurant(name, coor));

      complete = true;
      this.handleAdmin();
    } catch (exception) {
      complete = false;
      error = exception;
    }
    this[VIEW].showRestaurantModal(name, complete, error);
  };

  handleUpdateCatDish = (opt) => {
    let firstPart = document.getElementById("firstPart");
    let secondPart = document.getElementById("secondPart");
    if (firstPart != undefined) {
      firstPart.parentNode.parentNode.remove();
    }
    if (secondPart != undefined) {
      secondPart.parentNode.parentNode.remove();
    }
    if (opt == "radioA") {
      this[VIEW].showDishSelection(this[MODEL].getDishes());
      this[VIEW].bindDishSelection(this.handleAddSelection);
    } else {
      this[VIEW].showDishSelection(this[MODEL].getDishes());
      this[VIEW].bindDishSelection(this.handleDeleteSelection);
    }
  };

  handleAddSelection = (dish) => {
    let secondPart = document.getElementById("secondPart");
    if (secondPart != undefined) {
      secondPart.parentNode.parentNode.remove();
    }
    let categoriesToExclude = this[MODEL].getCategoriesForDish(dish);
    let categories = this[MODEL].getCategories();
    let filteredCategories = categories.filter(
      (cat) =>
        !categoriesToExclude.some(
          (exclude) => exclude.category === cat.category
        )
    );
    this[VIEW].showAddCategorySelection(filteredCategories);
    this[VIEW].bindAddCatDish(this.handleAddCatDish);
  };

  handleDeleteSelection = (dish) => {
    let secondPart = document.getElementById("secondPart");
    if (secondPart != undefined) {
      secondPart.parentNode.parentNode.remove();
    }
    let categoriesToInclude = this[MODEL].getCategoriesForDish(dish);
    this[VIEW].showDeleCategorySelection(categoriesToInclude);
    this[VIEW].bindDelCatDish(this.handleDelCatDish);
  };

  handleAddCatDish = (dishName, catName) => {
    let complete;
    let error = "";

    try {
      let dish = this[MODEL].getDishByName(dishName);
      let category = this[MODEL].getCategoryByName(catName);

      this[MODEL].assignCategoryToDish(category.category, dish.dish);

      complete = true;
      this.handleAdmin;
    } catch (exception) {
      complete = false;
      error = exception;
    }

    this[VIEW].showAddCategoryDishModal(dishName, catName, complete, error);
  };

  handleDelCatDish = (dishName, catName) => {
    let complete;
    let error = "";

    try {
      let dish = this[MODEL].getDishByName(dishName);
      let category = this[MODEL].getCategoryByName(catName);

      this[MODEL].deassignCategoryToDish(category.category, dish.dish);

      complete = true;
      this.handleAdmin;
    } catch (exception) {
      complete = false;
      error = exception;
    }

    this[VIEW].showDelCategoryDishModal(dishName, catName, complete, error);
  };

  getDish(dish) {
    return this[MODEL].getDish(dish);
  }

  getCategoryForDish(dish) {
    return this[MODEL].getCategoryForDish(dish);
  }
}
export default RestaurantController;
