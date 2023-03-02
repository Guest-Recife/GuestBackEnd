import { Router } from 'express';

import schemaValidator from '../utils/schema-validator';
import foodCategorySchema from '../schemas/food-category';

import FoodCategoryController from '../controllers/food-category';

export default class FoodCategory {
  constructor() {
    this.foodCategoryController = new FoodCategoryController();
  }

  setup() {
    const router = new Router();

    // router.post('/', schemaValidator.validate(foodCategorySchema.create), this.foodCategoryController.create);
    // router.get('/:id', schemaValidator.validate(foodCategorySchema.list), this.foodCategoryController.list);
    // router.put('/:id', schemaValidator.validate(foodCategorySchema.update), this.foodCategoryController.update);

    return router;
  }
}
