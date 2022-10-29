import { Router } from 'express';

import TokenCtrl from '../controllers/token';
import Validate from '../schemas/validate';
import TokenSchema from '../schemas/token';

const routes = new Router();

routes.post('/', Validate(TokenSchema), TokenCtrl.generateToken);

export default routes;
