import Coordinate from "../Models/objectRestaurant";
const MODEL = Symbol("restaurantModel"); //
const VIEW = Symbol("restaurantView");
const LOAD_MANAGER_OBJECTS = Symbol("Load Manager Objects");

class RestaurantController {
  constructor(modelRestaurant, viewRestaurant) {
    this[MODEL] = modelRestaurant;
    this[VIEW] = viewRestaurant;

    // Eventos iniciales del Controlador
    this.onLoad();
    this.onInit();

    // Enlazamos handlers con la vista
    this[VIEW].bindInit(this.handleInit);
  }

  onLoad = () => {
    this[LOAD_MANAGER_OBJECTS]();
    this[VIEW].mouseenterCategories(this.handleDropCat);
    this[VIEW].mouseleaveCategories();
    this[VIEW].bindCategoryDrop(this.handleShowCategory);
    this[VIEW].mouseenterRestaurants(this.handleDropRest);
    this[VIEW].mouseleaveRestaurants();
    this[VIEW].bindRestaurantDrop(this.handleShowCategory);
    this[VIEW].bindMenu(this.handleMenu);
    this[VIEW].bindCategoryNav(this.handleCategories);
    this[VIEW].bindAllergen(this.handleAllergen);
    this[VIEW].bindRestaurant(this.handleRestaurant);
  };

  onInit = () => {
    this[VIEW].init();
    this[VIEW].ShowRandomDishes(this[MODEL].getDishes());
    this[VIEW].bindSingleCategory(this.handleShowCategory);
    this[VIEW].bindDishRandom(this.handleDishes);
  };

  onMenu = () => {
    this[VIEW].ShowMenus(this[MODEL].getMenus());
    this[VIEW].bindSingleMenu(this.handleShowMenu);
  };

  onCategory = () => {
    this[VIEW].ShowCategories(this[MODEL].getCategories());
    this[VIEW].bindSingleCategory(this.handleShowCategory);
  };

  onAllergen = () => {
    this[VIEW].ShowAllergens(this[MODEL].getAllergens());
    this[VIEW].bindSingleAllergen(this.handleShowAllergen);
  };

  onRestaurant = () => {
    this[VIEW].ShowRestaurants(this[MODEL].getRestaurants());
    this[VIEW].bindSingleRestaurant(this.handleShowRestaurant);
  };

  handleInit = () => {
    this.onInit();
  };

  handleDropCat = () => {
    this[VIEW].DropdownCategories(this[MODEL].getCategories());
  };

  handleDropRest = () => {
    this[VIEW].DropdownRestaurants(this[MODEL].getRestaurants());
  };

  handleMenu = () => {
    this.onMenu();
  };

  handleCategories = () => {
    this.onCategory();
  };

  handleDishes = (title) => {
    const dish = this[MODEL].createDish(title);
    this[VIEW].showInfoDish(dish);
  };

  handleAllergen = () => {
    this.onAllergen();
  };

  handleRestaurant = () => {
    this.onRestaurant();
  };

  handleShowMenu = (title) => {
    this[VIEW].showInfoMenu(this[MODEL].createMenu(title));
  };

  handleShowCategory = (title) => {
    this.handleCategories;
    const cat = this[MODEL].createCategory(title);
    this[VIEW].dishesInCategory(this[MODEL].getDishesInCategory(cat), cat.name);
    this[VIEW].bindDishInCategory(this.handleDishes);
  };

  handleShowAllergen = (title) => {
    const al = this[MODEL].createAllergen(title);
    const dishes = this[MODEL].getDishesWithAllergen(al);
    this[VIEW].showInfoAllergen(al, dishes);
  };

  handleShowRestaurant = (title) => {
    const r = this[MODEL].createRestaurant(title);
    this[VIEW].showInfoRestaurant(r);
  };

  [LOAD_MANAGER_OBJECTS]() {
    // Creamos las categorías
    const entrantes = this[MODEL].createCategory("Entrantes");
    const principales = this[MODEL].createCategory("Platos Principales");
    const postres = this[MODEL].createCategory("Postres");

    // Le añadimos una descripción a cada categoría
    category1.description = "Listado de platos para ir abriendo boca";
    category2.description =
      "Listado de platos principales, para disfrutar después de los entrantes";
    category3.description = "Listado de postres caseros";

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
      "Tarta de zanahoria frescas, espeicas aromáticas y coronado con un glaseado cremoso.",
      ["Harina", "Zanahoria", "Nuez moscada", "Nueces", "Huevo"],
      "postre04.webp"
    );

