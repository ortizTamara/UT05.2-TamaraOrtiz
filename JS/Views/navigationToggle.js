// DESPLIEGUE MENU
// Espera a que todo el contenido del DOM esté completamente cargado
document.addEventListener("DOMContentLoaded", () => {
  // Inicializa la función jQuery una vez que el documento esté listo
  $(document).ready(function () {
    // Configura el comportamiento de clic para desplegar submenús de primer nivel
    $(".dropdown-toggle").on("click", function (e) {
      // Previene la acción por defecto del enlace para mantener al usuario en la misma página
      e.preventDefault();

      // Cierra todos los submenús abiertos excepto el actual para evitar solapamientos y desorden visual
      $(this).closest(".dropdown").siblings().find(".dropdown-menu").hide();

      // Alterna la visibilidad del submenú asociado al enlace clickeado, mostrándolo o escondiéndolo
      $(this).next(".dropdown-menu").toggle();
    });

    // Establece un manejador para expandir submenús de segundo nivel cuando el usuario pasa el mouse sobre ellos
    $(".dropdown-menu a").on("mouseover", function () {
      // Verifica que el submenú principal esté visible antes de intentar mostrar submenús adicionales
      if ($(this).parents(".dropdown-menu").is(":visible")) {
        // Oculta otros submenús en el mismo nivel para prevenir la superposición y mantener una interfaz limpia
        $(this).closest(".dropdown-menu").find(".dropdown-menu").hide();

        // Muestra el submenú de segundo nivel asociado al enlace sobre el que se encuentra el mouse
        $(this).next(".dropdown-menu").show();
      }
    });

    // Maneja el evento de salir del área del submenú para esconderlo y mantener una interfaz limpia
    $(".dropdown-menu").on("mouseleave", function () {
      $(this).hide();
    });

    // Cierra todos los submenús si se hace clic en cualquier área fuera de los menús desplegables
    $("body").on("click", function (e) {
      if (!$(e.target).closest(".dropdown").length) {
        $(".dropdown-menu").hide();
      }
    });

    // Gestiona el cierre del menú de navegación completo cuando se selecciona algún ítem no asociado a un menú desplegable
    $(".nav-item a")
      .not(".dropdown-toggle")
      .on("click", function () {
        $(".navbar-collapse").collapse("hide");
      });
  });
});

// function redirectToInicio() {
//   window.location.href = "../../../index.html";
// }
