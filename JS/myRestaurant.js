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

  showRestaurant: (event) => {
    console.log(event.state);
    RestaurantApp.handleShowRestaurant(event.state.args);
  },
};
history.replaceState({ action: "init" }, null);
