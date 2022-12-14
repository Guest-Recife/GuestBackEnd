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

    router.get('/', this.restaurantController.list);
    router.get('/:id', schemaValidator.validate(restaurantSchema.find), this.restaurantController.list);
    router.put('/:id', schemaValidator.validate(restaurantSchema.update), this.restaurantController.update);

    return router;
  }
}
