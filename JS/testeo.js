import {
  Dish,
  Category,
  Allergen,
  Restaurant,
  Menu,
  Coordinate,
} from "./Models/objectRestaurant.js";
import RestaurantsManager from "./Models/restaurantModel.js";

//TESTEO DISH
function testeoDish() {
  console.log("---------- TESTEO DISH ----------");
  // Dish correcto
  const dish1 = new Dish(
    "Batata Fries",
    "Crujientes y doradas, servidas con nuestra salsa especial.",
    ["Batata", "Salsa especial"],
    "entrante01.webp"
  );
  // Prueba 1: Mostramos el nombre
  console.log("Test 1: Nombre");
  console.log("Esperado: Batata Fries");
  console.log("Resultado:", dish1.name);

  // Prueba 2: Mostramos la descripción
  console.log("Test 2: Descripción");
  console.log(
    "Esperado: Crujientes y doradas, servidas con nuestra salsa especial."
  );
  console.log("Resultado:", dish1.description);

  // Prueba 3: Mostramos los ingredientes
  console.log("Test 3: Ingredientes");
  console.log("Esperado: ['Batata', 'Salsa especial']");
  console.log("Resultado:", dish1.ingredients);

  // Prueba 4: Mostramos la "imagen"
  console.log("Test 4: Imagen");
  console.log("Esperado: entrante01.webp");
  console.log("Resultado:", dish1.image);

  // Prueba 5: Mostramos el toString
  console.log("Test 5: ToString");
  console.log(
    "Esperado: Batata Fries - Crujientes y doradas, servidas con nuestra salsa especial. - Batata,Salsa especial - entrante01.webp"
  );
  console.log("Resultado:", dish1.toString());

  //Error: Name es Null
  try {
    const dish2 = new Dish(
      null,
      "Heura rebozada con panko, con un toque crujiente, servidas con nuestra salsa especial.",
      ["Heura", "Panko", "Salsa Especial"],
      "entrante03.webp"
    );

    // Prueba 6: Mostramos la excepción
    console.log("Test 6: Nombre null");
    console.log("Esperado: Error, hay una excepción");
    console.log("Resultado:", dish2.name);
  } catch (error) {
    console.error(error);
  }
}

function testeoCategory() {
  console.log("");
  console.log("---------- TESTEO CATEGORY ----------");

  const category1 = new Category(
    "Entrantes",
    "Listado de platos para ir abriendo el apetito"
  );

  // Prueba 1: Mostramos el nombre
  console.log("Test 1: Nombre");
  console.log("Esperado: Entrantes");
  console.log("Resultado:", category1.name);

  //   Prueba 2: Mostramos la descripción
  console.log("Test 2: Descripción");
  console.log("Esperado: Listado de platos para ir abriendo el apetito");
  console.log("Resultado:", category1.description);

  //   Prueba 3: Mostramos el ToString
  console.log("Test 3: ToString");
  console.log(
    "Esperado: Entrantes - Listado de platos para ir abriendo el apetito"
  );
  console.log("Resultado:", category1.toString());

  //Error: Name es Null
  try {
    const category2 = new Category(
      null,
      "Listado de platos principales, para disfrutar después de los entrantes"
    );
    // Prueba 4: Mostramos la excepción
    console.log("Test 4: Nombre null");
    console.log("Esperado: Error, hay una excepción");
    console.log("Resultado:", category2.name);
  } catch (error) {
    console.error(error);
  }
}

function testeoAllergen() {
  console.log("");
  console.log("---------- TESTEO ALLERGEN ----------");

  const allergen1 = new Allergen("Gluten", "Contiene trazas de trigo.");

  // Prueba 1: Mostramos el nombre
  console.log("Test 1: Nombre");
  console.log("Esperado: Gluten");
  console.log("Resultado:", allergen1.name);

  //   Prueba 2: Mostramos la descripción
  console.log("Test 2: Descripción");
  console.log("Esperado: Contiene trazas de trigo.");
  console.log("Resultado:", allergen1.description);

  //   Prueba 3: Mostramos el ToString
  console.log("Test 3: ToString");
  console.log("Esperado: Gluten - Contiene trazas de trigo.");
  console.log("Resultado:", allergen1.toString());

  //   DUDA PORQUE AQUÍ EN CONSOLA NO ME SALE EN ROJO
  //Error: Name es Null
  try {
    const allergen2 = new Allergen(null, "Contiene lactosa.");
    // Prueba 4: Mostramos la excepción
    console.log("Test 4: Nombre null");
    console.log("Esperado: Error, hay una excepción");
    console.log("Resultado:", allergen2.name);
  } catch (error) {
    console.log(error);
  }
}

function testeoRestaurante() {
  console.log("");
  console.log("---------- TESTEO RESTAURANTE - MENÚ  ----------");
  const menu1 = new Menu(
    "Día",
    "Menú compuesto por un entrante, un plato principal y un postre."
  );

  // Prueba 1: Mostramos el nombre
  console.log("Test 1: Nombre");
  console.log("Esperado: Día");
  console.log("Resultado:", menu1.name);

  //   Prueba 2: Mostramos la descripción
  console.log("Test 2: Descripción");
  console.log(
    "Esperado: Menú compuesto por un entrante, un plato principal y un postre."
  );
  console.log("Resultado:", menu1.description);

  //   Prueba 3: Mostramos el ToString
  console.log("Test 3: ToString");
  console.log(
    "Esperado: Día - Menú compuesto por un entrante, un plato principal y un postre."
  );
  console.log("Resultado:", menu1.toString());

  //Error: Name es Null
  try {
    const menu2 = new Menu(
      null,
      "Menú compuesto por un entrante, dos platos principales y un postre."
    );
    // Prueba 4: Mostramos la excepción
    console.log("Test 4: Nombre null");
    console.log("Esperado: Error, hay una excepción");
  } catch (error) {
    console.log(error);
  }

  console.log("");
  console.log("---------- TESTEO RESTAURANTE - RESTAURANTE  ----------");

  const location1 = new Coordinate(38.9861, -3.9273);
  const restaurante1 = new Restaurant(
    "Ciudad Real",
    "Restaurante Vegan Kitchen en la plaza mayor de Ciudad Real",
    location1
  );
  // Prueba 1: Mostramos el nombre
  console.log("Test 1: Nombre");
  console.log("Esperado: Ciudad Real");
  console.log("Resultado:", restaurante1.name);

  //   Prueba 2: Mostramos la descripción
  console.log("Test 2: Descripción");
  console.log(
    "Esperado: Restaurante Vegan Kitchen en la plaza mayor de Ciudad Real"
  );
  console.log("Resultado:", restaurante1.description);

  //   Prueba 3: Mostramos la coordenadas
  console.log("Test 3: Coordenadas");
  console.log("Esperado: 38.9861, -3.9273");
  console.log(
    "Resultado:",
    `${restaurante1.location.latitude}, ${restaurante1.location.longitude}`
  );

  //   Prueba 4: Mostramos el ToString
  console.log("Test 3: ToString");
  console.log(
    "Esperado: Ciudad Real - Restaurante Vegan Kitchen en la plaza mayor de Ciudad Real - 38.9861, -3.9273"
  );
  console.log("Resultado:", restaurante1.toString());

  //Error: Name es Null
  try {
    const location2 = new Coordinate(40.4167, 3.7036);
    const restaurante2 = new Restaurant(
      null,
      "Restaurante Vegan Kitchen en la plaza España de Madrid",
      location2
    );
    console.log("Test 5: Nombre null");
    console.log("Esperado: Error, excepción");
    console.log("Resultado:", restaurante2.name);
  } catch (error) {
    console.log(error);
  }

  console.log("");
  console.log("---------- TESTEO RESTAURANTE - Coordinate ----------");

  const coordinate1 = new Coordinate(40.4167, -3.7036);
  // Prueba 1: Mostramos la latitud
  console.log("Test 1: Latitud");
  console.log("Esperado: 40.4167");
  console.log("Resultado: ", coordinate1.latitude);

  // Prueba 2: Mostramos la longitud
  console.log("Test 2: Longitud");
  console.log("Esperado: -3.7036");
  console.log("Resultado: ", coordinate1.longitude);

  // Prueba 3: Mostramos el ToString
  console.log("Test 3: ToString");
  console.log("Esperado: 40.4167, -3.7036");
  console.log("Resultado: ", coordinate1.toString());

  try {
  } catch (error) {
    console.log(error);
  }
}

