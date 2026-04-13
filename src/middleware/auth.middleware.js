import jwt from "jsonwebtoken";
import { env } from "../config/env.js";
import * as userRepository from "../modules/users/user.repository.js";

export const authMiddleware = async (req, res, next) => {
    const authHeader = req.headers.authorization;
    const refreshToken = req.headers["x-refresh-token"];

    if (!authHeader) {
        return res.status(401).json({ message: "No token provided" });
    }

    const token = authHeader.split(" ")[1];

    try {
        const decoded = jwt.verify(token, env.secretJWT);

        req.user = decoded;
        next();
    } catch (error) {
        if (error.name !== "TokenExpiredError") {
            return res.status(403).json({ message: "Invalid token" });
        }

        if (!refreshToken) {
            return res.status(401).json({ message: "Refresh token required" });
        }

        try {
            const decodedRefresh = jwt.verify(refreshToken, env.refreshSecretJWT);

            const storedToken = await userRepository.getRefreshToken(decodedRefresh.userId);

            if (storedToken !== refreshToken) {
                return res.status(403).json({ message: "Invalid refresh token" });
            }

            const newAccessToken = jwt.sign(
                { userId: decodedRefresh.userId },
                env.secretJWT,
                { expiresIn: "15m" }
            );

            res.setHeader("x-access-token", newAccessToken);

            req.user = { userId: decodedRefresh.userId };

            return next();

        } catch (err) {
            return res.status(403).json({ message: "Invalid refresh token" });
        }
    }
};