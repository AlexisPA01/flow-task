import { AppError } from "./app.error.js";

export class AlreadyExists extends AppError {
    constructor(message = "Resource already exists") {
        super(message, 404, "ALREADY_EXISTS");
    }
}