function testeoRestaurantsManager() {
  console.log("");
  console.log("---------- TESTEO RESTAURANTS MANAGER ----------");
  const manager = RestaurantsManager.getInstance();

  console.log("");
  console.log("---------- TESTEO CATEGORÍA ----------");
  const category1 = new Category(
    "Entrantes",
    "Listado de platos para ir abriendo boca"
  );
  const category2 = new Category(
    "Platos Principales",
    "Listado de platos principales, para disfrutar después de los entrantes"
  );
  const category3 = new Category("Postres", "Listado de postres caseros");

  // AÑADIMOS CAGETORÍA
  console.log("TEST 1: Añadiendo Categoría");
  console.log("Añadiendo categorías al manager...");
  console.log("category1 (Entrantes):", category1);
  console.log("category2 (Principales):", category2);
  console.log("category3 (Postres):", category3);

  try {
    manager.addCategory(category1, category2, category3);
    console.log("Categorías añadidas con éxito");
  } catch (error) {
    console.error("Error al añadir categorías:", error);
  }

  // Imprimimos las categorías usando el ITERADOR
  console.log("Iterador de Categorías - Después de añadir");
  for (const category of manager.categories) {
    console.log(category.toString());
  }
  console.log("");
  console.log("TEST 2: Eliminando Categoría");
  // ELIMINAMOS UNA CATEGORÍA
  console.log("Eliminando categoría...");
  try {
    manager.removeCategory(category1);
    console.log("Categoría eliminada con éxito");
  } catch (error) {
    console.error("Error al eliminar categoría:");
    console.log(error);
  }

  // Imprimimos las categorías usando el ITERADOR, después de eliminar
  console.log("Iterador de Categorías - Después de eliminar");
  for (const category of manager.categories) {
    console.log(category.toString());
  }

  console.log("");
  console.log("TEST 3: Name is Null");
  // AQUÍ HACEMOS AHORA PRUEBAS DE ERROR
  //ERROR: name es Null
  try {
    const category4 = new Category(null, "Categoría con nombre null");

    manager.addCategory(category4);
    console.log("Categorías añadidas con éxito");
  } catch (error) {
    console.log("Error al añadir categorías:");
    console.error(error);
  }

  console.log("");
  console.log("TEST 4: No es un Objeto Category");
  // ERROR: no es un objeto Category
  try {
    const category5 = new Menu("Sushi", "Categoría de plato principal");

    manager.addCategory(category5);
    console.log("Categorías añadidas con éxito");
  } catch (error) {
    console.error(error);
  }

  console.log("");
  console.log("TEST 5: Categoría ya existe");
  //ERROR: La categoría ya existe
  try {
    manager.addCategory(category2);
    console.log("Categorías añadidas con éxito");
  } catch (error) {
    console.log("Error al añadir categorías:");
    console.error(error);
  }

  console.log("");
  console.log("TEST 6: Categoría no esta registrada");
  //ERROR: La categoría no esta registrada
  try {
    const category6 = new Category(
      "segundos platos",
      "Categoría de segundos platos"
    );
    manager.removeCategory(category6);
    console.log("Categoría eliminada con éxito");
  } catch (error) {
    console.log("Error al eliminar categoría:");
    console.error(error);
  }

  console.log("");
  console.log("---------- TESTEO MENÚ ----------");
  const menu1 = new Menu(
    "Día",
    "Menú compuesto por un entrante, un plato principal y un postre"
  );
  const menu2 = new Menu(
    "Parejas",
    "Menú compuesto por un entrante, dos platos principales y un postre"
  );
  const menu3 = new Menu(
    "Infantil",
    "Menú compuesto por un entrante, plato principal y un helado"
  );

  // AÑADIMOS MENÚ
  console.log("TEST 1: Añadiendo Menú");
  console.log("Añadiendo menús al manager...");
  console.log("menu1:", menu1);
  console.log("menu2:", menu2);
  console.log("menu3:", menu3);

  try {
    manager.addMenu(menu1, menu2, menu3);
    console.log("Menús añadidos con éxito");
  } catch (error) {
    console.error("Error al añadir menú:", error);
  }

  // Imprimimos los menús usando el ITERADOR
  console.log("Iterador de Menús - Después de añadir");
  for (const menu of manager.menus) {
    console.log(menu.toString());
  }

  console.log("");
  console.log("TEST 2: Eliminando menú");
  // BORRAMOS UN MENÚ
  console.log("Eliminando menú...");
  try {
    manager.removeMenu(menu1);
    console.log("Menú eliminado con éxito");
  } catch (error) {
    console.error("Error al eliminar menú:");
    console.log(error);
  }

  // Imprimimos los menús usando el ITERADOR, después de eliminar
  console.log("Iterador de Menús - Después de eliminar");
  for (const menu of manager.menus) {
    console.log(menu.toString());
  }

  // AQUÍ HACEMOS AHORA PRUEBAS DE ERROR
  console.log("");
  console.log("TEST 3: Name is Null");
  //Error: Name es Null
  try {
    const menu5 = new Menu(null, "Menú especial navidad");

    manager.addMenu(menu5);
    console.log("Categorías añadidas con éxito");
  } catch (error) {
    console.log("Error al añadir menú:");
    console.error(error);
  }

  console.log("");
  console.log("TEST 4: No es un objeto Menú");
  // ERROR: no es un objeto Menu
  try {
    const menu5 = new Category("Entrante", "Categoría de entrantes");
    manager.addMenu(menu5);
    console.log("Menú añadidas con éxito");
  } catch (error) {
    console.log("Error al añadir menú:");
    console.error(error);
  }

  console.log("");
  console.log("TEST 5: Menú ya existe");
  //Error: La menú ya existe
  try {
    manager.addMenu(menu2);
    console.log("Menu añadidas con éxito");
  } catch (error) {
    console.log("Error al añadir Menu:");
    console.error(error);
  }

  console.log("");
  console.log("TEST 6: Menú no esta registrado");
  //ERROR: La menú no esta registrada
  try {
    const menu6 = new Menu("Menú 5", "Menú especial fería");
    manager.removeMenu(menu6);
    console.log("Menu eliminada con éxito");
  } catch (error) {
    console.log("Error al eliminar Menu:");
    console.error(error);
  }

  console.log("");
  console.log("---------- TESTEO ALLERGEN ----------");
  const allergen1 = new Allergen("Gluten", "Contiene trazas de trigo.");
  const allergen2 = new Allergen("Lactosa", "Contiene lactosa.");
  // AÑADIMOS ALLERGEN
  console.log("TEST 1: Añadiendo Allergen");
  console.log("Añadiendo alergenos al manager...");
  console.log("allergen1 (Gluten):", allergen1);
  console.log("allergen2 (Lactosa):", allergen2);
  try {
    manager.addAllergen(allergen1, allergen2);
    console.log("Alergenos añadidos con éxito");
  } catch (error) {
    console.error("Error al añadir Alergenos:", error);
  }

  // Imprimimos los menús usando el ITERADOR
  console.log("Iterador de Allergen - Después de añadir: ");
  for (const allergen of manager.allergens) {
    console.log(allergen.toString());
  }

  console.log("");
  console.log("TEST 2: Eliminando Alergeno");
  // BORRAMOS UN MENÚ
  console.log("Eliminando Alergeno...");
  try {
    manager.removeAllergen(allergen2);
    console.log("Alergeno eliminado con éxito");
  } catch (error) {
    console.error("Error al eliminar Alergeno:");
    console.log(error);
  }

  // Imprimimos los menús usando el ITERADOR, después de eliminar
  console.log("Iterador de Allergen - Después de eliminar: ");
  for (const allergen of manager.allergens) {
    console.log(allergen.toString());
  }

  // AQUÍ HACEMOS AHORA PRUEBAS DE ERROR
  console.log("");
  console.log("TEST 3: Name is Null");
  //Error: Name es Null
  try {
    const allergen3 = new Allergen(null, "Contiene trazas de frutos secos.");

    manager.addAllergen(allergen3);
    console.log("Alergeno añadidas con éxito");
  } catch (error) {
    console.log("Error al añadir Alergeno:");
    console.error(error);
  }

  console.log("");
  console.log("TEST 4: No es un objeto Alergeno");
  // ERROR: no es un objeto Allergen
  try {
    const allergen4 = new Category("Entrante", "Categoría de entrantes");
    manager.addAllergen(allergen4);
    console.log("Alergeno añadidas con éxito");
  } catch (error) {
    console.log("Error al añadir Alergeno:");
    console.error(error);
  }

  console.log("");
  console.log("TEST 5: Alergeno ya existe");
  //Error: Allergen ya existe
  try {
    manager.addAllergen(allergen1);
    console.log("Alergeno añadidas con éxito");
  } catch (error) {
    console.log("Error al añadir Alergeno:");
    console.error(error);
  }

  console.log("");
  console.log("TEST 6: Alergeno no esta registrado");
  //ERROR: Allergen no esta registrada
  try {
    const allergen5 = new Allergen("Soja", "Contiene soja.");
    manager.removeAllergen(allergen5);
    console.log("Allergen eliminado con éxito");
  } catch (error) {
    console.log("Error al eliminar Allergen:");
    console.log(error);
  }

  console.log("");
  console.log("---------- TESTEO DISH ----------");
  const dish1 = new Dish(
    "Batata Fries",
    "Crujientes y doradas, servidas con nuestra salsa especial.",
    ["Batata", "Salsa especial"],
    "entrante01.webp"
  );
  const dish2 = new Dish(
    "The Mad Tequeños",
    "Deliciosos palitos rellenos de queso y acompañados de una salsa casera.",
    ["Queso", "Harina", "Salsa casera"],
    "entrante02.webp"
  );

  // AÑADIMOS PLATO
  console.log("TEST 1: Añadiendo Plato");
  console.log("Añadiendo menús al manager...");
  console.log("plato1:", dish1);
  console.log("plato2:", dish2);

  try {
    manager.addDish(dish1, dish2);
    console.log(dish1.name, "y", dish2.name, "añadidos con éxito");
  } catch (error) {
    console.error("Error al añadir Plato:", error);
  }

  console.log("");
  console.log("TEST 2: Borrando Plato");
  // BORRAMOS PLATO
  console.log("Eliminando plato...");
  try {
    manager.removeDish(dish1);
    console.log(dish1.name, "eliminado con éxito");
  } catch (error) {
    console.error("Error al eliminar plato:");
    console.log(error);
  }

  // AQUÍ HACEMOS AHORA PRUEBAS DE ERROR
  console.log("");
  console.log("TEST 3: Name is null");
  try {
    const dish3 = new Dish(
      null,
      "Heura rebozada con panko, con un toque crujiente, servidas con nuestra salsa especial.",
      ["Heura", "Panko", "Salsa Especial"],
      "entrante03.webp"
    );

    manager.addDish(dish3);
    console.log("plato añadido con éxito");
  } catch (error) {
    console.log("Error al añadir plato:");
    console.error(error);
  }

  console.log("");
  console.log("TEST 4: No es un objeto Dish");
  try {
    const dish4 = new Allergen("Gluten", "Contiene gluten");
    manager.addDish(dish4);
    console.log("plato añadido con éxito");
  } catch (error) {
    console.log("Error al añadir plato:");
    console.error(error);
  }

  console.log("");
  console.log("TEST 5: Plato ya existe");
  try {
    manager.addDish(dish2);
    console.log("plato añadido con éxito");
  } catch (error) {
    console.log("Error al añadir plato:");
    console.error(error);
  }

  console.log("");
  console.log("TEST 6: plato no esta registrado");
  console.log("Eliminando plato...");
  try {
    const dish4 = new Dish(
      "Calamares Rebozados",
      "Nuestros increíbles calamares rebozados en tempura y acompañados de vegan mayo y limón.",
      ["Calamares", "Tempura", "Vegan Mayo", "limón"],
      "entrante04.webp"
    );

    manager.removeDish(dish4);
    console.log(dish4.name, "eliminado con éxito");
  } catch (error) {
    console.error("Error al eliminar plato:");
    console.log(error);
  }

  console.log("");
  console.log("---------- TESTEO RESTAURANT ----------");

  const location1 = new Coordinate("38.9861", "3.9273");
  const location2 = new Coordinate("40.4167", "3.7036");
  const location3 = new Coordinate("39.4697", "-0.3763");
  const restaurant1 = new Restaurant(
    "Ciudad Real",
    "Restaurante Vegan Kitchen en la plaza mayor de Ciudad Real",
    location1
  );

  const restaurant2 = new Restaurant(
    "Madrid",
    "Restaurante Vegan Kitchen en la plaza España de Madrid",
    location2
  );

  console.log("");
  console.log("TEST 1: añadiendo Restaurant");
  try {
    manager.addRestaurant(restaurant1, restaurant2);
    console.log("Restaurantes añadidos con éxito");
  } catch (error) {
    console.log("Error al añadir restaurantes:");
    console.log(error);
  }

  // Imprimimos las Restaurants usando el ITERADOR
  console.log("Iterador de Restaurantes - Después de añadir");
  for (const restaurant of manager.restaurants) {
    console.log(restaurant.toString());
  }

  console.log("");
  console.log("TEST 2: Eliminando Restaurant");
  // BORRAMOS UN RESTAURANTE
  console.log("Eliminando Restaurant...");
  try {
    manager.removeRestaurant(restaurant1);
    console.log("Restaurante eliminado con éxito");
  } catch (error) {
    console.error("Error al eliminar Restaurante:");
    console.log(error);
  }

  // Imprimimos las Restaurants usando el ITERADOR
  console.log("Iterador de Restaurantes - Después de borrar");
  for (const restaurant of manager.restaurants) {
    console.log(restaurant.toString());
  }

  // AQUÍ HACEMOS AHORA PRUEBAS DE ERROR
  console.log("");
  console.log("TEST 3: Name is Null");

  //Error: Name es Null
  try {
    const restaurant3 = new Restaurant(
      null,
      "Restaurante Vegan Kitchen en la plaza de la Reina de Valencia",
      location3
    );

    manager.addRestaurant(restaurant3);
    console.log("Restaurante añadido con éxito");
  } catch (error) {
    console.log("Error al añadir Restaurante:");
    console.error(error);
  }

  console.log("");
  console.log("TEST 4: No es un objeto Restaurant");
  // ERROR: no es un objeto Restaurant
  try {
    const restaurant4 = new Category("Entrante", "Categoría de entrantes");
    manager.addRestaurant(restaurant4);
    console.log("Restaurante añadido con éxito");
  } catch (error) {
    console.log("Error al añadir Restaurante:");
    console.error(error);
  }

  console.log("");
  console.log("TEST 5: Restaurant ya existe");
  //Error: Restaurant ya existe
  try {
    manager.addRestaurant(restaurant2);
    console.log("Restaurante añadido con éxito");
  } catch (error) {
    console.log("Error al añadir Restaurante:");
    console.error(error);
  }

  console.log("");
  console.log("TEST 6: Restaurant no esta registrado");
  //ERROR: Restaurant no esta registrada
  try {
    const restaurant5 = new Restaurant(
      "Valencia",
      "Restaurante Vegan Kitchen en la plaza de la Reina de Valencia",
      location3
    );

    manager.removeRestaurant(restaurant5);
    console.log("Restaurante eliminado con éxito");
  } catch (error) {
    console.log("Error al eliminar Restaurante:");
    console.log(error);
  }
}

