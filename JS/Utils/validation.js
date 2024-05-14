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
}

export { createDishValidation, deleteDishValidation };
