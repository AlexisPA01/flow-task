import { config } from "dotenv";
import path from "path";

config({
    path: path.resolve(import.meta.dirname, '../../.env'),
    quiet: true
});

const env = {
    host: process.env.HOST || "",
    database: process.env.DATABASE || "",
    port: process.env.DB_PORT || 5432,
    user: process.env.DB_USER || "",
    password: process.env.DB_PASSWORD || "",
    environmentMode: process.env.NODE_ENV || "",
    secretJWT: process.env.SECRET_JWT || "",
    refreshSecretJWT: process.env.REFRESH_SECRET_JWT || ""
}

export { env };