import RestaurantsManager, {
  Dish,
  Category,
  Allergen,
  Restaurant,
  Menu,
  Coordinate,
} from "./Models/restaurantModel.js";

import RestaurantController from "./Controllers/restaurantController.js";
import RestaurantView from "./Views/restaurantView.js";
import AuthenticationService from "./Utils/authentication.js";

const RestaurantApp = new RestaurantController(
  RestaurantsManager.getInstance(),
  new RestaurantView(),
  AuthenticationService.getInstance()
);

export default RestaurantApp;
