import { Router } from 'express';

import User from './user';
import Restaurant from './restaurant';
import FoodCategory from './food-category';
import FoodItem from './food-item';
import Table from './table';

export default class Routes {
  constructor() {
    this.routes = new Router();

    this.userRoutes = new User;
    this.restaurantRoutes = new Restaurant;
    this.foodCategoryRoutes = new FoodCategory;
    this.foodItemRoutes = new FoodItem;
    this.tableRoutes = new Table;
  }

  load() {
    this.routes.use('/', this.userRoutes.setup());
    this.routes.use('/restaurant', this.restaurantRoutes.setup());
    // this.routes.use('/food-category', this.foodCategoryRoutes.setup());
    // this.routes.use('/food-item', this.foodItemRoutes.setup());
    // this.routes.use('/table', this.tableRoutes.setup());

    return this.routes;
  }
}
