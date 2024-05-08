import Coordinate from "../Models/objectRestaurant.js";
const MODEL = Symbol("RestaurantModel");
const VIEW = Symbol("RestaurantView");
const LOAD_MANAGER_OBJECTS = Symbol("Load Manager Objects");

class RestaurantController {
  constructor(model, view) {
    this[MODEL] = model;
    this[VIEW] = view;

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
    this[LOAD_MANAGER_OBJECTS]();

    // TODO: borrar los mouseenter (ya no sirven para nada, creo)
    // CATEGORÍAS
    this[VIEW].mouseenterCategories();
    // this[VIEW].bindCategoryDrop(this.handleShowCategory);
    this[VIEW].bindNavCategoryClick(this.handleCategories);

    // MENU
    this[VIEW].mouseenterMenus();
    this[VIEW].bindNavMenuClick(this.handleMenu);

    // ALERGENOS
    this[VIEW].mouseenterAllergens();
    this[VIEW].bindNavAllergenClick(this.handleAllergen);

    //RESTAURANTES
    this[VIEW].mouseenterRestaurant();
    // this[VIEW].bindDropRestaurantClicks(this.handleShowCategory);
    this[VIEW].bindNavRestaurantClick(this.handleRestaurant);
  };

  // MÉTODO PARA INICIALIZAR LA VISTA
  onInit = () => {
    this[VIEW].init();
    // PLATOS
    this[VIEW].showRandomDishes(this[MODEL].getDishes());
    this[VIEW].bindDishRandom(this.handleDishes);
    // CATEGORIAS
    this[VIEW].bindCategoryClicks(this.handleShowCategory);
  };

  //MÉTODO PARA MANEJAR LA SELECCIÓN DE UN PLATO Y MOSTRAR SU INFORMACIÓN EN LA VISTA
  handleDishes = (dataSet) => {
    const dish = this[MODEL].getDishByName(dataSet);
    this.selectedDish = dish;

    // TODO: y en categories sale: categories = getCategoryForDish {<suspended>¡}
    const categories = this[MODEL].getCategoryForDish(this.selectedDish);
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
    this[VIEW].bindDishInCategory(this.handleDishes);
  };

  // MÉTODO PARA MANEJAR LA SELECCIÓN DE UN MENÚ Y MOSTRAR EL MENÚ CORRESPONDIENTE
  handleShowMenu = (title) => {
    this.handleMenu;
    const menu = this[MODEL].getMenuByName(title);
    this[VIEW].showMenuDishes(menu.dishes, title);
    this[VIEW].bindDishInMenu(this.handleDishes);
  };

