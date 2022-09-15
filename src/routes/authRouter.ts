import { Router } from "express";

import { validateSchema } from "../middlewares/validateSchema.js";
import authSchema from "../schemas/authSchema.js";
import { signUp, signIn } from "../controllers/authController.js";

const authRouter = Router();

authRouter.post(
    "/signup",
    validateSchema(authSchema),
    signUp
);

authRouter.post(
    "/signin",
    validateSchema(authSchema),
    signIn
)

export default authRouter;