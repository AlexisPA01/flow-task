import bcrypt from "bcrypt";
import jwt from 'jsonwebtoken';
import * as userRepository from "./user.repository.js";
import { validateUserEmailExists, validateUserExists } from "../../validators/user.validator.js";
import { UnauthorizedError } from "../../errors/unauthorized.error.js";
import { env } from "../../config/env.js";

const saltRounds = 10;

export const getUsers = async () => {
    return userRepository.getUsers();
};

export const createUser = async ({ email, password, avatarUrl }) => {
    await validateUserEmailExists(email);

    const passwordHash = await bcrypt.hash(password, saltRounds);

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

const generateAccessToken = (user) => {
    return jwt.sign(
        {
            userId: user.id,
        },
        env.secretJWT,
        {
            expiresIn: "15m",
        }
    );
};

const generateRefreshToken = (user) => {
    return jwt.sign(
        {
            userId: user.id,
        },
        env.refreshSecretJWT,
        {
            expiresIn: "7d",
        }
    );
};

export const login = async ({ email, password }) => {
    const user = await validateUserEmailExists(email);

    const passwordCheck = await bcrypt.compare(password, user.password_hash);

    if (!passwordCheck) {
        throw new UnauthorizedError(
            "Email or password wrong",
            { email, password }
        );
    }

    const refreshToken = generateRefreshToken(user);
    const accessToken = generateAccessToken(user);

    await userRepository.saveRefreshToken(user.id, refreshToken);

    return {
        accessToken,
        refreshToken
    }
};
