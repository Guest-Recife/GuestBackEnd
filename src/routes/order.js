import { Router } from 'express';

import schemaValidator from '../utils/schema-validator';
import orderSchema from '../schemas/order';

import OrderController from '../controllers/order';

export default class Order {
  constructor() {
    this.orderController = new OrderController();
  }

  setup() {
    const router = new Router();

    router.post('/:register_id/create', schemaValidator.validate(orderSchema.create), this.orderController.create);
    // router.put('/:id/update', schemaValidator.validate(orderSchema.update), this.orderController.update);
    router.put('/:id/cancel', schemaValidator.validate(orderSchema.cancel), this.orderController.cancel);

    return router;
  }
}
