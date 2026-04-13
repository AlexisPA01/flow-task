import { AppError } from "./app.error.js";

export class BadRequestError extends AppError {
    constructor(message = "Bad request", details = null) {
        super(message, 400, "BAD_REQUEST", details);
    }
}