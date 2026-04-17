import bcrypt from "bcrypt";
import jwt from 'jsonwebtoken';
import * as userRepository from "./user.repository.js";
import { validateUserEmailExists, validateUserExists } from "../../validators/user.validator.js";
import { UnauthorizedError } from "../../errors/unauthorized.error.js";
import { env } from "../../config/env.js";
import * as organizationRepository from "../organizations/organizations.repository.js";
import * as activityLogService from "../activity-logs/activity-logs.service.js";
import { asyncLocalStorage } from "../../utils/contextHandler.js";

const saltRounds = 10;

export const getUsers = async () => {
    const users = await userRepository.getUsers();

    const store = asyncLocalStorage.getStore();

    await activityLogService.createActivityLog({
        action: "READ",
        entityType: "users",
        entityId: null,
        metadata:
        {
            payload: {},
            meta: {
                userId: store?.userId,
                timestamp: new Date().toISOString()
            }
        },
        organizationId: store?.organizationId,
        userId: store?.userId
    });

    return users;
};

export const createUser = async ({ email, password, avatarUrl }) => {
    await validateUserEmailExists(email);

    const passwordHash = await bcrypt.hash(password, saltRounds);

    const user = await userRepository.createUser({
        email,
        passwordHash,
        avatarUrl,
    });

    const store = asyncLocalStorage.getStore();

    await activityLogService.createActivityLog({
        action: "CREATE",
        entityType: "users",
        entityId: user.id,
        metadata:
        {
            payload: {
                email,
                avatar_url: avatarUrl,
            },
            meta: {
                userId: store?.userId,
                timestamp: new Date().toISOString()
            }
        },
        organizationId: store?.organizationId,
        userId: store?.userId
    });

    return user;
};

export const updateUser = async ({ email, avatarUrl }, id) => {
    if (email !== undefined) {
        await validateUserEmailExists(email);
    }

    const existing = await validateUserExists(id);

    const user = await userRepository.updateUser({
        id,
        email,
        avatarUrl
    });

    const changes = {};

    if (email !== undefined && email !== existing.email) {
        changes.email = { from: existing.email, to: email };
    }

    if (avatarUrl !== undefined && avatarUrl !== existing.avatarUrl) {
        changes.avatar_url = { from: existing.avatar_url, to: avatarUrl };
    }

    const store = asyncLocalStorage.getStore();

    await activityLogService.createActivityLog({
        action: "UPDATE",
        entityType: "users",
        entityId: id,
        metadata:
        {
            payload: {
                before: {
                    email: existing.email,
                    avatar_url: existing.avatar_url
                },
                after: {
                    email: user.email,
                    avatar_url: user.avatar_url
                },
                changes
            },
            meta: {
                userId: store?.userId,
                timestamp: new Date().toISOString()
            }
        },
        organizationId: store?.organizationId,
        userId: store?.userId
    });

    return user;
};

export const updatePasswordUser = async (id, password) => {
    const existing = await validateUserExists(id);

    const passwordHash = await bcrypt.hash(password, 10);

    const user = await userRepository.updatePassword({
        id,
        passwordHash
    });

    const changes = {};

    if (password !== undefined && passwordHash !== existing.password_hash) {
        changes.password_hash = { from: existing.password_hash, to: passwordHash };
    }

    const store = asyncLocalStorage.getStore();

    await activityLogService.createActivityLog({
        action: "UPDATE",
        entityType: "users",
        entityId: id,
        metadata:
        {
            payload: {
                before: {
                    password_hash: existing.password_hash
                },
                after: {
                    password_hash: user.password_hash
                },
                changes
            },
            meta: {
                userId: store?.userId,
                timestamp: new Date().toISOString()
            }
        },
        organizationId: store?.organizationId,
        userId: store?.userId
    });

    return user;
};

export const getUserByEmail = async (email) => {
    const user = await validateUserEmailExists(email);

    const store = asyncLocalStorage.getStore();

    await activityLogService.createActivityLog({
        action: "READ",
        entityType: "users",
        entityId: email,
        metadata:
        {
            payload: {
                email
            },
            meta: {
                userId: store?.userId,
                timestamp: new Date().toISOString()
            }
        },
        organizationId: store?.organizationId,
        userId: store?.userId
    });

    return user;
};

export const getUserById = async (id) => {
    const user = await validateUserExists(id);

    const store = asyncLocalStorage.getStore();

    await activityLogService.createActivityLog({
        action: "READ",
        entityType: "users",
        entityId: id,
        metadata:
        {
            payload: {
                id
            },
            meta: {
                userId: store?.userId,
                timestamp: new Date().toISOString()
            }
        },
        organizationId: store?.organizationId,
        userId: store?.userId
    });

    return user;
};

export const updateManyStatusUser = async (users) => {
    const existingUsers = await userRepository.getUsersByIds(
        users.map(u => u.id)
    );

    const updates = users.map(user => ({
        id: user.id,
        isActive: user.isActive,
    }));

    const updatedUsers = await userRepository.updateManyStatusUser(updates);

    const changes = users.map(user => {
        const existing = existingUsers.find(e => e.id === user.id);
        return {
            id: user.id,
            ...(existing && {
                before: {
                    is_active: existing?.is_active
                }
            }),
            ...(existing && {
                after: {
                    is_active: user.isActive
                }
            }),
            ...(!existing && {
                notFound: true
            }),
        };
    });

    const store = asyncLocalStorage.getStore();

    await activityLogService.createActivityLog({
        action: "UPDATE",
        entityType: "users",
        entityId: null,
        metadata: {
            payload: {
                updatedCount: changes.filter(x => !x.notFound).length,
                notUpdatedCount: changes.filter(x => x.notFound).length,
                changes
            },
            meta: {
                userId: store?.userId,
                timestamp: new Date().toISOString(),
                operationType: "bulk"
            }
        },
        organizationId: store?.organizationId,
        userId: store?.userId
    });

    return updatedUsers;
};

const generateAccessToken = (user, organization) => {
    return jwt.sign(
        {
            userId: user.id,
            organizationId: organization.id
        },
        env.secretJWT,
        {
            expiresIn: "15m",
        }
    );
};

const generateRefreshToken = (user, organization) => {
    return jwt.sign(
        {
            userId: user.id,
            organizationId: organization.id
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

    const organization = await organizationRepository.getOrganizationByUserId(user.id);

    const refreshToken = generateRefreshToken(user, organization);
    const accessToken = generateAccessToken(user, organization);

    await userRepository.saveRefreshToken(user.id, refreshToken);

    const store = asyncLocalStorage.getStore();

    await activityLogService.createActivityLog({
        action: "LOGIN",
        entityType: "users",
        entityId: email,
        metadata:
        {
            payload: {
                email
            },
            meta: {
                email,
                timestamp: new Date().toISOString()
            }
        },
        organizationId: organization.id,
        userId: user.id
    });

    return {
        accessToken,
        refreshToken
    }
};
