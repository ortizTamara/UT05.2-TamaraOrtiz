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
