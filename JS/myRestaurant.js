import RestaurantApp from "./restaurantApp.js";

window.addEventListener("popstate", (event) => {
  if (event.state) {
    historyActions[event.state.action](event);
  }
});

const historyActions = {
  init: () => {
    RestaurantApp.onInit();
  },
  ShowCategory: (event) => {
    RestaurantApp.handleShowCategory(event.state.args);
  },
  // ShowMenu: () => {
  //   RestaurantApp.handleMenu();
  // },
  showRestaurant: (event) => {
    RestaurantApp.handleShowRestaurant(event.state.args);
  },
  showDishInCategory: (event) => RestaurantApp.handleDishes(event.state.args),

  ShowSingleMenu: (event) => RestaurantApp.handleShowMenu(event.state.args),
  ShowSingleMenu: (event) => RestaurantApp.handleShowAllergen(event.state.args),
};
history.replaceState({ action: "init" }, null);

// TODO: Cuando le doy clic a un plato, al echar para atras debe de mostrarme todos los platos de nuevo
// TODO: Cuando le doy a un Menu, y le doy para atras me pasa como antes, que no recojo la información.
