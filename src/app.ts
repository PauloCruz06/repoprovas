import express from "express";
import cors from "cors";
import "express-async-errors";

import router from "./routes/index.js";
import { errorHandler } from "./middlewares/errorHandler.js";

const app = express();

app.use(express.json());
app.use(cors());
app.use(router);
app.use(errorHandler);

export default app;