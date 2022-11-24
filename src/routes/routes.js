import { Router } from 'express';

import UserRoutes from './user';

export default class Routes {
  constructor() {
    this.routes = new Router();

    this.userRoutes = new UserRoutes();
  }

  load() {
    this.routes.use('/', this.userRoutes.setup());

    return this.routes;
  }
}
