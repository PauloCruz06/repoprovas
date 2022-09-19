import { Router } from "express";

import { validateSchema } from "../middlewares/validateSchema";
import tokenValidation from "../middlewares/tokenValidation";
import testsSchema from "../schemas/testsSchema";
import { registerTest, showTestByDiscipline } from "../controllers/testsController";

const testsRouter = Router();

testsRouter.post(
    "/register/tests",
    validateSchema(testsSchema),
    tokenValidation,
    registerTest
);

testsRouter.get(
    "/tests/disciplines",
    tokenValidation,
    showTestByDiscipline
)

export default testsRouter;