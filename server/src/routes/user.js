import { Router } from 'express';

import schemaValidator from '../utils/schema-validator';
import userSchema from '../schemas/user';

import UserController from '../controllers/user';

export default class User {
  constructor() {
    this.userController = new UserController();
  }

  setup() {
    const router = new Router();

    router.post('/', schemaValidator.validate(userSchema.login), this.userController.login);

    return router;
  }
}
