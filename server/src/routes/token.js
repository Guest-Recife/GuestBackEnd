import { Router } from "express";

import TokenCtrl from "../controllers/TokenCtrl";
import Validate from "../schemas/Validate";
import TokenSchema from "../schemas/Token";

const routes = new Router();

routes.post('/', Validate(TokenSchema), TokenCtrl.generateToken)

export default routes;
