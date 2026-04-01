import bcrypt from "bcrypt";
import * as userRepository from "./user.repository.js";
import { AppError, mapDatabaseError } from "../../middleware/middleware.js";

export const getUsers = async () => {
    return await userRepository.getUsers();
};

export const createUser = async ({ email, password, avatarUrl }) => {
    const existingUser = await userRepository.getUserByEmail(email);

    if (existingUser) {
        throw new AppError("The email is already registered", 409, "USER_EMAIL_ALREADY_EXISTS", {
            field: "email",
            issue: "already_exists"
        });
    }

    const passwordHash = await bcrypt.hash(password, 10);

    try {
        const user = await userRepository.createUser({
            email,
            passwordHash,
            avatarUrl,
        });

        return user;
    } catch (error) {
        const mappedError = mapDatabaseError(error);
        if (mappedError) throw mappedError;

        throw error;
    }
};

export const updateUser = async ({ email, avatarUrl }, id) => {
    if (email !== undefined) {
        const existingUser = await userRepository.getUserByEmail(email);

        if (existingUser && existingUser?.id !== id) {
            throw new AppError("The email is already registered", 409, "USER_EMAIL_ALREADY_EXISTS", {
                field: "email",
                issue: "already_exists"
            });
        }
    }

    try {
        const user = await userRepository.updateUser({
            id,
            email,
            avatarUrl
        });

        return user;
    } catch (error) {
        const mappedError = mapDatabaseError(error);
        if (mappedError) throw mappedError;

        throw error;
    }
};

export const updatePasswordUser = async (id, password) => {
    const passwordHash = await bcrypt.hash(password, 10);

    try {
        const user = await userRepository.updatePassword({
            id,
            passwordHash
        });

        return user;
    } catch (error) {
        const mappedError = mapDatabaseError(error);
        if (mappedError) throw mappedError;

        throw error;
    }
};

export const getUserByEmail = async (email) => {
    try {
        return await userRepository.getUserByEmail(email);
    } catch (error) {
        const mappedError = mapDatabaseError(error);
        if (mappedError) throw mappedError;

        throw error;
    }
};

export const updateManyStatusUser = async (users) => {
    try {
        const updates = await Promise.all(
            users.map(async (user) => ({
                id: user.id,
                isActive: user.isActive,
            }))
        );

        return await userRepository.updateManyStatusUser(updates);
    } catch (error) {
        const mappedError = mapDatabaseError(error);
        if (mappedError) throw mappedError;

        throw error;
    }
};