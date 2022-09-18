import { Router } from "express";

import { validateSchema } from "../middlewares/validateSchema";
import tokenValidation from "../middlewares/tokenValidation";
import testsSchema from "../schemas/testsSchema";
import { registerTest } from "../controllers/testsController";

const testsRouter = Router();

testsRouter.post(
    "/register/tests",
    validateSchema(testsSchema),
    tokenValidation,
    registerTest
);

export default testsRouter;