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
  showDishes: (event) => {
    RestaurantApp.handleDishes(event.state.args);
  },
  ShowCategory: (event) => {
    RestaurantApp.handleShowCategory(event.state.args);
  },
  showMenu: (event) => {
    RestaurantApp.handleShowMenu(event.state.args);
  },
  showRestaurant: (event) => {
    RestaurantApp.handleShowRestaurant(event.state.args);
  },
  showAllergen: (event) => {
    RestaurantApp.handleShowAllergen(event.state.args);
  },
  showDishInCategory: (event) => {
    RestaurantApp.handleDishes(event.state.args);
  },
  showDishesFromCategory: (event) => {
    RestaurantApp.handleShowCategory(event.state.args);
  },
  ShowSingleMenu: () => RestaurantApp.handleMenu(),
  ShowSingleAllergen: () => RestaurantApp.handleAllergen(),
};
history.replaceState({ action: "init" }, null);
