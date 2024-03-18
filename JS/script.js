// DESPLIEGUE MENU
document.addEventListener("DOMContentLoaded", () => {
  $(document).ready(function () {
    // Cierra todos los submenús cuando se abre uno nuevo
    $(".dropdown-submenu a.dropdown-toggle").on("mouseover", function (e) {
      $(".dropdown-submenu .dropdown-menu").hide(); // Oculta todos los submenús
      $(this).next("ul").toggle(); // Muestra el submenú correspondiente a este enlace

      e.stopPropagation();
      e.preventDefault();
    });

    // Despliegue para los submenús en hover (y clic para dispositivos táctiles)
    $(".dropdown-toggle").hover(function (e) {
      // Función para manejar el hover sobre el elemento
      if (!("ontouchstart" in document.documentElement)) {
        toggleDropdown.apply(this, [e]);
      }
    });

    $(".dropdown-toggle").on("click", function (e) {
      if ("ontouchstart" in document.documentElement) {
        // Prevenir el comportamiento por defecto solo para dispositivos táctiles
        e.preventDefault();
        $(this).next(".dropdown-menu").toggle();
      }
    });

    // Cerrar submenús al hacer clic fuera de ellos
    $("body").click(function (e) {
      if (!$(e.target).is(".dropdown, .dropdown *")) {
        $(".dropdown-menu").hide();
      }
    });

    // Específico para móviles: cerrar menú al seleccionar un item
    $(".nav-item a")
      .not(".dropdown-toggle")
      .click(function () {
        $(".navbar-collapse").collapse("hide");
      });
  });
});

// Desplazamiento a una sección específica fuera de la página Carta
document.addEventListener("DOMContentLoaded", () => {
  const hash = window.location.hash;
  if (hash) {
    $("html, body").animate(
      {
        scrollTop: $(hash).offset().top,
      },
      500
    );
  }
});

// desplazamiento a una sección específica en Carta
document.addEventListener("DOMContentLoaded", () => {
  $(document).on("click", 'a[href^="#"]', function (event) {
    event.preventDefault();

    $("html, body").animate(
      {
        scrollTop: $($.attr(this, "href")).offset().top,
      },
      500
    );
  });
});