    // Asignamos los platos a sus categorías
    // Platos a entrantes
    this[MODEL].assignCategoryToDish(entrantes, dish1);
    this[MODEL].assignCategoryToDish(entrantes, dish2);
    this[MODEL].assignCategoryToDish(entrantes, dish3);
    this[MODEL].assignCategoryToDish(entrantes, dish4);
    this[MODEL].assignCategoryToDish(entrantes, dish5);

    // Platos a platosPrincipales
    this[MODEL].assignCategoryToDish(principales, dish6);
    this[MODEL].assignCategoryToDish(principales, dish7);
    this[MODEL].assignCategoryToDish(principales, dish8);
    this[MODEL].assignCategoryToDish(principales, dish9);
    this[MODEL].assignCategoryToDish(principales, dish10);
    this[MODEL].assignCategoryToDish(principales, dish11);
    this[MODEL].assignCategoryToDish(principales, dish12);
    this[MODEL].assignCategoryToDish(principales, dish13);

    // Platos a postres
    this[MODEL].assignCategoryToDish(postres, dish14);
    this[MODEL].assignCategoryToDish(postres, dish15);
    this[MODEL].assignCategoryToDish(postres, dish16);
    this[MODEL].assignCategoryToDish(postres, dish17);

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

    // Asignamos los alergenos a sus platos
    //Alergeno GLUTEN
    this[MODEL].assignAllergenToDish(allergen1, dish2);
    this[MODEL].assignAllergenToDish(allergen1, dish3);
    this[MODEL].assignAllergenToDish(allergen1, dish4);
    this[MODEL].assignAllergenToDish(allergen1, dish5);
    this[MODEL].assignAllergenToDish(allergen1, dish6);
    this[MODEL].assignAllergenToDish(allergen1, dish7);
    this[MODEL].assignAllergenToDish(allergen1, dish8);
    this[MODEL].assignAllergenToDish(allergen1, dish9);
    this[MODEL].assignAllergenToDish(allergen1, dish10);
    this[MODEL].assignAllergenToDish(allergen1, dish11);
    this[MODEL].assignAllergenToDish(allergen1, dish12);
    this[MODEL].assignAllergenToDish(allergen1, dish13);
    this[MODEL].assignAllergenToDish(allergen1, dish14);
    this[MODEL].assignAllergenToDish(allergen1, dish16);
    this[MODEL].assignAllergenToDish(allergen1, dish17);

    //Alergeno LACTOSA
    this[MODEL].assignAllergenToDish(allergen2, dish2);
    this[MODEL].assignAllergenToDish(allergen2, dish6);
    this[MODEL].assignAllergenToDish(allergen2, dish8);
    this[MODEL].assignAllergenToDish(allergen2, dish9);
    this[MODEL].assignAllergenToDish(allergen2, dish10);
    this[MODEL].assignAllergenToDish(allergen2, dish11);
    this[MODEL].assignAllergenToDish(allergen2, dish12);
    this[MODEL].assignAllergenToDish(allergen2, dish13);

    // Alergeno FRUTOS SECOS
    this[MODEL].assignAllergenToDish(allergen4, dish16);
    this[MODEL].assignAllergenToDish(allergen4, dish17);

    // Alergeno SOJA
    this[MODEL].assignAllergenToDish(allergen3, dish3);
    this[MODEL].assignAllergenToDish(allergen3, dish4);
    this[MODEL].assignAllergenToDish(allergen3, dish5);
    this[MODEL].assignAllergenToDish(allergen3, dish6);
    this[MODEL].assignAllergenToDish(allergen3, dish9);
    this[MODEL].assignAllergenToDish(allergen3, dish10);
    this[MODEL].assignAllergenToDish(allergen3, dish11);

    // Creamos los menús

    // Asignamos los platos a sus menús

    // Creamos las coordenadas y los restaurantes

    // Añadimos los restaurantes
  }
}
export default RestaurantController;
