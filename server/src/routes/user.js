import { Router } from 'express';

import schemaValidator from '../utils/schema-validator';
import userSchema from '../schemas/user';

import authMiddleware from '../middlewares/auth';
import UserController from '../controllers/user';

export default class User {
  constructor() {
    this.userController = new UserController();
  }

  setup() {
    const router = new Router();

    router.post('/', schemaValidator.validate(userSchema.login), this.userController.login);
    router.post('/sign-up', schemaValidator.validate(userSchema.register), this.userController.register);

    router.use(authMiddleware);

    router.get('/user', this.userController.find);
    router.put('/user', schemaValidator.validate(userSchema.update), this.userController.update);
    router.delete('/user', this.userController.delete);

    return router;
  }
}
