import { AppError } from "../errors/app.error.js";

export const errorHandler = (err, req, res, next) => {
    console.error(err);

    if (err instanceof AppError) {
        return res.status(err.statusCode).json({
            success: false,
            error: {
                code: err.code,
                message: err.message,
                details: err.details || null
            }
        });
    }

    if (err.code === "23505") {
        return res.status(409).json({
            success: false,
            error: {
                code: "DATABASE_CONFLICT",
                message: "Duplicate value",
            }
        });
    }

    if (err.code === "23503") {
        return res.status(400).json({
            success: false,
            error: {
                code: "INVALID_REFERENCE",
                message: "Invalid foreign key reference",
            }
        });
    }

    return res.status(500).json({
        success: false,
        error: {
            code: "INTERNAL_ERROR",
            message: "Something went wrong"
        }
    });
};