// FORMULARIO RESERVA
document.addEventListener("DOMContentLoaded", function () {
  const dateInput = document.getElementById("date");
  const timeInput = document.getElementById("time");
  const messageDiv = document.getElementById("message");
  const continueButton = document.getElementById("continueButton");
  const bookingForm = document.getElementById("bookingForm");
  const confirmationForm = document.getElementById("confirmationForm");
  const confirmButton = document.getElementById("confirmReservationButton");
  const finalizeReservationButton = document.getElementById(
    "finalizeReservation"
  );
  const confirmationModal = $("#confirmationModal");
  const confirmPhoneInput = document.getElementById("confirmPhone");

  // Establecer la fecha mínima
  if (dateInput) {
    const today = new Date();
    const dd = String(today.getDate()).padStart(2, "0");
    const mm = String(today.getMonth() + 1).padStart(2, "0");
    const yyyy = today.getFullYear();
    const currentDate = `${yyyy}-${mm}-${dd}`;
    dateInput.setAttribute("min", currentDate);
  }

  continueButton.addEventListener("click", function (event) {
    event.preventDefault();

    const time = timeInput.value;

    messageDiv.style.display = "none";
    messageDiv.innerText = "";

    if (!isValidTimeRange(time)) {
      showMessage(
        "Por favor, seleccione una hora entre 13:00 a 16:00 o entre 20:00 a 24:00."
      );
      return;
    }

    bookingForm.style.display = "none";
    confirmationForm.style.display = "block";
  });

  confirmationForm.addEventListener("submit", function (event) {
    event.preventDefault();
    bookingForm.style.display = "none";
    confirmationForm.style.display = "block";
  });

  // Presentación del formulario de confirmación
  confirmationForm.addEventListener("submit", function (event) {
    event.preventDefault();
    // Limpiamos el mensaje de validación antes de la comprobación
    confirmPhoneInput.setCustomValidity("");

    if (!isValidPhone(confirmPhoneInput.value)) {
      confirmPhoneInput.setCustomValidity(
        "Por favor, ingrese un número de teléfono válido. Debe contener exactamente 9 dígitos."
      );

      confirmPhoneInput.reportValidity();
    } else {
      confirmationModal.modal("show");
    }
  });

  finalizeReservationButton.addEventListener("click", function () {
    confirmationModal.modal("hide");
    window.location.href = "../../../index.html";
  });

  function validateForm() {
    const name = document.getElementById("confirmFullName").value;
    const email = document.getElementById("confirmEmail").value;
    const phone = document.getElementById("confirmPhone").value;

    if (!isValidName(name)) {
      alert("El nombre no debe contener números.");
      return false;
    }

    if (!isValidEmail(email)) {
      alert("Por favor, introduzca un email válido.");
      return false;
    }

    if (!isValidPhone(phone)) {
      alert("Por favor, ingrese un número de teléfono válido.");
      return false;
    }

    return true;
  }

  function isValidName(name) {
    return /^[a-zA-Z\s]+$/.test(name);
  }

  function isValidEmail(email) {
    return /^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(email);
  }

  function isValidPhone(phone) {
    var digitsOnly = phone.replace(/[\s\-\(\)]/g, "");
    return digitsOnly.length === 9 && /^[\d]+$/.test(digitsOnly);
  }
  confirmPhoneInput.addEventListener("input", function () {
    confirmPhoneInput.setCustomValidity("");
  });

  function isValidTimeRange(selectedTime) {
    const [hour, minute] = selectedTime.split(":").map(Number);
    const timeInMinutes = hour * 60 + minute;

    const morningStart = 13 * 60; // 13:00
    const morningEnd = 16 * 60; // 16:00
    const eveningStart = 20 * 60; // 20:00
    const eveningEnd = 24 * 60; // 24:00

    return (
      (timeInMinutes >= morningStart && timeInMinutes <= morningEnd) ||
      (timeInMinutes >= eveningStart && timeInMinutes < eveningEnd)
    );
  }

  function showMessage(message) {
    messageDiv.style.display = "block";
    messageDiv.className = "alert alert-danger";
    messageDiv.innerText = message;
  }
});

// Función para cargar las traducciones del archivo JSON correspondiente
function loadTranslations(lang) {
  fetch(`/locales/${lang}.json`)
    .then((response) => {
      if (!response.ok) {
        throw new Error(`HTTP error! status: ${response.status}`);
      }
      return response.json();
    })
    .then((translations) => {
      applyTranslations(translations);
    })
    .catch((e) => {
      console.error("Error loading the translation file:", e);
    });
}

// Función para aplicar las traducciones a los elementos del documento
function applyTranslations(translations) {
  document.querySelectorAll("[data-translate]").forEach((elem) => {
    const key = elem.getAttribute("data-translate");
    const translation = translations[key];
    if (translation) {
      if (elem.tagName === "INPUT" && elem.type === "text") {
        elem.placeholder = translation; // Para inputs de texto, cambia el placeholder
      } else {
        elem.textContent = translation; // Para el resto, cambia el texto contenido
      }
    }
  });
}

// Función que cambia el idioma y recarga las traducciones
function changeLanguage(lang) {
  loadTranslations(lang);
}

// Cargamos el idioma por defecto cuando se carga la página
document.addEventListener("DOMContentLoaded", () => {
  loadTranslations("es");
});

// FUNCIONES PARA REDIRIGIR
function redirectToReservas() {
  window.location.href = "../../../Vista/Reservas/reservas.html";
}

function redirectToNosotros() {
  window.location.href = "../../../Vista/Nosotros/nosotros.html";
}

function redirectToInicio() {
  window.location.href = "../../../index.html";
}

function redirectToCarta() {
  window.location.href = "../../../Vista/Menu/Carta/carta.html";
}

function redirectToGaleria() {
  window.location.href = "../../../Vista/Menu/Galeria/galeria.html";
}

function redirectToCartaPareja() {
  window.location.href = "../../../Vista/Menu/Carta-Pareja/cartaPareja.html";
}

function redirectToCartaInfantil() {
  window.location.href =
    "../../../Vista/Menu/Carta-Infantil/cartaInfantil.html";
}

function redirectToUbicacion() {
  window.location.href = "../../../Vista/Ubicacion/ubicacion.html";
}
