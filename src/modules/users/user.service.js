import bcrypt from "bcrypt";
import * as userRepository from "./user.repository.js";
import { validateUserEmailExists, validateUserExists } from "../../validators/user.validator.js";

export const getUsers = async () => {
    return userRepository.getUsers();
};

export const createUser = async ({ email, password, avatarUrl }) => {
    await validateUserEmailExists(email);

    const passwordHash = await bcrypt.hash(password, 10);

    return userRepository.createUser({
        email,
        passwordHash,
        avatarUrl,
    });
};

export const updateUser = async ({ email, avatarUrl }, id) => {
    if (email !== undefined) {
        await validateUserEmailExists(email);
    }

    await validateUserExists(id);

    return userRepository.updateUser({
        id,
        email,
        avatarUrl
    });
};

export const updatePasswordUser = async (id, password) => {
    await validateUserExists(id);

    const passwordHash = await bcrypt.hash(password, 10);

    return userRepository.updatePassword({
        id,
        passwordHash
    });
};

export const getUserByEmail = async (email) => {
    return await validateUserEmailExists(email);
};

export const updateManyStatusUser = async (users) => {
    const updates = await Promise.all(
        users.map(async (user) => ({
            id: user.id,
            isActive: user.isActive,
        }))
    );

    return await userRepository.updateManyStatusUser(updates);
};