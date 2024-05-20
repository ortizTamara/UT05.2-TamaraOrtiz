import {
  InvalidAccessConstructorException,
  EmptyValueException,
} from "./exceptions.js";

class User {
  #userName;
  #preferences;

  constructor(userName) {
    if (!new.target) throw new InvalidAccessConstructorException();
    if (!userName) throw new EmptyValueException("username");
    this.#userName = userName;
    Object.defineProperty(this, "username", {
      enumerable: true,
      get() {
        return this.#userName;
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
