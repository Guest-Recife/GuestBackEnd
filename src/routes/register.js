import { Router } from 'express';

import schemaValidator from '../utils/schema-validator';
import registerSchema from '../schemas/register';

import RegisterController from '../controllers/register';

export default class Register {
  constructor() {
    this.registerController = new RegisterController();
  }

  setup() {
    const router = new Router();

    router.post('/:restaurant_id/create', schemaValidator.validate(registerSchema.create), this.registerController.create);
    // router.put('/:id/close', schemaValidator.validate(registerSchema.close), this.registerController.close);

    return router;
  }
}
