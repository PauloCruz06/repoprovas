import { Router } from "express";

import { validateSchema } from "../middlewares/validateSchema";
import tokenValidation from "../middlewares/tokenValidation";
import testsSchema from "../schemas/testsSchema";
import { registerTest, showTestByDiscipline, showTestByTeacher } from "../controllers/testsController";

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
testsRouter.get(
    "/tests/teachers",
    tokenValidation,
    showTestByTeacher
)

export default testsRouter;