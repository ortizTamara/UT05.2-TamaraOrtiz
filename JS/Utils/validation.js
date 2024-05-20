function createDishValidation(handler) {
  const form = document.forms.createDish;
  var inputs = form.querySelectorAll("input, select");
  var totalInputs = inputs.length;
  var validInputs = 0;

  inputs.forEach(function (input) {
    input.addEventListener("input", function (event) {
      console.log(event.target.checkValidity());

      // Comprueba si el campo es válido
      if (event.target.checkValidity()) {
        // Si es válido, añade la clase 'valid' y elimina la clase 'invalid'
        event.target.classList.add("is-valid");
        event.target.classList.remove("is-invalid");
      } else {
        // Si no es válido, añade la clase 'invalid' y elimina la clase 'valid'
        event.target.classList.add("is-invalid");
        event.target.classList.remove("is-valid");
      }

      progress();
    });
  });

  function progress() {
    validInputs = Array.from(inputs).filter(function (input) {
      return input.checkValidity();
    }).length;
  }

  form.addEventListener("submit", function (event) {
    event.preventDefault();

    if (totalInputs == validInputs) {
      handler(
        this.dishName.value.trim(),
        this.dishDescription.value.trim(),
        this.dishCate.value,
        this.dishAllergen.value
      );
    }
  });

  form.addEventListener("reset", function (event) {
    for (const input of this.querySelectorAll("input")) {
      input.classList.remove("is-valid");
      input.classList.remove("is-invalid");
    }
    this.dishName.focus();
  });
}

function deleteDishValidation(handler) {
  const form = document.forms.deleteDish;
  var inputs = form.querySelectorAll("select");
  var totalInputs = inputs.length;
  var validInputs = 0;

  inputs.forEach(function (input) {
    input.addEventListener("input", function (event) {
      // Comprueba si el campo es válido
      if (event.target.checkValidity()) {
        // Si es válido, añade la clase 'valid' y elimina la clase 'invalid'
        event.target.classList.add("is-valid");
        event.target.classList.remove("is-invalid");
      } else {
        // Si no es válido, añade la clase 'invalid' y elimina la clase 'valid'
        event.target.classList.add("is-invalid");
        event.target.classList.remove("is-valid");
      }

      progress();
    });
  });

  function progress() {
    validInputs = Array.from(inputs).filter(function (input) {
      return input.checkValidity();
    }).length;
  }

  form.addEventListener("submit", function (event) {
    event.preventDefault();

    if (totalInputs == validInputs) {
      handler(this.dDish.value);
    }
  });

  form.addEventListener("reset", function (event) {
    for (const input of this.querySelectorAll("input")) {
      input.classList.remove("is-valid");
      input.classList.remove("is-invalid");
    }
    this.dDish.focus();
  });
}

function dishMenuValidation(handler) {
  const form = document.forms.dishMenu;
  var inputs = form.querySelectorAll("select");
  var totalInputs = inputs.length;
  var validInputs = 0;

  inputs.forEach(function (input) {
    input.addEventListener("input", function (event) {
      // Comprueba si el campo es válido
      if (event.target.checkValidity()) {
        // Si es válido, añade la clase 'valid' y elimina la clase 'invalid'
        event.target.classList.add("is-valid");
        event.target.classList.remove("is-invalid");
      } else {
        // Si no es válido, añade la clase 'invalid' y elimina la clase 'valid'
        event.target.classList.add("is-invalid");
        event.target.classList.remove("is-valid");
      }

      progress();
    });
  });

  function progress() {
    validInputs = Array.from(inputs).filter(function (input) {
      return input.checkValidity();
    }).length;
  }

  form.addEventListener("submit", function (event) {
    event.preventDefault();

    if (totalInputs == validInputs) {
      handler(this.adOption.value, this.adMenu.value, this.adDish.value);
    }
  });
  form.addEventListener("reset", function (event) {
    for (const input of inputs) {
      input.classList.remove("is-valid");
      input.classList.remove("is-invalid");
    }
    this.adOption.focus();
  });
}

function createCategoryValidation(handler) {
  const form = document.forms.cCategory;
  var inputs = form.querySelectorAll("input, select");
  var totalInputs = inputs.length;
  var validInputs = 0;

  inputs.forEach(function (input) {
    input.addEventListener("input", function (event) {
      // Comprueba si el campo es válido
      if (event.target.checkValidity()) {
        // Si es válido, añade la clase 'valid' y elimina la clase 'invalid'
        event.target.classList.add("is-valid");
        event.target.classList.remove("is-invalid");
      } else {
        // Si no es válido, añade la clase 'invalid' y elimina la clase 'valid'
        event.target.classList.add("is-invalid");
        event.target.classList.remove("is-valid");
      }

      progress();
    });
  });

  function progress() {
    validInputs = Array.from(inputs).filter(function (input) {
      return input.checkValidity();
    }).length;
  }

  form.addEventListener("submit", function (event) {
    event.preventDefault();

    if (totalInputs == validInputs) {
      handler(this.cCate.value);
    }
  });
  form.addEventListener("reset", function (event) {
    for (const input of inputs) {
      input.classList.remove("is-valid");
      input.classList.remove("is-invalid");
    }
    this.cCate.focus();
  });
}

