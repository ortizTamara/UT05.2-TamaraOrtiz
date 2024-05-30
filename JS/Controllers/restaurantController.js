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
    // await this.onLoad();

    // this.onInit();
    this.initialize();
    // Enlazamos handlers con la vista
    // this[VIEW].bindInit(this.handleInit);
    this[VIEW].bindInit(this.onInit);

    let selectedDish;
    let selectedCategory;
  }

  async initialize() {
    await this.onLoad();
    this.onInit();
  }

  async onLoad() {
    const isLiveServer = window.location.hostname === "127.0.0.1";
    const url = isLiveServer
      ? "../../data/restaurantData.json"
      : "http://localhost/tamaraOrtizGomez/data/restaurantData.json";
    console.log(url);

    try {
      const response = await fetch(url);

      if (!response.ok) {
        throw new Error(`HTTP error! status: ${response.status}`);
      }

      const data = await response.json();

      const categories = data.categories;
      const dishes = data.dishes;
      const allergens = data.allergens;
      const menus = data.menus;
      const rests = data.restaurants;

      console.log(data);

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

      // ASIGNACIÓN PLATOS A CATEGORÍAS
      this[MODEL].assignCategoryToDish(
        this[MODEL].createCategory("Entrantes"),
        this[MODEL].createDish("Batata Fries")
      );

      this[MODEL].assignCategoryToDish(
        this[MODEL].createCategory("Entrantes"),
        this[MODEL].createDish("The Mad Tequeños")
      );

      this[MODEL].assignCategoryToDish(
        this[MODEL].createCategory("Entrantes"),
        this[MODEL].createDish("Crunchy Chick'n Nuggets")
      );

      this[MODEL].assignCategoryToDish(
        this[MODEL].createCategory("Entrantes"),
        this[MODEL].createDish("Calamares Rebozados")
      );

      this[MODEL].assignCategoryToDish(
        this[MODEL].createCategory("Platos Principales"),
        this[MODEL].createDish("Berlin Vegan Wurst")
      );
      this[MODEL].assignCategoryToDish(
        this[MODEL].createCategory("Platos Principales"),
        this[MODEL].createDish("Original Mad Burger")
      );
      this[MODEL].assignCategoryToDish(
        this[MODEL].createCategory("Platos Principales"),
        this[MODEL].createDish("The Mad Signature")
      );
      this[MODEL].assignCategoryToDish(
        this[MODEL].createCategory("Platos Principales"),
        this[MODEL].createDish("Dirty Philly")
      );
      this[MODEL].assignCategoryToDish(
        this[MODEL].createCategory("Platos Principales"),
        this[MODEL].createDish("Double Cheese Bacon")
      );
      this[MODEL].assignCategoryToDish(
        this[MODEL].createCategory("Platos Principales"),
        this[MODEL].createDish("Rock'n Chick'n")
      );
      this[MODEL].assignCategoryToDish(
        this[MODEL].createCategory("Platos Principales"),
        this[MODEL].createDish("The Mad Club Sandwich")
      );
      this[MODEL].assignCategoryToDish(
        this[MODEL].createCategory("Platos Principales"),
        this[MODEL].createDish("Los originales del Mad")
      );
      this[MODEL].assignCategoryToDish(
        this[MODEL].createCategory("Platos Principales"),
        this[MODEL].createDish("Los chingones de TV")
      );

      this[MODEL].assignCategoryToDish(
        this[MODEL].createCategory("Postres"),
        this[MODEL].createDish("Cookies & Cream")
      );
      this[MODEL].assignCategoryToDish(
        this[MODEL].createCategory("Postres"),
        this[MODEL].createDish("Tiramisú")
      );
      this[MODEL].assignCategoryToDish(
        this[MODEL].createCategory("Postres"),
        this[MODEL].createDish("American Brownie")
      );
      this[MODEL].assignCategoryToDish(
        this[MODEL].createCategory("Postres"),
        this[MODEL].createDish("Tarta de Zanahoria")
      );
      // GLUTEN
      this[MODEL].assignAllergenToDish(
        this[MODEL].createDish("The Mad Tequeños"),
        this[MODEL].getAllergenByName("Gluten")
        // this[MODEL].createAllergen("Gluten")
      );
      this[MODEL].assignAllergenToDish(
        this[MODEL].createDish("Crunchy Chick'n Nuggets"),
        this[MODEL].getAllergenByName("Gluten")
        // this[MODEL].createAllergen("Gluten")
      );
      this[MODEL].assignAllergenToDish(
        this[MODEL].createDish("Calamares Rebozados"),
        this[MODEL].getAllergenByName("Gluten")
        // this[MODEL].createAllergen("Gluten")
      );
      this[MODEL].assignAllergenToDish(
        this[MODEL].createDish("Berlin Vegan Wurst"),
        this[MODEL].getAllergenByName("Gluten")
        // this[MODEL].createAllergen("Gluten")
      );
      this[MODEL].assignAllergenToDish(
        this[MODEL].createDish("Original Mad Burger"),
        this[MODEL].getAllergenByName("Gluten")
        // this[MODEL].createAllergen("Gluten")
      );
      this[MODEL].assignAllergenToDish(
        this[MODEL].createDish("The Mad Signature"),
        this[MODEL].getAllergenByName("Gluten")
        // this[MODEL].createAllergen("Gluten")
      );
      this[MODEL].assignAllergenToDish(
        this[MODEL].createDish("Dirty Philly"),
        this[MODEL].getAllergenByName("Gluten")
        // this[MODEL].createAllergen("Gluten")
      );
      this[MODEL].assignAllergenToDish(
        this[MODEL].createDish("Double Cheese Bacon"),
        this[MODEL].getAllergenByName("Gluten")
        // this[MODEL].createAllergen("Gluten")
      );
      this[MODEL].assignAllergenToDish(
        this[MODEL].createDish("Rock'n Chick'n"),
        this[MODEL].getAllergenByName("Gluten")
        // this[MODEL].createAllergen("Gluten")
      );
      this[MODEL].assignAllergenToDish(
        this[MODEL].createDish("The Mad Club Sandwich"),
        this[MODEL].getAllergenByName("Gluten")
        // this[MODEL].createAllergen("Gluten")
      );
      this[MODEL].assignAllergenToDish(
        this[MODEL].createDish("Los originales del Mad"),
        this[MODEL].getAllergenByName("Gluten")
        // this[MODEL].createAllergen("Gluten")
      );
      this[MODEL].assignAllergenToDish(
        this[MODEL].createDish("Los chingones de TV"),
        this[MODEL].getAllergenByName("Gluten")
        // this[MODEL].createAllergen("Gluten")
      );
      this[MODEL].assignAllergenToDish(
        this[MODEL].createDish("Cookies & Cream"),
        this[MODEL].getAllergenByName("Gluten")
        // this[MODEL].createAllergen("Gluten")
      );
      this[MODEL].assignAllergenToDish(
        this[MODEL].createDish("Tiramisú"),
        this[MODEL].getAllergenByName("Gluten")
        // this[MODEL].createAllergen("Gluten")
      );
      this[MODEL].assignAllergenToDish(
        this[MODEL].createDish("American Brownie"),
        this[MODEL].getAllergenByName("Gluten")
        // this[MODEL].createAllergen("Gluten")
      );
      this[MODEL].assignAllergenToDish(
        this[MODEL].createDish("Tarta de Zanahoria"),
        this[MODEL].getAllergenByName("Gluten")
        // this[MODEL].createAllergen("Gluten")
      );
      // LACTOSA
      this[MODEL].assignAllergenToDish(
        this[MODEL].createDish("The Mad Tequeños"),
        this[MODEL].getAllergenByName("Lactosa")
        // this[MODEL].createAllergen("Lactosa")
      );
      this[MODEL].assignAllergenToDish(
        this[MODEL].createDish("Original Mad Burger"),
        this[MODEL].getAllergenByName("Lactosa")
        // this[MODEL].createAllergen("Lactosa")
      );
      this[MODEL].assignAllergenToDish(
        this[MODEL].createDish("Dirty Philly"),
        this[MODEL].getAllergenByName("Lactosa")
        // this[MODEL].createAllergen("Lactosa")
      );
      this[MODEL].assignAllergenToDish(
        this[MODEL].createDish("Double Cheese Bacon"),
        this[MODEL].getAllergenByName("Lactosa")
        // this[MODEL].createAllergen("Lactosa")
      );
      this[MODEL].assignAllergenToDish(
        this[MODEL].createDish("Rock'n Chick'n"),
        this[MODEL].getAllergenByName("Lactosa")
        // this[MODEL].createAllergen("Lactosa")
      );
      this[MODEL].assignAllergenToDish(
        this[MODEL].createDish("The Mad Club Sandwich"),
        this[MODEL].getAllergenByName("Lactosa")
        // this[MODEL].createAllergen("Lactosa")
      );
      this[MODEL].assignAllergenToDish(
        this[MODEL].createDish("Los originales del Mad"),
        this[MODEL].getAllergenByName("Lactosa")
        // this[MODEL].createAllergen("Lactosa")
      );
      this[MODEL].assignAllergenToDish(
        this[MODEL].createDish("Los chingones de TV"),
        this[MODEL].getAllergenByName("Lactosa")
        // this[MODEL].createAllergen("Lactosa")
      );
      this[MODEL].assignAllergenToDish(
        this[MODEL].createDish("Tiramisú"),
        this[MODEL].getAllergenByName("Lactosa")
        // this[MODEL].createAllergen("Lactosa")
      );
      // FRUTOS SECOS
      this[MODEL].assignAllergenToDish(
        this[MODEL].createDish("American Brownie"),
        this[MODEL].getAllergenByName("Frutos Secos")
        // this[MODEL].createAllergen("Frutos Secos")
      );
      this[MODEL].assignAllergenToDish(
        this[MODEL].createDish("Tarta de Zanahoria"),
        this[MODEL].getAllergenByName("Frutos Secos")
        // this[MODEL].createAllergen("Frutos Secos")
      );

      // SOJA
      this[MODEL].assignAllergenToDish(
        this[MODEL].createDish("Crunchy Chick'n Nuggets"),
        this[MODEL].getAllergenByName("Soja")
        // this[MODEL].createAllergen("Soja")
      );
      this[MODEL].assignAllergenToDish(
        this[MODEL].createDish("Calamares Rebozados"),
        this[MODEL].getAllergenByName("Soja")
        // this[MODEL].createAllergen("Soja")
      );
      this[MODEL].assignAllergenToDish(
        this[MODEL].createDish("Berlin Vegan Wurst"),
        this[MODEL].getAllergenByName("Soja")
        // this[MODEL].createAllergen("Soja")
      );
      this[MODEL].assignAllergenToDish(
        this[MODEL].createDish("Original Mad Burger"),
        this[MODEL].getAllergenByName("Soja")
        // this[MODEL].createAllergen("Soja")
      );
      this[MODEL].assignAllergenToDish(
        this[MODEL].createDish("Double Cheese Bacon"),
        this[MODEL].getAllergenByName("Soja")
        // this[MODEL].createAllergen("Soja")
      );
      this[MODEL].assignAllergenToDish(
        this[MODEL].createDish("Rock'n Chick'n"),
        this[MODEL].getAllergenByName("Soja")
        // this[MODEL].createAllergen("Soja")
      );
      this[MODEL].assignAllergenToDish(
        this[MODEL].createDish("Los chingones de TV"),
        this[MODEL].getAllergenByName("Soja")
        // this[MODEL].createAllergen("Soja")
      );

      // ASIGNACIÓN PLATO A MENÚ
      // DÍA
      this[MODEL].assignDishToMenu(
        this[MODEL].createMenu("Día"),
        this[MODEL].createDish("Batata Fries")
      );
      this[MODEL].assignDishToMenu(
        this[MODEL].createMenu("Día"),
        this[MODEL].createDish("Original Mad Burger")
      );
      this[MODEL].assignDishToMenu(
        this[MODEL].createMenu("Día"),
        this[MODEL].createDish("Cookies & Cream")
      );

      // PAREJAS
      this[MODEL].assignDishToMenu(
        this[MODEL].createMenu("Parejas"),
        this[MODEL].createDish("Batata Fries")
      );
      this[MODEL].assignDishToMenu(
        this[MODEL].createMenu("Parejas"),
        this[MODEL].createDish("Double Cheese Bacon")
      );
      this[MODEL].assignDishToMenu(
        this[MODEL].createMenu("Parejas"),
        this[MODEL].createDish("Rock'n Chick'n")
      );
      this[MODEL].assignDishToMenu(
        this[MODEL].createMenu("Parejas"),
        this[MODEL].createDish("Tiramisú")
      );

      // INFANTIL
      this[MODEL].assignDishToMenu(
        this[MODEL].createMenu("Infantil"),
        this[MODEL].createDish("Crunchy Chick'n Nuggets")
      );
      this[MODEL].assignDishToMenu(
        this[MODEL].createMenu("Infantil"),
        this[MODEL].createDish("The Mad Club Sandwich")
      );
      this[MODEL].assignDishToMenu(
        this[MODEL].createMenu("Infantil"),
        this[MODEL].createDish("American Brownie")
      );

      for (const res of rests) {
        let r = this[MODEL].createRestaurant(
          res.name,
          res.description,
          res.location
        );
        this[MODEL].addRestaurant(r);
      }
    } catch (error) {
      console.error("Error fetching data:", error);
    }

    // Continuar con el resto del código
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

    // Vinculación de eventos
    this[VIEW].bindNavCategoryClick(this.handleCategories);
    this[VIEW].bindNavMenuClick(this.handleMenu);
    this[VIEW].bindNavAllergenClick(this.handleAllergen);
    this[VIEW].bindNavRestaurantClick(this.handleRestaurant);
  }

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

    this[VIEW].backupButton();
    this[VIEW].bindBackup(this.handleBackup);
  };

  handleBackup = () => {
    const backup = this.getBackupInfo();
    // console.log(backup);
    let formData = new FormData();
    formData.append("backup", JSON.stringify(backup));
    let done = false;

    const isLiveServer = window.location.hostname === "127.0.0.1";
    const url = isLiveServer
      ? "../../backup/generateBackup"
      : "http://localhost/tamaraOrtizGomez/php/generateBackup.php";

    fetch(url, {
      method: "POST",
      body: formData,
    })
      .then((data) => {
        done = true;
        this[VIEW].showBackupModal(done, data.message);
      })
      .catch((error) => {
        console.log(error);
        this[VIEW].showBackupModal(done, error.message);
      });
  };

  getBackupInfo() {
    const objects = {
      dishes: [],
      categories: [],
      menus: [],
      allergens: [],
      restaurants: [],
    };

    // Obtener platos y sus detalles
    const dishes = this[MODEL].getDishes();
    for (const dishObj of dishes) {
      const category = this[MODEL].getCategoriesForDish(dishObj.dish.name);
      const dishAlls = dishObj.allergens;
      const allNames = [];
      const catNames = [];
      for (const dishAll of dishAlls) {
        allNames.push(dishAll.name);
      }

      for (const cate of category) {
        catNames.push(cate.category.name);
      }

      objects.dishes.push({
        name: dishObj.dish.name,
        description: dishObj.dish.description,
        ingredients: dishObj.dish.ingredients,
        image: dishObj.dish.image,
        category: catNames,
        allergens: allNames,
      });
    }

    // Obtener categorías y sus detalles
    const cats = this[MODEL].getCategories();
    for (const category of cats) {
      objects.categories.push({
        name: category.category.name,
        description: category.category.description,
      });
    }

    // Obtener menús y sus detalles
    const menus = this[MODEL].getMenus();
    for (const menuObj of menus) {
      const menuDishes = menuObj.dishes;
      const dishNames = [];
      for (const dishObj of menuDishes) {
        dishNames.push(dishObj.name);
      }

      objects.menus.push({
        name: menuObj.menu.name,
        description: menuObj.menu.description,
        dishes: dishNames,
      });
    }

    // Obtener alérgenos y sus detalles
    const alls = this[MODEL].getAllergen();
    for (const allergen of alls) {
      objects.allergens.push({
        name: allergen.name,
        description: allergen.description,
      });
    }

    // Obtener restaurantes y sus detalles
    const restaurants = this[MODEL].getRestaurants();
    for (const rest of restaurants) {
      const loc = {
        latitude: rest.restaurant.location.latitude,
        longitude: rest.restaurant.location.longitude,
      };

      objects.restaurants.push({
        name: rest.restaurant.name,
        description: rest.restaurant.description,
        location: loc,
      });
    }

    return objects;
  }

  onOpenSession() {
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
