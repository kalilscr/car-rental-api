import { Router } from "express";

import { CreateSpecificationController } from "../../../../modules/cars/useCases/createSpecification/CreateSpecificationController";
import { ListSpecificationsController } from "../../../../modules/cars/useCases/listSpecifications/ListSpecificationsController";

import { ensureAuthenticated } from "../middlewares/ensureAuthenticated";
import { ensureAdmin } from "../middlewares/ensureAdmin";

const specificationsRoutes = Router();

const createSpecificationController = new CreateSpecificationController();
const listSpecificationsController = new ListSpecificationsController();

//specificationsRoutes.use(ensureAuthenticated); // assim todas as rotas abaixo estarão protegidas(estarão passando pelo middleware)
// rotas que usam o middleware pra baixo e as que não precisam de middleware pra cima do specificationsRoutes.use()
specificationsRoutes.post(
    "/", 
    ensureAuthenticated,
    ensureAdmin,
    createSpecificationController.handle
    );

specificationsRoutes.get("/", listSpecificationsController.handle);

export { specificationsRoutes };
