import e from "express";

export class AppError extends Error {
    constructor(message, statusCode = 500, code = "INTERNAL_ERROR", details = null) {
        super(message);
        this.name = "AppError";
        this.statusCode = statusCode;
        this.code = code;
        this.details = details;
        this.isOperational = true;

        Error.captureStackTrace(this, this.constructor);
    }
}

export const errorHandler = (error, req, res, next) => {
    if (res.headersSent) {
        return next(error);
    }

    const isOperational = error.isOperational || false;
    const statusCode = isOperational ? error.statusCode : 500;

    const payload = {
        success: false,
        error: {
            code: isOperational ? error.code : "INTERNAL_ERROR",
            message: isOperational
                ? error.message
                : "Internal Server Error"
        },
    };

    if (error.details && isOperational) {
        payload.error.details = error.details;
    }

    if (process.env.NODE_ENV === "development") {
        payload.error.stack = error.stack;
    }

    return res.status(statusCode).json(payload);
};

export const mapDatabaseError = (error) => {
    switch (error.code) {
        case "23505":
            return new AppError(
                "The value is already registered",
                409,
                "VALUE_ALREADY_EXISTS",
            );
        case "23502":
            return new AppError(
                "Required data is missing",
                400,
                "NOT_NULL_VIOLATION",
                "Null values ​​found"
            );
        case "23503":
            return new AppError(
                "Referenced resource does not exist",
                400,
                "FOREIGN_KEY_VIOLATION"
            );
        default:
            return null;
    }
};