function deleteCategoryValidation(handler) {
  const form = document.forms.dCategory;
  var inputs = form.querySelectorAll("select");
  var totalInputs = inputs.length;
  var validInputs = 0;

  inputs.forEach(function (input) {
    input.addEventListener("input", function (event) {
      // Comprueba si el campo es válido
      if (event.target.checkValidity()) {
        // Si es válido, añade la clase 'valid' y elimina la clase 'invalid'
        event.target.classList.add("is-valid");
        event.target.classList.remove("is-invalid");
      } else {
        // Si no es válido, añade la clase 'invalid' y elimina la clase 'valid'
        event.target.classList.add("is-invalid");
        event.target.classList.remove("is-valid");
      }

      progress();
    });
  });

  function progress() {
    validInputs = Array.from(inputs).filter(function (input) {
      return input.checkValidity();
    }).length;
  }

  form.addEventListener("submit", function (event) {
    event.preventDefault();

    if (totalInputs == validInputs) {
      handler(this.dCate.value);
    }
  });

  form.addEventListener("reset", function (event) {
    for (const input of this.querySelectorAll("input")) {
      input.classList.remove("is-valid");
      input.classList.remove("is-invalid");
    }
    this.dCate.focus();
  });
}

function restaurantValidation(handler) {
  const form = document.forms.cRestaurant;
  var inputs = form.querySelectorAll("input, select");
  var totalInputs = inputs.length;
  var validInputs = 0;

  inputs.forEach(function (input) {
    input.addEventListener("input", function (event) {
      // Comprueba si el campo es válido
      if (event.target.checkValidity()) {
        // Si es válido, añade la clase 'valid' y elimina la clase 'invalid'
        event.target.classList.add("is-valid");
        event.target.classList.remove("is-invalid");
      } else {
        // Si no es válido, añade la clase 'invalid' y elimina la clase 'valid'
        event.target.classList.add("is-invalid");
        event.target.classList.remove("is-valid");
      }

      progress();
    });
  });

  function progress() {
    validInputs = Array.from(inputs).filter(function (input) {
      return input.checkValidity();
    }).length;
  }

  form.addEventListener("submit", function (event) {
    event.preventDefault();

    if (totalInputs == validInputs) {
      handler(this.restauName.value, this.cooLat.value, this.cooLong.value);
    }
  });

  form.addEventListener("reset", function (event) {
    for (const input of inputs) {
      input.classList.remove("is-valid");
      input.classList.remove("is-invalid");
    }
    this.crName.focus();
  });
}

function addDishCategoryValidation(handler) {
  const formDish = document.forms.upDish;
  const formCat = document.forms.upCat;

  const validateForm = (form) => {
    const inputs = form.querySelectorAll("select");
    const totalInputs = inputs.length;
    let validInputs = 0;

    inputs.forEach(function (input) {
      input.addEventListener("input", function (event) {
        // Comprueba si el campo es válido
        if (event.target.checkValidity()) {
          // Si es válido, añade la clase 'valid' y elimina la clase 'invalid'
          event.target.classList.add("is-valid");
          event.target.classList.remove("is-invalid");
        } else {
          // Si no es válido, añade la clase 'invalid' y elimina la clase 'valid'
          event.target.classList.add("is-invalid");
          event.target.classList.remove("is-valid");
        }

        progress();
      });
    });

    function progress() {
      validInputs = Array.from(inputs).filter(function (input) {
        return input.checkValidity();
      }).length;
    }

    form.addEventListener("submit", function (event) {
      event.preventDefault();

      if (totalInputs === validInputs) {
        const dishcat = formDish ? formDish.dishcat.value : null;
        const catdish = formCat ? formCat.catedish.value : null;
        if (form === formCat) {
          handler(dishcat, catdish);
        } else if (form === formDish) {
          handler(catdish, dishcat);
        }
      }
    });

    form.addEventListener("reset", function () {
      resetForm();
    });

    const resetForm = () => {
      for (const input of inputs) {
        input.classList.remove("is-valid");
        input.classList.remove("is-invalid");
      }
      form.querySelector("select").focus();
    };
  };

  if (formDish) {
    validateForm(formDish);
  }

  if (formCat) {
    validateForm(formCat);
  }
}

export {
  createDishValidation,
  deleteDishValidation,
  dishMenuValidation,
  restaurantValidation,
  createCategoryValidation,
  deleteCategoryValidation,
  addDishCategoryValidation,
};
