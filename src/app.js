import express from "express";
import cors from "cors";
import helmet from "helmet";

import routes from "./routes/index.js";
import { errorHandler } from "./middleware/error.middleware.js";

import "./docs/index.js";

import { setupSwagger } from "./docs/swagger.js";
const app = express();

setupSwagger(app);
app.use(express.json());
app.use(cors({
    origin: "http://localhost:3000"
}));
app.use(helmet());

// rutas
app.use("/api/", routes);

app.use((req, res) => {
    res.status(404).json({
        success: false,
        error: {
            code: "ROUTE_NOT_FOUND",
            message: "Route not found"
        }
    });
});

app.use(errorHandler);

export default app;