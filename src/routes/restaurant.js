import { Router } from 'express';

import schemaValidator from '../utils/schema-validator';
import restaurantSchema from '../schemas/restaurant';

import RestaurantController from '../controllers/restaurant';

export default class Restaurant {
  constructor() {
    this.restaurantController = new RestaurantController();
  }

  setup() {
    const router = new Router();

    router.get('/restaurant/:id', schemaValidator.validate(restaurantSchema.find), this.restaurantController.find);
    router.update('/restaurant/:id', schemaValidator.validate(restaurantSchema.update), this.restaurantController.update);

    return router;
  }
}
