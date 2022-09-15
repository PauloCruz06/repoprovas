import { Router } from "express";

import { validateSchema } from "../middlewares/validateSchema";
import authSchema from "../schemas/authSchema";
import { signUp, signIn } from "../controllers/authController";

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