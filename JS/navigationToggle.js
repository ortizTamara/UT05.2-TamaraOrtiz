// DESPLIEGUE MENU
document.addEventListener("DOMContentLoaded", () => {
  $(document).ready(function () {
    // Cierra todos los submenús cuando se abre uno nuevo
    $(".dropdown-submenu a.dropdown-toggle").on("mouseover", function (e) {
      // Oculta todos los submenús
      $(".dropdown-submenu .dropdown-menu").hide();
      // Muestra el submenú correspondiente a este enlace
      $(this).next("ul").toggle();
      e.stopPropagation();
    });

    // Despliegue para los submenús en hover
    $(".dropdown-toggle").on("mouseover", function () {
      // Muestra el menú desplegable asociado directamente
      $(this).next(".dropdown-menu").show();
    });

    // Asegurar que los submenús permanezcan abiertos mientras el usuario está sobre ellos
    $(".dropdown-menu").on("mouseleave", function () {
      $(this).hide();
    });

    // Cerrar submenús al hacer clic fuera de ellos
    $("body").click(function (e) {
      if (!$(e.target).is(".dropdown, .dropdown *")) {
        $(".dropdown-menu").hide();
      }
    });

    // Específico: cerrar menú al seleccionar un item
    $(".nav-item a")
      .not(".dropdown-toggle")
      .click(function () {
        $(".navbar-collapse").collapse("hide");
      });
  });
});
