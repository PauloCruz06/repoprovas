import { Router } from "express";
import authRouter from "./authRouter";
import testsRouter from "./testsRouter";

const router = Router();

router.use(authRouter);
router.use(testsRouter);

export default router;