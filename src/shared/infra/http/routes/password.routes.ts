import { Router } from "express";

import { SendPasswordRecoveryMailController } from "../../../../modules/accounts/useCases/sendPasswordRecoveryMail/SendPasswordRecoveryMailController";
import { ResetUserPasswordController } from "../../../../modules/accounts/useCases/resetUserPassword/ResetUserPassword.controller";

const passwordRoutes = Router();

const sendPasswordRecoveryMailController = new SendPasswordRecoveryMailController();
const resetPasswordController = new ResetUserPasswordController();

passwordRoutes.post("/recovery", sendPasswordRecoveryMailController.handle);
passwordRoutes.post("/reset", resetPasswordController.handle);

export { passwordRoutes };