import { Router } from 'express';

import schemaValidator from '../utils/schema-validator';
import foodItemSchema from '../schemas/food-item';

import FoodItemController from '../controllers/food-item';

export default class FoodItem {
  constructor() {
    this.foodItemController = new FoodItemController();
  }

  setup() {
    const router = new Router();

    // router.post('/', schemaValidator.validate(foodItemSchema.create), this.foodItemController.create);
    // router.get('/:id', schemaValidator.validate(foodItemSchema.list), this.foodItemController.list);
    // router.put('/:id', schemaValidator.validate(foodItemSchema.update), this.foodItemController.update);

    return router;
  }
}
