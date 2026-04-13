import express from "express";
import cors from "cors";
import helmet from "helmet";

import routes from "./routes/index.js";
import { errorHandler } from "./middleware/error.middleware.js";

const app = express();

app.use(express.json());
app.use(cors({
    origin: "localhost"
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