function testeoAssignAndDesign() {
  const manager = RestaurantsManager.getInstance();

  const category1 = new Category(
    "Entrantes",
    "Listado de platos para ir abriendo el apetito"
  );
  const category2 = new Category(
    "Platos Principales",
    "Listado de platos principales, para disfrutar después de los entrantes"
  );
  const category3 = new Category("Postres", "Listado de postres caseros");

  const dish1 = new Dish(
    "Batata Fries",
    "Crujientes y doradas, servidas con nuestra salsa especial.",
    ["Batata", "Salsa especial"],
    "entrante01.webp"
  );

  const dish2 = new Dish(
    "The Mad Tequeños",
    "Deliciosos palitos rellenos de queso y acompañados de una salsa casera.",
    ["Queso", "Harina", "Salsa casera"],
    "entrante02.webp"
  );
  const dish3 = new Dish(
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
  const dish4 = new Dish(
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
  const dish5 = new Dish(
    "Cookies & Cream",
    "Deliciosa crema de queso vegano casera con una base y topping de cookies con trozos de chocolate.",
    ["Crema de Queso Vegano", "Cookies", "Trozos de Chocolate"],
    "postre01.webp"
  );
  console.log("");
  console.log("---------- TESTEO ASIGNACIÓN PLATO A CATEGORÍA  ----------");

  // Lo añadimos a Category
  console.log("Añadiendo categoría...");
  try {
    manager.addCategory(category1, category3);
    console.log("Categorías añadidas con éxito");
  } catch (error) {
    console.error("Error al añadir categorías:", error);
  }

  console.log("Iterador de Categorías - Después de añadir:");
  for (const category of manager.categories) {
    console.log(category.toString());
  }

  // Lo añadimos a Dish
  console.log("Añadiendo platos...");
  try {
    manager.addDish(dish1, dish2, dish3, dish4);
    console.log("Añadido con éxito:", dish1.toString());
    console.log("Añadido con éxito:", dish2.toString());
    console.log("Añadido con éxito:", dish3.toString());
    console.log("Añadido con éxito:", dish4.toString());
  } catch (error) {
    console.error("Error al añadir Plato:", error);
  }

  console.log("");
  console.log("TEST 1: Asignando plato a categoría");
  try {
    console.log(manager.getCategories());
    manager.assignCategoryToDish(category1, dish1, dish2);
    console.log(
      "Asignación exitosa:",
      category1.name,
      "tiene",
      dish1.name,
      "y",
      dish2.name
    );
  } catch (error) {
    console.error("Error en la asignación:", error);
  }

  // Objeto Category no existe, lo añadimos al sistema
  console.log("");
  console.log("TEST 2: Asignando plato a categoría - Categoría no existe");
  try {
    // console.log(manager.getCategories());
    manager.assignCategoryToDish(category2, dish3, dish4);
    console.log(
      "Asignación exitosa:",
      category2.name,
      "tiene",
      dish3.name,
      "y",
      dish4.name
    );
  } catch (error) {
    console.error("Error en la asignación:", error);
  }
  console.log("");
  console.log("Iterador de Categorías:");
  for (const category of manager.categories) {
    console.log(category.toString());
  }

  // Objeto Dish no existe, lo añadimos al sistema
  console.log("");
  console.log("TEST 3: Asignando plato a categoría - Plato no existe");
  try {
    // console.log(manager.getCategories());
    manager.assignCategoryToDish(category3, dish5);
    console.log("Asignación exitosa:", category3.name, "tiene", dish5.name);
  } catch (error) {
    console.error("Error en la asignación:", error);
  }

  // AQUÍ HACEMOS AHORA PRUEBAS DE ERROR
  console.log("");
  console.log("TEST 4: Category es null");
  // ERROR: Category es null
  try {
    manager.assignCategoryToDish(null, dish2);
  } catch (error) {
    console.error(error);
  }

  console.log("");
  console.log("TEST 5: Dish es null");
  try {
    manager.assignCategoryToDish(category2, null);
  } catch (error) {
    console.error(error);
  }

  console.log("");
  console.log("Iterador de Categorías - Comprobación de excepción:");
  for (const category of manager.categories) {
    console.log(category.toString());
  }

  console.log("");
  console.log("---------- TESTEO DESIGNACIÓN PLATO DE CATEGORÍA  ----------");
  console.log("TEST 5: Designar plato de categoría");
  console.log("Designando...");
  try {
    // console.log(manager.getCategories());
    manager.deassignCategoryToDish(category1, dish2);
    console.log(
      "Designación exitosa:",
      category1.name,
      "ya no tiene",
      dish1.name
    );
  } catch (error) {
    console.error("Error en la Designación:", error);
  }

  console.log("");
  console.log("TEST 6: Designar plato de categoría");
  console.log("Designando...");
  try {
    console.log(manager.getCategories());
    manager.deassignCategoryToDish(category2, dish4);
    console.log(
      "Designación exitosa:",
      category2.name,
      "ya no tiene",
      dish4.name
    );
  } catch (error) {
    console.error("Error en la Designación:", error);
  }

  // AQUÍ HACEMOS AHORA PRUEBAS DE ERROR
  console.log("");
  console.log("TEST 7: Categoría es null");
  try {
    manager.deassignCategoryToDish(null, dish5);
  } catch (error) {
    console.error(error);
  }

  console.log("");
  console.log("TEST 8: Categoría no esta registrada");
  // ERROR: Categoría no registrada
  try {
    const category4 = new Category(
      "pruebaError",
      "Descripción para la prueba error"
    );
    manager.deassignCategoryToDish(category4, dish5);
    console.log("Designación exitosa:", dish5.name, "->", category4.name);
  } catch (error) {
    console.error(error);
  }

  console.log("");
  console.log("TEST 8: Plato no esta registrada");
  // ERROR: Plato no registrado
  try {
    const dish6 = new Dish(
      "Double Cheese Bacon",
      "Nuestra perfecta combinación con Burger de Heura, doble queso cheddar fundido, Bacon, lechuga, tomate, pepinillos, cebolla roja y salsa Sweet Chilli Ahumada.",
      [
        "Pan",
        "Burger de Heura",
        "Doble Queso Cheddar",
        "Bacon",
        "Lechuga",
        "Tomate",
        "Pepinillos",
        "Cebolla Roja",
        "Salsa Sweet Chilli Ahumada",
      ],
      "principal04.webp"
    );
    manager.deassignCategoryToDish(category2, dish6);
    console.log("Designación exitosa:", dish6.name, "->", category2.name);
  } catch (error) {
    console.error(error);
  }

  console.log("");
  console.log("TEST 9: Plato no esta asignado a esa categoría");
  // ERROR: Designación de plato erroneo, es decir, que no esta en esa categoría.
  try {
    manager.deassignCategoryToDish(category1, dish3);
    console.log(
      "Designación exitosa:",
      category2.name,
      "ya no tiene",
      dish2.name
    );
  } catch (error) {
    console.error(error);
  }

  // Comprobamos el Iterador de Categorías
  console.log("");
  console.log("Iterador de Categorías - Comprobación después de excepción:");
  for (const category of manager.categories) {
    console.log(category.toString());
  }

  console.log("");
  console.log("---------- TESTEO ASIGNACIÓN ALERGENO A PLATO  ----------");

  const allergen1 = new Allergen("Gluten", "Contiene trazas de trigo.");
  const allergen2 = new Allergen("Lactosa", "Contiene lactosa.");
  const allergen3 = new Allergen(
    "Frutos Secos",
    "Contiene trazas de frutos secos."
  );
  const allergen4 = new Allergen("Soja", "Contiene soja.");

  const dish6 = new Dish(
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
  const dish7 = new Dish(
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

  const dish8 = new Dish(
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

  // Lo añadimos a Dish
  console.log("Añadiendo platos...");
  try {
    manager.addDish(dish6);
    console.log("Añadido con éxito:", dish6.name);
  } catch (error) {
    console.error("Error al añadir Plato:", error);
  }

  console.log("Añadiendo alergenos...");
  try {
    manager.addAllergen(allergen1, allergen2);
    console.log("Alergenos añadido con éxito");
  } catch (error) {
    console.error("Error al añadir alergeno:", error);
  }
  // Imprimimos los menús usando el ITERADOR
  console.log("Iterador de Allergen - Después de añadir: ");
  for (const allergen of manager.allergens) {
    console.log(allergen.toString());
  }

  console.log("");
  console.log("TEST 1: Asignando alergeno a plato");
  try {
    // console.log(manager.getDish());
    manager.assignAllergenToDish(dish6, allergen1, allergen2);
    console.log(
      "Asignación exitosa:",
      dish6.name,
      "Tiene de alergenos ->",
      allergen1.name,
      "y",
      allergen2.name
    );
  } catch (error) {
    console.error("Error en la asignación:", error);
  }

  // Objeto Dish no existe, lo añadimos al sistema
  console.log("");
  console.log("TEST 2: Asignando alergeno a plato - plato no existe");
  try {
    // console.log(manager.getDish());
    manager.assignAllergenToDish(dish7, allergen1);
    console.log(
      "Asignación exitosa:",
      dish7.name,
      "contiene alergeno:",
      allergen1.name
    );
  } catch (error) {
    console.error("Error en la asignación:", error);
  }

  // Objeto Dish no existe, lo añadimos al sistema
  console.log("");
  console.log("TEST 3: Asignando alergeno a plato - alergeno no existe");
  try {
    // console.log(manager.getDish());
    manager.assignAllergenToDish(dish8, allergen3, allergen2);
    console.log(
      "Asignación exitosa:",
      dish8.name,
      "Tiene de alergenos ->",
      allergen3.name,
      "y",
      allergen2.name
    );
  } catch (error) {
    console.error("Error en la asignación:", error);
  }

  // AQUÍ HACEMOS AHORA PRUEBAS DE ERROR
  console.log("");
  console.log("TEST 4: alergeno es null");
  // ERROR: Category es null
  try {
    manager.assignAllergenToDish(dish8, null);
  } catch (error) {
    console.error(error);
  }

  console.log("");
  console.log("TEST 5: plato es null");
  try {
    manager.assignAllergenToDish(null, allergen3);
  } catch (error) {
    console.error(error);
  }

  console.log("");
  console.log("---------- TESTEO DESIGNACIÓN ALERGENO DE PLATO  ----------");
  console.log("TEST 6: Designar alergeno de plato");
  console.log("Designando...");
  try {
    console.log(manager.getDish());
    manager.deassignAllergenToDish(dish6, allergen1);
    console.log(
      "Designación exitosa:",
      dish6.name,
      "ya no tiene",
      allergen1.name
    );
  } catch (error) {
    console.error("Error en la Designación:", error);
  }

  console.log("");
  console.log("TEST 7: Designar alergeno de plato");
  console.log("Designando...");
  try {
    // console.log(manager.getCategories());
    manager.deassignAllergenToDish(dish8, allergen3);
    console.log(
      "Designación exitosa:",
      dish8.name,
      "ya no tiene",
      allergen3.name
    );
  } catch (error) {
    console.error("Error en la Designación:", error);
  }

  // AQUÍ HACEMOS AHORA PRUEBAS DE ERROR
  console.log("");
  console.log("TEST 8: plato es null");
  try {
    manager.deassignAllergenToDish(null, allergen2);
  } catch (error) {
    console.error(error);
  }

  console.log("");
  console.log("TEST 9: Plato no esta registrada");
  // ERROR: plato no registrada
  try {
    const dish9 = new Dish(
      "Tarta de Zanahoria",
      "Tarta de zanahoria frescas, espeicas aromáticas y coronado con un glaseado cremoso.",
      ["Harina", "Zanahoria", "Nuez moscada", "Nueces", "Huevo"],
      "postre04.webp"
    );
    manager.deassignAllergenToDish(dish9, allergen2);
    console.log(
      "Designación exitosa:",
      dish9.name,
      "ya no tiene",
      allergen2.name
    );
  } catch (error) {
    console.error(error);
  }

  console.log("");
  console.log("TEST 10: Alergeno es nulo");
  // ERROR: alergeno es null
  try {
    manager.deassignAllergenToDish(dish8, null);
    // console.log("Designación exitosa:", dish11.name, "ya no tiene", category7.name);
  } catch (error) {
    console.error(error);
  }

  console.log("");
  console.log("TEST 11: Alergeno no esta registrada");
  // ERROR: alergeno no registrado
  try {
    manager.deassignAllergenToDish(dish3, allergen4);
    console.log(
      "Designación exitosa:",
      dish3.name,
      "ya no tiene",
      allergen3.name
    );
  } catch (error) {
    console.error(error);
  }

  console.log("");
  console.log("TEST 12: Alergeno no esta asignado a ese plato");
  // ERROR: Designación de alergeno erroneo, es decir, que no esta en esa categoría.
  try {
    manager.deassignAllergenToDish(dish3, allergen3);
    console.log(
      "Designación exitosa:",
      dish3.name,
      "ya no tiene",
      allergen2.name
    );
  } catch (error) {
    console.error(error);
  }

  // Comprobamos el Iterador de Alergenos
  console.log("");
  console.log("Iterador de Alergenos - Comprobación después de excepción:");
  for (const allergen of manager.allergens) {
    console.log(allergen.toString());
  }

  console.log("");
  console.log("---------- TESTEO ASIGNACIÓN PLATO A MENU  ----------");

  const menu1 = new Menu(
    "Día",
    "Menú compuesto por un entrante, un plato principal y un postre"
  );
  const menu2 = new Menu(
    "Parejas",
    "Menú compuesto por un entrante, dos platos principales y un postre"
  );
  const menu3 = new Menu(
    "Infantil",
    "Menú compuesto por un entrante, plato principal y un helado"
  );

  const dish10 = new Dish(
    "Batata Fries",
    "Crujientes y doradas, servidas con nuestra salsa especial.",
    ["Batata", "Salsa especial"],
    "entrante01.webp"
  );

  const dish11 = new Dish(
    "Tiramisú",
    "Tiramisú italiano con nuestro café ecologico 100% arábica, mascarpone plant-based y cacao puro.",
    ["Café Ecológico 100% Arábica", "Mascarpone Plant-Based", "Cacao Puro"],
    "postre02.webp"
  );

  const dish12 = new Dish(
    "Crunchy Chick'n Nuggets",
    "Heura rebozada con panko, con un toque crujiente, servidas con nuestra salsa especial.",
    ["Heura", "Panko", "Salsa Especial"],
    "entrante03.webp"
  );

  const dish13 = new Dish(
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

  // AÑADIMOS MENÚ
  console.log("Añadiendo Menú");
  console.log("Añadiendo menús al manager...");
  console.log("menu1:", menu1);
  console.log("menu2:", menu2);
  try {
    manager.addMenu(menu2);
    console.log("Menú añadido con éxito");
  } catch (error) {
    console.error("Error al añadir menú:", error);
  }

  // Imprimimos los menús usando el ITERADOR
  console.log("Iterador de Menús - Después de añadir");
  for (const menu of manager.menus) {
    console.log(menu.toString());
  }

  console.log("");
  console.log("TEST 1: Asignando platos a menu");
  try {
    // console.log(manager.getMenu());
    manager.assignDishToMenu(menu2, dish10, dish6, dish7, dish11);
    console.log(
      "Asignación exitosa: Menú",
      menu2.name,
      "tiene",
      dish10.name,
      ",",
      dish6.name,
      ",",
      dish7.name,
      "y",
      dish11.name
    );
  } catch (error) {
    console.error("Error en la asignación:", error);
  }

  // Objeto Menu no existe, lo añadimos al sistema
  console.log("");
  console.log("TEST 2: Asignando plato a menu - menu no existe");
  try {
    manager.assignDishToMenu(menu3, dish12, dish13, dish8);
    console.log(
      "Asignación exitosa: Menú",
      menu3.name,
      "tiene",
      dish7.name,
      ",",
      dish13.name,
      "y",
      dish8.name
    );
  } catch (error) {
    console.error("Error en la asignación:", error);
  }

  // Objeto Category no existe, lo añadimos al sistema
  console.log("");
  console.log("TEST 3: Asignando plato a menu - plato no existe");
  try {
    manager.assignDishToMenu(menu1, dish10, dish3, dish11);
    console.log(
      "Asignación exitosa: Menú",
      menu1.name,
      "tiene",
      dish10.name,
      ",",
      dish3.name,
      "y",
      dish11.name
    );
  } catch (error) {
    console.error("Error en la asignación:", error);
  }

  // AQUÍ HACEMOS AHORA PRUEBAS DE ERROR
  console.log("");
  console.log("TEST 4: plato es null");
  // ERROR: Dish es null
  try {
    manager.assignDishToMenu(menu1, null);
  } catch (error) {
    console.error(error);
  }

  console.log("");
  console.log("TEST 5: menu es null");
  // ERROR: Menu es null
  try {
    manager.assignDishToMenu(null, dish8);
  } catch (error) {
    console.error(error);
  }

  console.log("");
  console.log("---------- TESTEO DESIGNACIÓN PLATO DE MENU  ----------");

  console.log("TEST 6: Designar plato de menu");
  console.log("Designando...");
  try {
    console.log(manager.getMenu());
    manager.deassignDishToMenu(menu2, dish10);
    console.log("Designación exitosa:", menu2.name, "ya no tiene", dish10.name);
  } catch (error) {
    console.error("Error en la Designación:", error);
  }

  console.log("");
  console.log("TEST 7: Designar plato de menu");
  console.log("Designando...");
  try {
    manager.deassignDishToMenu(menu1, dish3);
    console.log("Designación exitosa:", menu1.name, "ya no tiene", dish3.name);
  } catch (error) {
    console.error("Error en la Designación:", error);
  }

  // AQUÍ HACEMOS AHORA PRUEBAS DE ERROR
  console.log("");
  console.log("TEST 8: Menu no esta registrada");
  // ERROR: Menu no registrada
  try {
    const menu4 = new Menu(
      "Menú prueba",
      "Menú compuesto para hacer la prueba"
    );
    manager.deassignDishToMenu(menu4, dish7);
    console.log("Designación exitosa:", menu4.name, "ya no tiene", dish7.name);
  } catch (error) {
    console.error(error);
  }

  console.log("");
  console.log("TEST 9: Plato no esta registrada");
  // ERROR: Plato no registrado
  try {
    const dish14 = new Dish(
      "Tarta de Zanahoria",
      "Tarta de zanahoria frescas, espeicas aromáticas y coronado con un glaseado cremoso.",
      ["Harina", "Zanahoria", "Nuez moscada", "Nueces", "Huevo"],
      "postre04.webp"
    );
    manager.deassignDishToMenu(menu1, dish14);
    console.log("Designación exitosa:", menu1.name, "ya no tiene", dish14.name);
  } catch (error) {
    console.error(error);
  }

  console.log("");
  console.log("TEST 10: Menu es null");
  try {
    manager.deassignDishToMenu(null, dish6);
  } catch (error) {
    console.error(error);
  }

  console.log("");
  console.log("TEST 11: plato es null");
  try {
    manager.deassignDishToMenu(menu1, null);
  } catch (error) {
    console.error(error);
  }

  console.log("");
  console.log("TEST 12: Plato no esta asignado al menu");
  // ERROR: Designación de plato erroneo, es decir, que no esta en ese menu.
  try {
    manager.deassignDishToMenu(menu1, dish6);
    console.log("Designación exitosa:", menu1.name, "ya no tiene", dish6.name);
  } catch (error) {
    console.error(error);
  }

  console.log("");
  console.log("---------- TESTEO INTERCAMBIO DE POSICIONES  ----------");
  console.log(manager.getMenu());

  console.log("");
  console.log(
    "TEST 1: Intercambio el primer plato(dish8) por el segundo plato(dish6)"
  );
  // Al principio mostramos dish8 y después dish6, para comprobar el cambio comentar el intercambio.
  // Intentar realizar el intercambio de posiciones entre dish6 y dish8 en menu2
  try {
    manager.changeDishesPositionsInMenu(menu2, dish7, dish6);
    console.log(
      "Interambio realizado con éxito entre",
      dish6.name,
      "y",
      dish8.name,
      "en",
      menu2.name
    );
  } catch (error) {
    console.error("Error al intentar intercambiar platos en 'menu2':", error);
  }

  // AQUÍ HACEMOS AHORA PRUEBAS DE ERROR
  console.log("");
  console.log("TEST 2: Menu es null");
  try {
    manager.changeDishesPositionsInMenu(null, dish6, dish8);
  } catch (error) {
    console.error(error);
  }
  console.log("");
  console.log("TEST 2: plato es null");
  try {
    manager.changeDishesPositionsInMenu(menu2, null, dish8);
  } catch (error) {
    console.error(error);
  }

  console.log("");
  console.log("TEST 3: Menú no esta registrado");
  try {
    const menu10 = new Menu("Menú Postre", "Menu de los mejores postres.");
    manager.changeDishesPositionsInMenu(menu10, dish6, dish8);
  } catch (error) {
    console.error(error);
  }

  console.log("");
  console.log("TEST 4: Plato no esta registrado");
  try {
    const dish20 = new Dish(
      "Migas",
      "Migas de la mancha.",
      ["pan", "chorizo", "panceta", "pimientos"],
      "migas1.jpg"
    );
    manager.changeDishesPositionsInMenu(menu2, dish20, dish8);
  } catch (error) {
    console.error(error);
  }

  const dish14 = new Dish(
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
  try {
    manager.addDish(dish14);
    console.log(dish14, "añadido con éxito");
  } catch (error) {
    console.error("Error al añadir Plato:", error);
  }

  console.log("");
  console.log("TEST 5: Plato no está asignado en el menú");
  try {
    manager.changeDishesPositionsInMenu(menu2, dish14, dish8);
  } catch (error) {
    console.error(error);
  }

  console.log("");
  console.log("---------- TESTEO ITERADOR PLATOS A UNA CATEGORÍA  ----------");

  console.log("");
  try {
    // console.log(manager.getCategories());
    manager.assignCategoryToDish(category1, dish2);
    console.log("Asignación exitosa:", category1.name, "tiene", dish2.name);
  } catch (error) {
    console.error("Error en la asignación:", error);
  }

  try {
    // console.log(manager.getCategories());
    manager.assignCategoryToDish(category2, dish6);
    console.log("Asignación exitosa:", category2.name, "tiene", dish6.name);
  } catch (error) {
    console.error("Error en la asignación:", error);
  }

  console.log("");
  console.log("TEST 1: Iterador con la relación de los platos a category1");
  try {
    for (const dish of manager.getDishesInCategory(category1)) {
      console.log(dish.toString());
    }
  } catch (error) {
    console.error(error);
  }

  console.log("");
  console.log("TEST 2: Iterador con la relación de los platos a category2");
  try {
    for (const dish of manager.getDishesInCategory(category2)) {
      console.log(dish.toString());
    }
  } catch (error) {
    console.error(error);
  }

  // AQUÍ HACEMOS AHORA PRUEBAS DE ERROR
  console.log("");
  console.log("TEST 3: Categoría no esta registrada");
  try {
    const category10 = new Category("Almuerzo", "Categoría para Almuerzo");
    for (const dish of manager.getDishesInCategory(category10)) {
      console.log(dish.toString());
    }
  } catch (error) {
    console.error(error);
  }

  console.log("");
  console.log("TEST 4: Categoría es nula");
  try {
    for (const dish of manager.getDishesInCategory(null)) {
      console.log(dish.toString());
    }
  } catch (error) {
    console.error(error);
  }

  console.log("");
  console.log("---------- TESTEO ITERADOR PLATOS CON UN ALÉRGENO ----------");
  console.log(manager.getDish());
  const dish15 = new Dish(
    "Calamares Rebozados",
    "Nuestros increíbles calamares rebozados en tempura y acompañados de vegan mayo y limón.",
    ["Calamares", "Tempura", "Vegan Mayo", "limón"],
    "entrante04.webp"
  );

  try {
    // console.log(manager.getDish());
    manager.assignAllergenToDish(dish15, allergen1, allergen4);
    console.log(
      "Asignación exitosa:",
      dish15.name,
      "contiene alergeno:",
      allergen1.name,
      "y",
      allergen2.name
    );
  } catch (error) {
    console.error("Error en la asignación:", error);
  }

  try {
    // console.log(manager.getDish());
    manager.assignAllergenToDish(dish6, allergen1);
    console.log(
      "Asignación exitosa:",
      dish6.name,
      "contiene alergeno:",
      allergen1.name
    );
  } catch (error) {
    console.error("Error en la asignación:", error);
  }

  console.log("");
  console.log("TEST 1: Iterador con platos que contienen allergen4");
  try {
    for (const item of manager.getDishesWithAllergen(allergen4)) {
      console.log(item.dish.toString());
    }
  } catch (error) {
    console.error(error);
  }

  console.log("");
  console.log("TEST 2: Iterador con platos que contienen allergen1");
  try {
    for (const item of manager.getDishesWithAllergen(allergen1)) {
      console.log(item.dish.toString());
    }
  } catch (error) {
    console.error(error);
  }

  // AQUÍ HACEMOS AHORA PRUEBAS DE ERROR
  console.log("");
  console.log("TEST 3: Alergeno no esta registrada");
  try {
    const allergen4 = new Allergen(
      "alergeno prueba",
      "Contiene prueba de alergenos"
    );
    for (const dish of manager.getDishesWithAllergen(allergen4)) {
      console.log(dish.toString());
    }
  } catch (error) {
    console.error(error);
  }

  console.log("");
  console.log("TEST 4: alergeno es nula");
  try {
    for (const dish of manager.getDishesWithAllergen(null)) {
      console.log(dish.toString());
    }
  } catch (error) {
    console.error(error);
  }

  console.log("");
  console.log("---------- TESTEO ITERADOR CALLBACK  ----------");
  // FALTA POR TESTEAR FINDDISHES

  const nombre = (dish) => dish.name === "Batata Fries";
  const nombre2 = (dish) => dish.name === "The Mad Tequeños";

  console.log("");
  console.log("TEST 1: Buscamos plato con callback");
  for (let plato of manager.findDishes(nombre)) {
    console.log("FindDishes:", plato);
  }
  // console.log(manager.getDish());

  console.log("");
  console.log("TEST 2: Buscamos plato con callback");
  for (let plato of manager.findDishes(nombre2)) {
    console.log("FindDishes:", plato);
  }

  console.log("");
  console.log("---------- TESTEO CREACIÓN DE PLATOS ----------");

  // Intentar crear un plato que ya existe
  console.log("");
  console.log("TEST 2: Intentar crear un plato que ya existe");
  try {
    const dish1 = manager.createDish(
      "Batata Fries",
      "Crujientes y doradas, servidas con nuestra salsa especial.",
      ["Batata", "Salsa especial"],
      "entrante01.webp"
    );
    console.log("Manejo correcto de plato duplicado. Plato existente:");
    console.log(dish1.toString());
  } catch (error) {
    console.error(error);
  }

  console.log("");
  console.log("---------- TESTEO CREACIÓN DE MENUS ----------");
  console.log("TEST 1: Crear un menú nuevo");
  try {
    const menu5 = manager.createMenu(
      "Menú prueba",
      "Menú compuesto por un entrante, un plato principal y un postre"
    );
    console.log(menu5.toString());
  } catch (error) {
    console.error("Error al crear el menú:", error);
  }

  console.log("");
  console.log("TEST 2: Intentar crear un menú que ya existe");
  try {
    const menu5 = manager.createMenu(
      "Menú prueba",
      "Una selección de platos ligeros para la primavera"
    );
    console.log("Se ha devuelto el menú existente:");
    console.log(menu5.toString());
  } catch (error) {
    console.error(error);
  }
  console.log("");
  console.log("---------- TESTEO CREACIÓN DE ALERGENOS ----------");
  console.log("TEST 1: Crear un alérgeno nuevo");
  try {
    const allergen2 = manager.createAllergen("Lactosa", "Contiene lactosa.");
    console.log(allergen2.toString());
  } catch (error) {
    console.error("Error al crear el alérgeno:", error);
  }

  console.log("");
  console.log("TEST 2: Intentar crear un alérgeno que ya existe");
  try {
    const allergen2 = manager.createAllergen("Lactosa", "Contiene lactosa.");
    console.log("Se ha devuelto el alérgeno existente:");
    console.log(allergen2.toString());
  } catch (error) {
    console.error(error);
  }

  console.log("");
  console.log("---------- TESTEO CREACIÓN DE RESTAURANTE ----------");

  console.log("");
  console.log("TEST 1: Crear un restaurante nuevo");
  const location3 = new Coordinate("39.4697", "-0.3763");
  try {
    const restaurant5 = manager.createRestaurant(
      "Valencia",
      "Restaurante Vegan Kitchen en la plaza de la Reina de Valencia",
      location3
    );
    console.log(restaurant5.toString());
  } catch (error) {
    console.error(error);
  }

  console.log("");
  console.log("TEST 2: Intentar crear un restaurante que ya existe");
  try {
    const restaurant5 = manager.createRestaurant(
      "Valencia",
      "Restaurante Vegan Kitchen en la plaza de la Reina de Valencia",
      location3
    );
    console.log(
      "Se ha devuelto el restaurante existente:",
      restaurant5.toString()
    );
  } catch (error) {
    console.error(error);
  }
}

console.log("hola");

testeoDish();
testeoCategory();
testeoAllergen();
testeoRestaurante();
testeoRestaurantsManager();
testeoAssignAndDesign();
