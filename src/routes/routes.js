import { Router } from 'express';

import UserRoutes from './user';
import RestaurantRoutes from './restaurant';

export default class Routes {
  constructor() {
    this.routes = new Router();

    this.userRoutes = new UserRoutes();
    this.restaurantRoutes = new RestaurantRoutes;
  }

  load() {
    this.routes.use('/', this.userRoutes.setup());
    this.routes.use('/restaurant', this.restaurantRoutes.setup());

    return this.routes;
  }
}
