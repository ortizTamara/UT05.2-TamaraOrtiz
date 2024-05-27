import {
  InvalidAccessConstructorException,
  EmptyValueException,
} from "./exceptions.js";

class User {
  #username;
  #preferences;

  constructor(userName) {
    if (!new.target) throw new InvalidAccessConstructorException();
    if (!userName) throw new EmptyValueException("username");
    this.#username = userName;
    Object.defineProperty(this, "username", {
      enumerable: true,
      get() {
        return this.#username;
      },
    });
    Object.defineProperty(this, "preferences", {
      enumerable: true,
      get() {
        return this.#preferences;
      },
      set(value) {
        if (!value) throw new EmptyValueException("preferences");
        this.#preferences = value;
      },
    });
  }
}

export { User };
