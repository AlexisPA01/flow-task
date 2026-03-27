import express from "express";
import cors from "cors";
import helmet from "helmet";

import routes from "./routes/index.js";
import { errorHandler } from "./middleware/middleware.js";

const app = express();

app.use(express.json());
app.use(cors({
    origin: "*"
}));
app.use(helmet());

// rutas
app.use("/api/", routes);

app.use(errorHandler);

// middleware de errores
//app.use(errorHandler);

export default app;