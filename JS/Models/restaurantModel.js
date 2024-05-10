//UTILIZAR FACTORIAS

import {
  BaseException,
  InvalidAccessConstructorException,
  EmptyValueException,
  InvalidValueException,
  AbstractClassException,
  NameException,
  LatitudeException,
  LongitudeException,
  ManagerException,
  CategoryExistsException,
  CategoryIsNull,
  CategoryNotRegistred,
  MenuExistsException,
  MenuIsNull,
  MenuNotRegistred,
  AllergenExistsException,
  AllergenIsNull,
  AllergenNotRegistred,
  DishExistsException,
  DishIsNull,
  DishNotRegistred,
  RestaurantExistsException,
  RestaurantIsNull,
  RestaurantNotRegistred,
  CategoryAssignDishException,
  CategoryNullException,
  DishNullException,
  DishAssignAllergenException,
  DishAssignMenuException,
  NotAFunctionException,
} from "../Utils/exceptions.js";

import {
  Dish,
  Category,
  Allergen,
  Restaurant,
  Menu,
  Coordinate,
} from "./objectRestaurant.js";

const RestaurantsManager = (function () {
  let instantiated;
  class RestaurantsManager {
    // let instantiated;
    #categories = [];
    #menus = [];
    #allergens = [];
    #dishes = [];
    #restaurants = [];

    // Ordenamos las categorías de forma alfabética
    #sortCategoriesFunc = (catA, catB) =>
      catA.category.name.toLocaleLowerCase() <
      catB.category.name.toLocaleLowerCase()
        ? -1
        : 1;

    // Ordenamos los menús de forma alfabética
    #sortMenusFunc = (menuA, menuB) =>
      menuA.menu.name.toLocaleLowerCase() < menuB.menu.name.toLocaleLowerCase()
        ? -1
        : 1;

    // Ordenamos los Alergenos de forma alfabética
    #sortAllergensFunc = (allergenA, allergenB) =>
      allergenA.name.toLocaleLowerCase() < allergenB.name.toLocaleLowerCase()
        ? -1
        : 1;

    #sortDishFunc = (dishA, dishB) =>
      dishA.dish.name.toLocaleLowerCase() < dishB.dish.name.toLocaleLowerCase()
        ? -1
        : 1;

    #sortRestaurantFunc = (restaurantA, restaurantB) =>
      restaurantA.restaurant.name.toLocaleLowerCase() <
      restaurantB.restaurant.name.toLocaleLowerCase()
        ? -1
        : 1;

    constructor() {
      // GETTER CATEGORIES
      Object.defineProperty(this, "categories", {
        enumerable: true,
        get() {
          const array = this.#categories;
          return {
            *[Symbol.iterator]() {
              for (const arrayCat of array) {
                yield arrayCat.category;
              }
            },
          };
        },
      });

      //   GETTER MENUS
      Object.defineProperty(this, "menus", {
        enumerable: true,
        get() {
          const array = this.#menus;
          return {
            *[Symbol.iterator]() {
              for (const arrayMenu of array) {
                yield arrayMenu.menu;
              }
            },
          };
        },
      });

      //   GETTER ALLERGENS
      Object.defineProperty(this, "allergens", {
        enumerable: true,
        get() {
          const array = this.#allergens;
          return {
            *[Symbol.iterator]() {
              for (const allergen of array) {
                yield allergen;
              }
            },
          };
        },
      });

      //   GETTERS RESTAURANTS
      Object.defineProperty(this, "restaurants", {
        enumerable: true,
        get() {
          const array = this.#restaurants;
          return {
            *[Symbol.iterator]() {
              //Lo hacemos así porque los alergenos se añaden directamente a su colección.
              for (const arrayRest of array) {
                yield arrayRest.restaurant;
              }
            },
          };
        },
      });
    }

    // Añade una nueva categoría.
    addCategory(...categories) {
      for (const category of categories) {
        if (category === null || !(category instanceof Category)) {
          throw new CategoryIsNull(category);
        }
        const position = this.#getCategoryPosition(category);
        if (position === undefined || position === -1) {
          this.#categories.push({
            category,
            dishes: [],
          });
          this.#categories.sort(this.#sortCategoriesFunc);
        } else {
          console.log("Category ya existe:", category);
          throw new CategoryExistsException(category);
        }
      }
      return this;
    }

    // Encuentra la posición del category en el array #categories por su nombre.
    #getCategoryPosition(category) {
      return this.#categories.findIndex(
        (x) => x.category.name === category.name
      );
    }

    // Elimina una categoría. Los platos quedarán desasignados de la categoría.
    removeCategory(...categories) {
      for (const category of categories) {
        if (category === null || !(category instanceof Category)) {
          throw new CategoryIsNull(category);
        }
        const position = this.#getCategoryPosition(category);
        if (position === undefined || position !== -1) {
          this.#categories.splice(position, 1);
        } else {
          throw new CategoryNotRegistred(category);
        }
      }
      return this;
    }

    // Añade un nuevo menú
    addMenu(...menus) {
      for (const menu of menus) {
        if (!menu || !(menu instanceof Menu)) {
          throw new MenuIsNull(menu);
        }
        const position = this.#getMenuPosition(menu);
        if (position === -1) {
          this.#menus.push({
            menu,
            dishes: [],
          });
          this.#menus.sort(this.#sortMenusFunc);
        } else {
          console.log("Menú ya existe:", menu);
          throw new MenuExistsException(menu);
        }
      }
      return this;
    }

    // Encuentra la posición del menú en el array #menus por su nombre.
    #getMenuPosition(menu) {
      return this.#menus.findIndex((x) => x.menu.name === menu.name);
    }

    #getMenuPositionByName(menu) {
      return this.#menus.findIndex((x) => x.menu.name === menu);
    }

    // Elimina un menú
    removeMenu(...menus) {
      for (const menu of menus) {
        if (!menu || !(menu instanceof Menu)) {
          throw new MenuIsNull(menu);
        }
        const position = this.#getMenuPosition(menu);
        if (position !== -1) {
          this.#menus.splice(position, 1);
        } else {
          throw new MenuNotRegistred(menu);
        }
      }
      return this;
    }

    addAllergen(...allergens) {
      for (const allergen of allergens) {
        if (!allergen || !(allergen instanceof Allergen)) {
          throw new AllergenIsNull(allergen);
        }
        const position = this.#getAllergenPosition(allergen);
        if (position === -1) {
          this.#allergens.push(allergen);
          this.#allergens.sort(this.#sortAllergensFunc);
        } else {
          console.log("Menú ya existe:", allergen);
          throw new AllergenExistsException(allergen);
        }
      }
      return this;
    }

    #getAllergenPosition(allergen) {
      return this.#allergens.findIndex((x) => x.name === allergen.name);
    }

    #getAllergenPositionByName(allergen) {
      return this.#allergens.findIndex((x) => x.name === allergen);
    }

    removeAllergen(...allergens) {
      for (const allergen of allergens) {
        if (!allergen || !(allergen instanceof Allergen)) {
          throw new AllergenIsNull(allergen);
        }
        const position = this.#getAllergenPosition(allergen);
        if (position !== -1) {
          this.#allergens.splice(position, 1);
        } else {
          throw new AllergenNotRegistred(allergen);
        }
      }
      return this;
    }

    addDish(...dishes) {
      for (const dish of dishes) {
        if (!dish || !(dish instanceof Dish)) {
          throw new DishIsNull(dish);
        }
        const position = this.#getDishPosition(dish);
        if (position === -1) {
          this.#dishes.push({
            dish,
            allergens: [],
          });

          this.#dishes.sort(this.#sortDishFunc);
        } else {
          console.log("Plato ya añadido:", dish);
          throw new DishExistsException(dish);
        }
      }
      return this;
    }

    #getDishPosition(dish) {
      return this.#dishes.findIndex((x) => x.dish.name === dish.name);
    }

    #getDishPositionByName(dish) {
      return this.#dishes.findIndex((x) => x.dish.name === dish);
    }

    removeDish(...dishes) {
      for (const dish of dishes) {
        if (!dish || !(dish instanceof Dish)) {
          throw new DishIsNull(dish);
        }
        const position = this.#getDishPosition(dish);
        if (position !== -1) {
          this.#dishes.splice(position, 1);
        } else {
          throw new DishNotRegistred(dish);
        }
      }
      return this;
    }

    addRestaurant(...restaurants) {
      for (const restaurant of restaurants) {
        if (!restaurant || !(restaurant instanceof Restaurant)) {
          throw new RestaurantIsNull(restaurant);
        }
        const position = this.#getRestaurantPosition(restaurant);
        if (position === -1) {
          this.#restaurants.push({
            restaurant,
            // products: [],
          });
          this.#restaurants.sort(this.#sortRestaurantFunc);
        } else {
          console.log("Plato ya existe:", restaurant);
          throw new RestaurantExistsException(restaurant);
        }
      }
      return this;
    }
    #getRestaurantPosition(restaurant) {
      return this.#restaurants.findIndex(
        (x) => x.restaurant.name === restaurant.name
      );
    }

    #getRestaurantPositionByName(restaurant) {
      return this.#restaurants.findIndex(
        (x) => x.restaurant.name === restaurant
      );
    }

    removeRestaurant(...restaurants) {
      for (const restaurant of restaurants) {
        if (!restaurant || !(restaurant instanceof Restaurant)) {
          throw new RestaurantIsNull(restaurants);
        }
        const position = this.#getRestaurantPosition(restaurant);
        if (position !== -1) {
          this.#restaurants.splice(position, 1);
        } else {
          throw new RestaurantNotRegistred(restaurant);
        }
      }
      return this;
    }

    assignCategoryToDish(category, ...dishes) {
      // Verificamos si Category existe
      // Obtenemos la posición de la categoría
      let catPosition = this.#getCategoryPosition(category);
      // Verificamos si la categoría es nula para no seguir avanzando
      if (!(category instanceof Category)) {
        throw new CategoryIsNull(category);
      }
      //Y no existe, lo añadimos
      if (catPosition === -1) {
        this.addCategory(category);
        catPosition = this.#getCategoryPosition(category);
      }

      const storedCategory = this.#categories[catPosition];

      // Verificamos si Dish existe
      // Recorremos los platos en la lista
      for (const dish of dishes) {
        // Comprobamos si es nulo
        if (!(dish instanceof Dish)) {
          throw new DishIsNull(dish);
        }
        // Obtenemos la posición de platos
        let dishPosition = this.#getDishPosition(dish);

        // Y si no existe, lo añadimos
        if (dishPosition === -1) {
          this.addDish(dish);
          dishPosition = this.#getDishPosition(dish);
        }

        const storedDish = this.#dishes[dishPosition];

        // Verificamos si el plato ya está asignado a la categoría
        const dishInCategoryPosition = this.#getDishPositionInCategory(
          storedCategory.dishes,
          storedDish.dish
        );
        // console.log(dishPosition);

        // Si esta asignado, saltamos una excepción
        if (dishInCategoryPosition !== -1) {
          throw new CategoryAssignDishException(dishes, category);
        }

        // Si no esta asignado, se le asigna a la categoría
        storedCategory.dishes.push(storedDish.dish);
      }
      return this;
    }

    #getDishPositionInCategory(dishes, dish) {
      return dishes.findIndex((x) => x.name === dish.name);
    }

    deassignCategoryToDish(category, ...dishes) {
      // Verificamos si la categoría es nula para no seguir avanzando
      if (!(category instanceof Category)) {
        throw new CategoryIsNull(category);
      }

      // Buscamos la categoría en la lista de categorías registradas para obtener su posición.
      let catPosition = this.#getCategoryPosition(category);
      // Si la categoría no está registrada, lanza una excepción.
      if (catPosition === -1) {
        throw new CategoryNotRegistred(category);
      }

      // Obtenemos la categoría almacenada usando la posición encontrada.
      const storedCategory = this.#categories[catPosition];

      // Recorremos los platos en la lista
      for (const dish of dishes) {
        // Verificamos si plato es nula para no seguir avanzando
        if (!(dish instanceof Dish)) {
          throw new DishIsNull(dish);
        }

        // Encontramos la posición del plato en la lista de platos de la categoría.
        let dishPosition = this.#getDishPositionInCategory(
          storedCategory.dishes,
          dish
        );
        // console.log(dishPosition);
        // Si el plato está en categoría, lo eliminamos de la lista de platos de esa categoría
        if (dishPosition !== -1) {
          storedCategory.dishes.splice(dishPosition, 1);
        } else {
          // Si el plato no está en la categoría, lanza una excepción
          throw new DishNotRegistred(dish, category);
        }
      }
      return this;
    }

    assignAllergenToDish(dish, ...allergens) {
      let dishPosition = this.#getDishPosition(dish);

      if (!(dish instanceof Dish)) {
        throw new DishIsNull(dish);
      }

      if (dishPosition === -1) {
        this.addDish(dish);
        dishPosition = this.#getDishPosition(dish);
      }

      const storedDish = this.#dishes[dishPosition];

      // Recorremos cada alérgeno en la lista
      for (const allergen of allergens) {
        // Comprobamos si el alérgeno es nulo
        if (!(allergen instanceof Allergen)) {
          throw new AllergenIsNull(allergens);
        }

        //Obtenemos la posición de los alergenos
        let allergenPosition = this.#getAllergenPosition(allergen);

        // Y si no existe, lo añadimos
        if (allergenPosition === -1) {
          this.addAllergen(allergen);
          allergenPosition = this.#getAllergenPosition(allergen);
        }

        const storedAllergen = this.#allergens[allergenPosition];

        // Verificamos si el alérgeno ya está asignado al plato
        const allergenInDishPosition = this.#getAllergenPositionInDish(
          storedDish.allergens,
          storedAllergen
        );

        // console.log(allergenInDishPosition);

        if (allergenInDishPosition !== -1) {
          throw new DishAssignAllergenException(allergens, dish);
        }

        // Si no esta asignado, se le asigna a la categoría
        storedDish.allergens.push(storedAllergen);
      }
      return this;
    }

    #getAllergenPositionInDish(allergens, allergen) {
      return allergens.findIndex((x) => x.name === allergen.name);
    }

    // un plato puede estar en más categorías
    // El problema es que esta devolviendo todo el dish, y debería de devolver solo plato
    *getCategoryForDish(dish) {
      if (!dish) {
        return; // Terminar el generador si dish es nulo
      }
      for (const category of this.#categories) {
        console.log("Category:", category); // Verifica el objeto category
        console.log("Dishes in category:", category.dishes); // Verifica los platos en la categoría

        // TODO: Aquí me he dado cuenta que foundDish sale undefined
        const foundDish = category.dishes.find((item) => item.dish === dish);
        console.log("Found dish:", foundDish); // Verifica el plato encontrado
        if (foundDish) {
          yield category.category;
        }
      }
    }

    deassignAllergenToDish(dish, ...allergens) {
      // Verificamos si el plato es nula para no seguir avanzando
      if (!(dish instanceof Dish)) {
        throw new DishIsNull(dish);
      }

      // Buscamos el plato en la lista de platos registradas para obtener su posición.
      let dishPosition = this.#getDishPosition(dish);
      // Si el plato no está registrada, lanza una excepción.
      if (dishPosition === -1) {
        throw new DishNotRegistred(dish);
      }

      // Obtenemos la categoría almacenada usando la posición encontrada.
      const storedAllergen = this.#dishes[dishPosition];

      // Recorremos los aleregnos en la lista
      for (const allergen of allergens) {
        // Verificamos si alergeno es nula para no seguir avanzando
        if (!(allergen instanceof Allergen)) {
          throw new AllergenIsNull(allergen);
        }

        // Encontramos la posición del alergeno en la lista de platos.
        let allergenPosition = this.#getAllergenPositionInDish(
          storedAllergen.allergens,
          allergen
        );
        // console.log(allergenPosition);
        // Si el alergeno está en plato, lo eliminamos de la lista de platos de esa categoría
        if (allergenPosition !== -1) {
          storedAllergen.allergens.splice(allergenPosition, 1);
        } else {
          // Si el alergeno no está en el plato, lanza una excepción
          throw new DishAssignAllergenException(allergen, dish);
        }
      }
      return this;
    }

    assignDishToMenu(menu, ...dishes) {
      // Verificamos si menu existe
      // Obtenemos la posición del menu
      let menuPosition = this.#getMenuPosition(menu);

      // Verificamos si el menu es nula para no seguir avanzando
      if (!(menu instanceof Menu)) {
        throw new MenuIsNull(menu);
      }

      //Y no existe, lo añadimos
      if (menuPosition === -1) {
        this.addMenu(menu);
        menuPosition = this.#getMenuPosition(menu);
      }

      const storedMenu = this.#menus[menuPosition];

      // Verificamos si Dish existe
      // Recorremos los platos en la lista
      for (const dish of dishes) {
        // Comprobamos si es nulo
        if (!(dish instanceof Dish)) {
          throw new DishIsNull(dish);
        }
        // Obtenemos la posición de platos
        let dishPosition = this.#getDishPosition(dish);

        // Y si no existe, lo añadimos
        if (dishPosition === -1) {
          this.addDish(dish);
          dishPosition = this.#getDishPosition(dish);
        }

        const storedDish = this.#dishes[dishPosition];

        // Verificamos si el plato ya está asignado a la categoría
        const dishInMenuPosition = this.#getDishPositionInMenu(
          storedMenu.dishes,
          storedDish.dish
        );
        // console.log(dishInMenuPosition);

        // Si esta asignado, saltamos una excepción
        if (dishInMenuPosition !== -1) {
          throw new DishAssignMenuException(dishes, menu);
        }

        // Si no esta asignado, se le asigna al menu
        storedMenu.dishes.push(storedDish.dish);
      }
      return this;
    }

    #getDishPositionInMenu(dishes, dish) {
      return dishes.findIndex((x) => x.name === dish.name);
    }

    deassignDishToMenu(menu, ...dishes) {
      // Verificamos si el menu es nula para no seguir avanzando
      if (!(menu instanceof Menu)) {
        throw new MenuIsNull(menu);
      }

      // Buscamos el menu en la lista de menus registradas para obtener su posición.
      let MenuPosition = this.#getMenuPosition(menu);
      // Si el menu no está registrada, lanza una excepción.
      if (MenuPosition === -1) {
        throw new MenuNotRegistred(menu);
      }

      // Obtenemos el menu almacenada usando la posición encontrada.
      const storedMenu = this.#menus[MenuPosition];

      // Recorremos los platos en la lista
      for (const dish of dishes) {
        // Verificamos si plato es nula para no seguir avanzando
        if (!(dish instanceof Dish)) {
          throw new DishIsNull(dish);
        }

        // Encontramos la posición del plato en la lista de platos de la categoría.
        let dishPosition = this.#getDishPositionInMenu(storedMenu.dishes, dish);
        // console.log(dishInMenuPosition);
        // Si el plato está en categoría, lo eliminamos de la lista de platos de esa categoría
        if (dishPosition !== -1) {
          storedMenu.dishes.splice(dishPosition, 1);
        } else {
          // Si el plato no está en el menu, lanza una excepción
          throw new DishAssignMenuException(menu, dish);
        }
      }
      return this;
    }

    changeDishesPositionsInMenu(menu, dish1, dish2) {
      // Comprobamos que Menu no sea nulo
      if (!(menu instanceof Menu)) {
        throw new MenuIsNull(menu);
      }

      // Buscamos el menu en la lista de menus registradas para obtener su posición.
      let menuPosition = this.#getMenuPosition(menu);
      // Si el menu no está registrada, lanza una excepción.
      if (menuPosition === -1) {
        throw new MenuNotRegistred(menu);
      }

      // Obtenemos el menu almacenada usando la posición encontrada.
      const storedMenu = this.#menus[menuPosition];

      // Verificamos si plato es nula para no seguir avanzando
      if (!(dish1 instanceof Dish) || !(dish2 instanceof Dish)) {
        throw new DishIsNull("Uno de los platos proporcionados es inválido.");
      }

      let dish1Index = storedMenu.dishes.findIndex(
        (dish) => dish.name === dish1.name
      );
      let dish2Index = storedMenu.dishes.findIndex(
        (dish) => dish.name === dish2.name
      );

      if (dish1Index === -1 || dish2Index === -1) {
        throw new DishNotRegistred(dish1, dish2);
      }

      // Intercambio de platos
      [storedMenu.dishes[dish1Index], storedMenu.dishes[dish2Index]] = [
        storedMenu.dishes[dish2Index],
        storedMenu.dishes[dish1Index],
      ];

      return this;
    }

    getDishesInCategory(category, func = null) {
      // Comprobamos que category no sea nulo
      if (!category || !(category instanceof Category)) {
        throw new CategoryIsNull(category);
      }

      // Buscamos la posición de la categoría
      const categoryPosition = this.#getCategoryPosition(category);
      if (categoryPosition === -1) {
        throw new CategoryNotRegistred(category);
      }

      // Obtenemos los platos de la categoría especificada
      let dishesInCategory = this.#categories[categoryPosition].dishes;

      // Si se proporciona una función, la aplica a cada plato
      if (func && typeof func === "function") {
        dishesInCategory = dishesInCategory.filter((dish) => func(dish));
      }

      // Iterador de platos
      return {
        *[Symbol.iterator]() {
          for (let dish of dishesInCategory) {
            yield dish;
          }
        },
      };
    }

    getDishesWithAllergen(allergen, func = null) {
      // Comprobamos que alergeno no sea nulo
      if (!allergen || !(allergen instanceof Allergen)) {
        throw new AllergenIsNull(allergen);
      }

      // Verificamos si el alérgeno está registrado
      const allergenPosition = this.#getAllergenPosition(allergen);
      if (allergenPosition === -1) {
        throw new AllergenNotRegistred(allergen);
      }

      // Obtenemos los platos que contienen el alérgeno especificado
      let dishesWithAllergen = this.#dishes.filter((dish) =>
        dish.allergens.some((a) => a.name === allergen.name)
      );

      // Si se proporciona una función, se aplica a los platos filtrados
      if (func && typeof func === "function") {
        dishesWithAllergen = dishesWithAllergen.filter((dish) => func(dish));
      }

      // Iterador
      return {
        *[Symbol.iterator]() {
          for (let dish of dishesWithAllergen) {
            yield dish;
          }
        },
      };
    }

    *findDishes(callback, order) {
      const array = [];
      for (const storedDish of this.#dishes) {
        if (callback(storedDish.dish)) array.push(storedDish.dish);
      }
      array.sort(order);
      for (let i = 0; i < array.length; i++) {
        yield array[i];
      }
    }

    createDish(name, description, ingredients, image) {
      // Verificamos si el plato ya existe
      const existingDish = this.#dishes.find(
        (storedDish) => storedDish.dish.name === name
      );
      if (existingDish) {
        // Devolvemos el plato existente para evitar duplicados
        console.log(
          `El plato ${name} ya existe. Retornando el plato existente...`
        );
        return existingDish.dish;
      } else {
        // Crear un nuevo plato si no existe
        const newDish = new Dish(name, description, ingredients, image);
        //this.#dishes.push({ dish: newDish, allergen: [] });
        // console.log("Plato creado con éxito:", newDish);
        return newDish;
      }
    }

    createMenu(name, description) {
      // Verificar si el menú ya existe
      const existingMenu = this.#menus.find((menu) => menu.name === name);
      if (existingMenu) {
        // Devolvemos el menú existente para evitar duplicados
        console.log(
          `El menú ${name} ya existe. Retornando el plato existente...`
        );
        return existingMenu.menu;
      } else {
        // Si no existe, crea un nuevo menú
        const newMenu = new Menu(name, description);
        // this.#menus.push(newMenu);
        // console.log(`Menú ${name} creado con éxito.`);
        return newMenu;
      }
    }

    createCategory(name, description) {
      // Verificar si la categoría ya existe
      const existingCategory = this.#categories.find(
        (storedCategory) => storedCategory.category.name === name
      );
      if (existingCategory) {
        // Devolvemos el menú existente para evitar duplicados
        // console.log(
        //   `La categoria ${name} ya existe. Retornando la categoría existente...`
        // );
        return existingCategory.category;
      } else {
        // Si no existe, crea un nuevo menú
        const newCategory = new Category(name, description);
        // this.#categories.push({ category: newCategory, dishes: [] });
        // console.log(`Categoria ${name} creado con éxito.`);
        return newCategory;
      }
    }

    createAllergen(name, description) {
      // Verificar si el alergeno ya existe
      const existingAllergen = this.#allergens.find(
        (allergen) => allergen.name === name
      );
      if (existingAllergen) {
        // Devolvemos el alergeno existente para evitar duplicados
        console.log(
          `El alérgeno ${name} ya existe. Retornando el alergeno existente...`
        );
        return existingAllergen.allergen;
      } else {
        // Si no existe, crea un nuevo alergeno
        const newAllergen = new Allergen(name, description);
        // this.#allergens.push(newAllergen);
        // console.log(`Alérgeno ${name} creado con éxito.`);
        return newAllergen;
      }
    }

    createRestaurant(name, description, location) {
      // Verificar si el restaurante ya existe
      const existingRestaurant = this.#restaurants.find(
        (restaurant) => restaurant.name === name
      );
      if (existingRestaurant) {
        // Devolvemos el restaurante existente para evitar duplicados

        console.log(
          `El restaurante ${name} ya existe.  Retornando el restaurante existente...`
        );
        return existingRestaurant.restaurant;
      } else {
        const newRestaurant = new Restaurant(name, description, location);
        // this.#restaurants.push(newRestaurant);
        // console.log(`Restaurante ${name} creado con éxito.`);
        return newRestaurant;
      }
    }

    getDishes() {
      return this.#dishes;
    }

    getDish(dish) {
      return this.#dishes[this.#getDishPosition(dish)];
    }

    getDishByName(dish) {
      return this.#dishes[this.#getDishPositionByName(dish)];
    }

    getCategories() {
      return this.#categories;
    }

    getAllergen() {
      return this.#allergens;
    }
    getAllergenByName(allergen) {
      return this.#allergens[this.#getAllergenPositionByName(allergen)];
    }

    getRestaurants() {
      return this.#restaurants;
    }

    getRestaurantByName(restaurant) {
      return this.#restaurants[this.#getRestaurantPositionByName(restaurant)];
    }

    getMenus() {
      return this.#menus;
    }

    getMenuByName(menu) {
      return this.#menus[this.#getMenuPositionByName(menu)];
    }
  }
  function init() {
    const manager = new RestaurantsManager();
    Object.freeze(manager);
    return manager;
  }
  return {
    getInstance() {
      if (!instantiated) {
        instantiated = init();
      }
      return instantiated;
    },
  };
})();

export { Dish, Category, Allergen, Restaurant, Menu, Coordinate };
export {
  BaseException,
  InvalidAccessConstructorException,
  EmptyValueException,
  InvalidValueException,
  AbstractClassException,
  NameException,
  LatitudeException,
  LongitudeException,
  ManagerException,
  CategoryExistsException,
  CategoryIsNull,
  CategoryNotRegistred,
  MenuExistsException,
  MenuIsNull,
  MenuNotRegistred,
  AllergenExistsException,
  AllergenIsNull,
  AllergenNotRegistred,
  DishExistsException,
  DishIsNull,
  DishNotRegistred,
  RestaurantExistsException,
  RestaurantIsNull,
  RestaurantNotRegistred,
  CategoryAssignDishException,
  CategoryNullException,
  DishNullException,
  DishAssignAllergenException,
  DishAssignMenuException,
  NotAFunctionException,
};
export default RestaurantsManager;
