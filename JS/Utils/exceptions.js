/* eslint-disable max-classes-per-file */
class BaseException extends Error {
  constructor(message = "", fileName, lineNumber) {
    super(message, fileName, lineNumber);
    this.name = "BaseException";
    if (Error.captureStackTrace) {
      Error.captureStackTrace(this, BaseException);
    }
  }
}

// Excepción acceso inválido a constructor
class InvalidAccessConstructorException extends BaseException {
  constructor(fileName, lineNumber) {
    super("Constructor can’t be called as a function.", fileName, lineNumber);
    this.name = "InvalidAccessConstructorException";
  }
}

// Excepción personalizada para indicar valores vacios.
class EmptyValueException extends BaseException {
  constructor(param, fileName, lineNumber) {
    super(
      `Error: The parameter ${param} can't be empty.`,
      fileName,
      lineNumber
    );
    this.param = param;
    this.name = "EmptyValueException";
  }
}

// Excepción de valor inválido
class InvalidValueException extends BaseException {
  constructor(param, value, fileName, lineNumber) {
    super(
      `Error: The paramenter ${param} has an invalid value. (${param}: ${value})`,
      fileName,
      lineNumber
    );
    this.param = param;
    this.name = "InvalidValueException";
  }
}

// Excepción personalizada para clases abstractas.
class AbstractClassException extends BaseException {
  constructor(className, fileName, lineNumber) {
    super(`Error: The class  ${className} is abstract.`, fileName, lineNumber);
    this.className = className;
    this.name = "AbstractClassException";
  }
}

// Excepción para nombre obligatorio
class NameException extends BaseException {
  constructor(className, fileName, lineNumber) {
    super(`Error: El ${className} es obligatorio.`, fileName, lineNumber);
    this.name = "NameException";
  }
}

// Excepción para coordenadas de latitud
class LatitudeException extends BaseException {
  constructor(className, fileName, lineNumber) {
    super(
      `La latitud de la ubicación de ${className} es obligatorio.`,
      fileName,
      lineNumber
    );
    this.name = "LatitudeException";
  }
}

// Excepción para coordenadas de longitud
class LongitudeException extends BaseException {
  constructor(className, fileName, lineNumber) {
    super(
      `El longitud de la ubicación de ${className} es obligatorio.`,
      fileName,
      lineNumber
    );
    this.name = "LongitudeException";
  }
}

// Excepción genérica para problemas del manager
class ManagerException extends BaseException {
  constructor(message = "Error: Manager Exception.", fileName, lineNumber) {
    super(message, fileName, lineNumber);
    this.name = "ManagerException";
  }
}

// Excepción para categoría ya existente
class CategoryExistsException extends ManagerException {
  constructor(category, fileName, lineNumber) {
    super(
      `Error: ${category.name} ya existe en el manager`,
      fileName,
      lineNumber
    );
    this.category = category;
    this.name = "CategoryExistsException";
  }
}

// Excepción para categoría nula o no registrada
class CategoryIsNull extends BaseException {
  constructor(category, fileName, lineNumber) {
    super(
      `Error: La categoría ${category.name} no puede ser null o no es un objeto Category.`,
      fileName,
      lineNumber
    );
    this.category = category;
    this.name = "CategoryIsNull";
  }
}

// Excepción para categoría no registrada
class CategoryNotRegistred extends BaseException {
  constructor(category, fileName, lineNumber) {
    super(
      `Error: La categoría ${category.name} no esta registrada.`,
      fileName,
      lineNumber
    );
    this.category = category;
    this.name = "CategoryNotRegistred";
  }
}

// Excepción para menú ya existente
class MenuExistsException extends ManagerException {
  constructor(menu, fileName, lineNumber) {
    super(`Error:  ${menu.name} ya existe en el manager`, fileName, lineNumber);
    this.menu = menu;
    this.name = "MenuExistsException";
  }
}

// Excepción para Menu nulo o no es un objeto Menu
class MenuIsNull extends BaseException {
  constructor(menu, fileName, lineNumber) {
    super(
      `Error: La categoría ${menu.name} no puede ser null o no es un objeto Menu.`,
      fileName,
      lineNumber
    );
    this.name = "MenuIsNull";
  }
}

// Excepción para menú no registrado
class MenuNotRegistred extends BaseException {
  constructor(menu, fileName, lineNumber) {
    super(`Error: ${menu.name} no esta registrada.`, fileName, lineNumber);
    this.menu = menu;
    this.name = "MenuNotRegistred";
  }
}

// Excepción para Allergen ya existente
class AllergenExistsException extends ManagerException {
  constructor(allergen, fileName, lineNumber) {
    super(
      `Error: ${allergen.name} ya existe en el manager`,
      fileName,
      lineNumber
    );
    this.allergen = allergen;
    this.name = "AllergenExistsException";
  }
}

