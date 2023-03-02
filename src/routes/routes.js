import { Router } from 'express';

import UserRoutes from './user';
import RestaurantRoutes from './restaurant';
import FoodCategory from './food-category';
import FoodItem from './food-item';

export default class Routes {
  constructor() {
    this.routes = new Router();

    this.userRoutes = new UserRoutes();
    this.restaurantRoutes = new RestaurantRoutes;
    this.foodCategoryRoutes = new FoodCategory;
    this.foodItemRoutes = new FoodItem;
  }

  load() {
    this.routes.use('/', this.userRoutes.setup());
    this.routes.use('/restaurant', this.restaurantRoutes.setup());
    // this.routes.use('/food-category', this.foodCategoryRoutes.setup());
    // this.routes.use('/food-item', this.foodItemRoutes.setup());

    return this.routes;
  }
}
