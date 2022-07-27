import { Router } from 'express';

import tokenRoutes from './token';

const routes = new Router();

routes.use('/tokens', tokenRoutes);

export default routes;