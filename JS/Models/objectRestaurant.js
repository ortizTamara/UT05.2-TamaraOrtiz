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
} from "../Utils/exceptions.js";

class Dish {
  #name; //Nombre del plato obligatorio
  #description;
  #ingredients = []; //Array con los posibles ingredientes que componene el plato
  #image; //String con la ruta donde está ubicada la imagen del plato

  constructor(name, description, ingredients, image) {
    //Validación de parámetro obligatorio
    if (!name) throw new NameException("name");

    this.#name = name;
    this.#description = description;
    this.#ingredients = ingredients;
    this.#image = image;

    Object.defineProperty(this, "name", {
      enumerable: true,
      get() {
        return this.#name;
      },
      set(value) {
        if (value === null) throw new NameException("name");
        this.#name = value;
      },
    });

    Object.defineProperty(this, "description", {
      enumerable: true,
      get() {
        return this.#description;
      },
      set(value) {
        this.#description = value;
      },
    });

    Object.defineProperty(this, "ingredients", {
      enumerable: true,
      get() {
        return this.#ingredients;
      },
      set(value) {
        this.#ingredients = value;
      },
    });

    Object.defineProperty(this, "image", {
      enumerable: true,
      get() {
        return this.#image;
      },
      set(value) {
        this.#image = value;
      },
    });
  }

  toString() {
    return `${this.#name} - ${this.#description} - ${this.#ingredients} - ${
      this.#image
    }`;
  }
}

class Category {
  #name; //Nombre de la categoría
  #description; //Descripción de la categoría

  constructor(name, description) {
    //Validación de parámetro obligatorio
    if (!name) throw new NameException("name");

    this.#name = name;
    this.#description = description;

    // Método Getter - Devuelve un iterador que permite recorrer las categorías del sistema
    Object.defineProperty(this, "name", {
      enumerable: true,
      get() {
        return this.#name;
      },
      set(value) {
        if (value === null) throw new NameException("name");
        this.#name = value;
      },
    });

    Object.defineProperty(this, "description", {
      enumerable: true,
      get() {
        return this.#description;
      },
      set(value) {
        this.#description = value;
      },
    });
  }

  toString() {
    return `${this.#name} - ${this.#description}`;
  }
}

class Allergen {
  #name; //Nombre del alérgeno
  #description; //Descripción del alérgeno
  constructor(name, description) {
    //Validación de parámetro obligatorio
    if (!name) throw new NameException("name");

    this.#name = name;
    this.#description = description;

    Object.defineProperty(this, "name", {
      enumerable: true,
      get() {
        return this.#name;
      },
      set(value) {
        if (value === null) throw new NameException("name");
        this.#name = value;
      },
    });

    Object.defineProperty(this, "description", {
      enumerable: true,
      get() {
        return this.#description;
      },
      set(value) {
        this.#description = value;
      },
    });
  }

  toString() {
    return `${this.#name} - ${this.#description}`;
  }
}

class Menu {
  #name; //Nombre del menú
  #description; //Descripción del menú
  constructor(name, description) {
    //Validación de parámetro obligatorio
    if (!name) throw new NameException("name");

    this.#name = name;
    this.#description = description;

    Object.defineProperty(this, "name", {
      enumerable: true,
      get() {
        return this.#name;
      },
      set(value) {
        if (value === null) throw new NameException("name");
        this.#name = value;
      },
    });

    Object.defineProperty(this, "description", {
      enumerable: true,
      get() {
        return this.#description;
      },
      set(value) {
        this.#description = value;
      },
    });
  }

  toString() {
    return `${this.#name} - ${this.#description}`;
  }
}

class Restaurant {
  #name; //Nombre del restaurante
  #description; //Descripción del restaurante
  #location; //Ubicación del restaurante en forma de coordenadas
  constructor(name, description, location) {
    //Validación de parámetro obligatorio
    if (!name) throw new NameException("name");

    this.#name = name;
    this.#description = description;
    this.#location = location;

    Object.defineProperty(this, "name", {
      enumerable: true,
      get() {
        return this.#name;
      },
      set(value) {
        if (value === null) throw new NameException("name");
        this.#name = value;
      },
    });

    Object.defineProperty(this, "description", {
      enumerable: true,
      get() {
        return this.#description;
      },
      set(value) {
        this.#description = value;
      },
    });

    Object.defineProperty(this, "location", {
      enumerable: true,
      get() {
        return this.#location;
      },
      set(value) {
        this.#location = value;
      },
    });
  }
  toString() {
    return `${this.#name} - ${this.#description} - ${this.#location}`;
  }
}

class Coordinate {
  #latitude; //Latitud de la ubicación
  #longitude; //longitud de la ubicación

  constructor(latitude, longitude) {
    //Validación de parámetros obligatorios
    if (!latitude) throw new LatitudeException("latitude");
    if (!longitude) throw new LongitudeException("longitude");

    this.#latitude = latitude;
    this.#longitude = longitude;

    Object.defineProperty(this, "latitude", {
      enumerable: true,
      get() {
        return this.#latitude;
      },
      set(value) {
        this.#latitude = value;
      },
    });

    Object.defineProperty(this, "longitude", {
      enumerable: true,
      get() {
        return this.#longitude;
      },
      set(value) {
        this.#longitude = value;
      },
    });
  }

  toString() {
    return `Latitude: ${this.#latitude}, Longitude: ${this.#longitude}`;
  }
}

export { Dish, Category, Allergen, Restaurant, Menu, Coordinate };
export default Coordinate;