  // MÉTODO PARA MANEJAR LA SELECCIÓN DE UN ALÉRGENO Y MOSTRAR LOS PLATOS CON ESE ALÉRGENO
  handleShowAllergen = (title) => {
    this.handleAllergen;
    this[VIEW].showAllergenDishes(
      this[MODEL].getDishesWithAllergen(this[MODEL].getAllergenByName(title)),
      title
    );
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
  // createNewWindow(dish) {
  //   this[VIEW].createNewWindow(dish, categories);
  // }

  [LOAD_MANAGER_OBJECTS]() {
    // Creamos las categorías
    const category1 = this[MODEL].createCategory(
      "Entrantes",
      "Listado de platos para ir abriendo boca"
    );

    const category2 = this[MODEL].createCategory(
      "Platos Principales",
      "Listado de platos principales, para disfrutar después de los entrantes"
    );

    const category3 = this[MODEL].createCategory(
      "Postres",
      "Listado de postres caseros"
    );

    // Añadimos las categorías
    this[MODEL].addCategory(category1, category2, category3);

    // Creamos los platos
    // PLATOS PRINCIPALES
    let dish1 = this[MODEL].createDish(
      "Batata Fries",
      "Crujientes y doradas, servidas con nuestra salsa especial.",
      ["Batata", "Salsa especial"],
      "entrante01.webp"
    );

    let dish2 = this[MODEL].createDish(
      "The Mad Tequeños",
      "Deliciosos palitos rellenos de queso y acompañados de una salsa casera.",
      ["Queso", "Harina", "Salsa casera"],
      "entrante02.webp"
    );

    let dish3 = this[MODEL].createDish(
      "Crunchy Chick'n Nuggets",
      "Heura rebozada con panko, con un toque crujiente, servidas con nuestra salsa especial.",
      ["Heura", "Panko", "Salsa Especial"],
      "entrante03.webp"
    );

    let dish4 = this[MODEL].createDish(
      "Calamares Rebozados",
      "Nuestros increíbles calamares rebozados en tempura y acompañados de vegan mayo y limón.",
      ["Calamares", "Tempura", "Vegan Mayo", "limón"],
      "entrante04.webp"
    );

    let dish5 = this[MODEL].createDish(
      "Berlin Vegan Wurst",
      "Patatas, salchicha vegana berlinesa, cebolla pochada, vegan mayo y salsa casera Currywurst.",
      [
        "Patatas",
        "Salchicha Vegana",
        "Cebolla",
        "Vegan Mayo",
        "Salsa CurryWurst",
      ],
      "entrante05.webp"
    );

    // PLATOS PRINCIPALES
    let dish6 = this[MODEL].createDish(
      "Original Mad Burger",
      "Burger vegana con lechuga, tomate, cebolla morada, pepinillos, salsa especial y queso cheddar fundido.",
      [
        "Pan",
        "Burger Vegana",
        "Lechuga",
        "Tomate",
        "Cebolla Morada",
        "Pepinillos",
        "Salsa Especial",
        "Queso Cheddar",
      ],
      "principal01.webp"
    );

    let dish7 = this[MODEL].createDish(
      "The Mad Signature",
      "Nuestra burger insignia con lechuga, tomate, cebolla morada, pepinillos y nuestra salsa MAD.",
      [
        "Pan",
        "Burger Vegana",
        "Lechuga",
        "Tomate",
        "Cebolla Morada",
        "Pepinillos",
        "Salsa MAD",
      ],
      "principal02.webp"
    );
    let dish8 = this[MODEL].createDish(
      "Dirty Philly",
      "Extra de jugosidad! Beyond Meat, queso parrillero XL, lechuga, tomate, pepinillos, cebolla caramelizada y salsa Hosin.",
      [
        "Pan",
        "Beyond Meat",
        "Queso Parrillero XL",
        "Lechuga",
        "Tomate",
        "Pepinillos",
        "Cebolla Caramelizada",
        "Salsa Hosin",
      ],
      "principal03.webp"
    );
    let dish9 = this[MODEL].createDish(
      "Double Cheese Bacon",
      "Nuestra perfecta combinación con Burger de Heura, doble queso cheddar fundido, Bacon, lechuga, tomate, pepinillos, cebolla roja y salsa Sweet Chilli Ahumada.",
      [
        "Pan",
        "Burger de Heura",
        "Doble Queso Cheddar",
        "Vacon",
        "Lechuga",
        "Tomate",
        "Pepinillos",
        "Cebolla Roja",
        "Salsa Sweet Chilli Ahumada",
      ],
      "principal04.webp"
    );
    let dish10 = this[MODEL].createDish(
      "Rock'n Chick'n",
      "Crunchy chick'n burger, lechuga, tomate, pepinillos, mix de col rallada y crujiente, queso cheddar fundido, vegan mayo y salsa MAD.",
      [
        "Pan",
        "Crunchy Chick'n",
        "Lechuga",
        "Tomate",
        "Pepinillos",
        "Mix de Col",
        "Queso Cheddar",
        "Vegan Mayo",
        "Salsa MAD",
      ],
      "principal05.webp"
    );
    let dish11 = this[MODEL].createDish(
      "The Mad Club Sandwich",
      "El legendario pollo club sandwich. ¡Ahora también en vegano! Heura 'chick'n' a grill, lechuga, tomate, cebolla caramelizada, vegan bacon, queso cheddar derretido y nuestra salsa especial. Con ensalada coleslaw y patatas.",
      [
        "Pan",
        "Heura 'chick'n'",
        "Lechuga",
        "Tomate",
        "Cebolla Caramelizada",
        "Vegan Bacon",
        "Queso Cheddar",
        "Salsa Especial",
        "Ensalada Coleslaw",
        "Patatas",
      ],
      "principal06.webp"
    );
    let dish12 = this[MODEL].createDish(
      "Los originales del Mad",
      "Tres tortillas de maíz artesanales rellenas de picadillo no de carne o Beyond Ground beef, salsa de Jalisco, pimientos a la plancha, cebolla morada, guacamole fresco y nuestra salsa MAD y queso fundido.",
      [
        "Tortillas de Maíz",
        "Picadillo no de Carne",
        "Salsa de Jalisco",
        "Pimientos",
        "Cebolla Morada",
        "Guacamole",
        "Salsa MAD",
        "Queso Fundido",
      ],
      "principal07.webp"
    );
    let dish13 = this[MODEL].createDish(
      "Los chingones de TV",
      "Tres tortillas de maíz artesanales rellenas con heura picante, queso fundido, guacamole fresco, cebolla caramelizada, nuestra crema agria y jalapeños encurtidos. Para los amantes de lo picante.",
      [
        "Tortillas de Maíz",
        "Heura Picante",
        "Queso Fundido",
        "Guacamole Fresco",
        "Cebolla Caramelizada",
        "Crema Agria",
        "Jalapeños Encurtidos",
      ],
      "principal08.webp"
    );

    // POSTRES - ME FALTAN POR AÑADIR 1
    let dish14 = this[MODEL].createDish(
      "Cookies & Cream",
      "Deliciosa crema de queso vegano casera con una base y topping de cookies con trozos de chocolate.",
      ["Crema de Queso Vegano", "Cookies", "Trozos de Chocolate"],
      "postre01.webp"
    );
    let dish15 = this[MODEL].createDish(
      "Tiramisú",
      "Tiramisú italiano con nuestro café ecologico 100% arábica, mascarpone plant-based y cacao puro.",
      ["Café Ecológico 100% Arábica", "Mascarpone Plant-Based", "Cacao Puro"],
      "postre02.webp"
    );
    let dish16 = this[MODEL].createDish(
      "American Brownie",
      "Brownie con trozos de chocolate derretido, acompañado de helado de vainilla, pepitas de chocolate y una cobertura de nueces.",
      [
        "Brownie",
        "Chocolate Derretido",
        "Helado de Vainilla",
        "Pepitas de Chocolate",
        "Nueces",
      ],
      "postre03.webp"
    );

    let dish17 = this[MODEL].createDish(
      "Tarta de Zanahoria",
      "Tarta de zanahoria frescas, especias aromáticas y coronado con un glaseado cremoso.",
      ["Harina", "Zanahoria", "Nuez moscada", "Nueces", "Huevo"],
      "postre04.webp"
    );

    this[MODEL].addDish(
      dish1,
      dish2,
      dish3,
      dish4,
      dish5,
      dish6,
      dish7,
      dish8,
      dish9,
      dish10,
      dish11,
      dish12,
      dish13,
      dish14,
      dish15,
      dish16,
      dish17
    );
    console.log(
      "Platos en la base de datos:",
      this[MODEL].getDishByName("Tarta de Zanahoria")
    );

    // Asignamos los platos a sus categorías
    // Platos a entrantes
    this[MODEL].assignCategoryToDish(category1, dish1);
    this[MODEL].assignCategoryToDish(category1, dish2);
    this[MODEL].assignCategoryToDish(category1, dish3);
    this[MODEL].assignCategoryToDish(category1, dish4);
    this[MODEL].assignCategoryToDish(category1, dish5);

    // Platos a platosPrincipales
    this[MODEL].assignCategoryToDish(category2, dish6);
    this[MODEL].assignCategoryToDish(category2, dish7);
    this[MODEL].assignCategoryToDish(category2, dish8);
    this[MODEL].assignCategoryToDish(category2, dish9);
    this[MODEL].assignCategoryToDish(category2, dish10);
    this[MODEL].assignCategoryToDish(category2, dish11);
    this[MODEL].assignCategoryToDish(category2, dish12);
    this[MODEL].assignCategoryToDish(category2, dish13);

    // Platos a postres
    this[MODEL].assignCategoryToDish(category3, dish14);
    this[MODEL].assignCategoryToDish(category3, dish15);
    this[MODEL].assignCategoryToDish(category3, dish16);
    this[MODEL].assignCategoryToDish(category3, dish17);

    // Creamos los alergenos
    let allergen1 = this[MODEL].createAllergen(
      "Gluten",
      "Contiene trazas de trigo."
    );

    let allergen2 = this[MODEL].createAllergen("Lactosa", "Contiene lactosa.");
    let allergen3 = this[MODEL].createAllergen(
      "Frutos Secos",
      "Contiene trazas de frutos secos."
    );
    let allergen4 = this[MODEL].createAllergen("Soja", "Contiene soja.");

    this[MODEL].addAllergen(allergen1, allergen2, allergen3);

    // Asignamos los alergenos a sus platos
    //Alergeno GLUTEN
    this[MODEL].assignAllergenToDish(dish2, allergen1);
    this[MODEL].assignAllergenToDish(dish3, allergen1);
    this[MODEL].assignAllergenToDish(dish4, allergen1);
    this[MODEL].assignAllergenToDish(dish5, allergen1);
    this[MODEL].assignAllergenToDish(dish6, allergen1);
    this[MODEL].assignAllergenToDish(dish7, allergen1);
    this[MODEL].assignAllergenToDish(dish8, allergen1);
    this[MODEL].assignAllergenToDish(dish9, allergen1);
    this[MODEL].assignAllergenToDish(dish10, allergen1);
    this[MODEL].assignAllergenToDish(dish11, allergen1);
    this[MODEL].assignAllergenToDish(dish12, allergen1);
    this[MODEL].assignAllergenToDish(dish13, allergen1);
    this[MODEL].assignAllergenToDish(dish14, allergen1);
    this[MODEL].assignAllergenToDish(dish15, allergen1);
    this[MODEL].assignAllergenToDish(dish16, allergen1);
    this[MODEL].assignAllergenToDish(dish17, allergen1);

    //Alergeno LACTOSA
    this[MODEL].assignAllergenToDish(dish2, allergen2);
    this[MODEL].assignAllergenToDish(dish6, allergen2);
    this[MODEL].assignAllergenToDish(dish8, allergen2);
    this[MODEL].assignAllergenToDish(dish9, allergen2);
    this[MODEL].assignAllergenToDish(dish10, allergen2);
    this[MODEL].assignAllergenToDish(dish11, allergen2);
    this[MODEL].assignAllergenToDish(dish12, allergen2);
    this[MODEL].assignAllergenToDish(dish13, allergen2);
    this[MODEL].assignAllergenToDish(dish15, allergen2);

    // Alergeno FRUTOS SECOS
    this[MODEL].assignAllergenToDish(dish16, allergen4);
    this[MODEL].assignAllergenToDish(dish17, allergen4);

    // Alergeno SOJA
    this[MODEL].assignAllergenToDish(dish3, allergen3);
    this[MODEL].assignAllergenToDish(dish4, allergen3);
    this[MODEL].assignAllergenToDish(dish5, allergen3);
    this[MODEL].assignAllergenToDish(dish6, allergen3);
    this[MODEL].assignAllergenToDish(dish9, allergen3);
    this[MODEL].assignAllergenToDish(dish10, allergen3);
    this[MODEL].assignAllergenToDish(dish13, allergen3);

    // Creamos los menús
    let menu1 = this[MODEL].createMenu(
      "Día",
      "Menú compuesto por un entrante, un plato principal y un postre"
    );

    let menu2 = this[MODEL].createMenu(
      "Parejas",
      "Menú compuesto por un entrante, dos platos principales y un postre"
    );

    let menu3 = this[MODEL].createMenu(
      "Infantil",
      "Menú compuesto por un entrante, plato principal y un helado"
    );

    this[MODEL].addMenu(menu1, menu2, menu3);

    // Asignamos los platos a sus menús
    // Menu Día sus platos
    this[MODEL].assignDishToMenu(menu1, dish1);
    this[MODEL].assignDishToMenu(menu1, dish6);
    this[MODEL].assignDishToMenu(menu1, dish15);

    // Menú pareja sus platos
    this[MODEL].assignDishToMenu(menu2, dish1);
    this[MODEL].assignDishToMenu(menu2, dish9);
    this[MODEL].assignDishToMenu(menu2, dish10);
    this[MODEL].assignDishToMenu(menu2, dish15);

    // Menú infantil sus platos
    this[MODEL].assignDishToMenu(menu3, dish3);
    this[MODEL].assignDishToMenu(menu3, dish11);
    this[MODEL].assignDishToMenu(menu3, dish16);

    // Creamos las coordenadas y los restaurantes
    // COORDENADAS
    let ciudadReal = new Coordinate("38.9861", "3.9273");
    let madrid = new Coordinate("40.4167", "3.7036");
    let valencia = new Coordinate("39.4697", "-0.3763");

    // Añadimos los restaurantes
    let restaurant1 = this[MODEL].createRestaurant(
      "Ciudad Real",
      "Restaurante Vegan Kitchen en la plaza mayor de Ciudad Real",
      ciudadReal
    );

    let restaurant2 = this[MODEL].createRestaurant(
      "Madrid",
      "Restaurante Vegan Kitchen en la plaza España de Madrid",
      madrid
    );

    let restaurant3 = this[MODEL].createRestaurant(
      "Valencia",
      "Restaurante Vegan Kitchen en la plaza de la Reina de Valencia",
      valencia
    );

    // Añadimos los restaurantes
    this[MODEL].addRestaurant(restaurant1);
    this[MODEL].addRestaurant(restaurant2);
    this[MODEL].addRestaurant(restaurant3);
  }

  getDish(dish) {
    return this[MODEL].getDish(dish);
  }

  getCategoryForDish(dish) {
    return this[MODEL].getCategoryForDish(dish);
  }
}
export default RestaurantController;