// Excepción para Allergen nulo o no objeto Allergen
class AllergenIsNull extends BaseException {
  constructor(allergen, fileName, lineNumber) {
    super(
      `Error: ${allergen.name} no puede ser null o no es un objeto Allergen.`,
      fileName,
      lineNumber
    );
    this.allergen = allergen;
    this.name = "AllergenIsNull";
  }
}

// Excepción para Allergen no registrado
class AllergenNotRegistred extends BaseException {
  constructor(allergen, fileName, lineNumber) {
    super(`Error: ${allergen.name} no esta registrada.`, fileName, lineNumber);
    this.allergen = allergen;
    this.name = "AllergenNotRegistred";
  }
}

// Excepción para plato ya existente
class DishExistsException extends ManagerException {
  constructor(dish, fileName, lineNumber) {
    super(`Error: ${dish.name} ya existe en el manager`, fileName, lineNumber);
    this.dish = dish;
    this.name = "DishExistsException";
  }
}

// Excepción para plato nulo o no es un objeto Dish
class DishIsNull extends BaseException {
  constructor(dish, fileName, lineNumber) {
    super(
      `Error: ${dish.name} no puede ser null o no es un objeto Dish.`,
      fileName,
      lineNumber
    );
    this.dish = dish;
    this.name = "DishIsNull";
  }
}

// Excepción para plato no registrado
class DishNotRegistred extends BaseException {
  constructor(dish, fileName, lineNumber) {
    super(`Error: ${dish.name} no esta registrada.`, fileName, lineNumber);
    this.dish = dish;
    this.name = "DishNotRegistred";
  }
}

// Excepción para restaurante ya existente
class RestaurantExistsException extends ManagerException {
  constructor(restaurant, fileName, lineNumber) {
    super(
      `Error: ${restaurant.name} ya existe en el manager`,
      fileName,
      lineNumber
    );
    this.restaurant = restaurant;
    this.name = "RestaurantExistsException";
  }
}

// Excepción para restaurante nulo o no es un objeto restaurante
class RestaurantIsNull extends BaseException {
  constructor(restaurant, fileName, lineNumber) {
    super(
      `Error: ${restaurant.name} no puede ser null o no es un objeto Restaurant.`,
      fileName,
      lineNumber
    );
    this.restaurant = restaurant;
    this.name = "RestaurantIsNull";
  }
}

// Excepción para restaurante no registrado
class RestaurantNotRegistred extends BaseException {
  constructor(restaurant, fileName, lineNumber) {
    super(
      `Error: ${restaurant.name} no esta registrada.`,
      fileName,
      lineNumber
    );
    this.restaurant = restaurant;
    this.name = "RestaurantNotRegistred";
  }
}

// Excepción al intentar asignar un plato a una categoría
class CategoryAssignDishException extends BaseException {
  constructor(category, dish, fileName, lineNumber) {
    super(
      `Error al asignar ${dish.name} a ${category.name}: `,
      fileName,
      lineNumber
    );
    this.name = "CategoryAssignDishException";
  }
}

// Excepción para indicar que la categoría es nula
class CategoryNullException extends BaseException {
  constructor(category, fileName, lineNumber) {
    super(`La ${category.name} proporcionada es null.`, fileName, lineNumber);
    this.name = "CategoryNullException";
  }
}

// Excepción para indicar que el plato es nulo
class DishNullException extends BaseException {
  constructor(dish, fileName, lineNumber) {
    super(`El ${dish.name} proporcionado es null.`, fileName, lineNumber);

    this.name = "DishNullException";
  }
}

// Excepción al intentar asignar un alergeno a un plato
class DishAssignAllergenException extends BaseException {
  constructor(allergen, dish, fileName, lineNumber) {
    super(
      `Error al asignar ${allergen.name} a ${dish.name}: `,
      fileName,
      lineNumber
    );
    this.name = "DishAssignAllergenException";
  }
}

// Excepción al intentar asignar un plato a un menu
class DishAssignMenuException extends BaseException {
  constructor(menu, dish, fileName, lineNumber) {
    super(
      `Error al asignar ${dish.name} a ${menu.name}: `,
      fileName,
      lineNumber
    );

    this.name = "DishAssignMenuException";
  }
}

// Excepción para argumentos que deberían ser funciones pero no lo son
class NotAFunctionException extends BaseException {
  constructor(argumentName, fileName, lineNumber) {
    super(
      `Error: El argumento "${argumentName}" debe ser una función.`,
      fileName,
      lineNumber
    );
    this.argumentName = argumentName;
    this.name = "NotAFunctionException";
  }
}

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
