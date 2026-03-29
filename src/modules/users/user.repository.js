import { db } from "../../config/database.js";

export const getUsers = async () => {
    const result = await db.query("SELECT id, email, avatar_url, is_active FROM users");

    return result.rows;
};

export const createUser = async ({ email, passwordHash, avatarUrl }) => {
    const result = await db.query(
        `insert into users (email, password_hash, avatar_url)
     values ($1, $2, $3)
     returning id, email, avatar_url, is_active, created_at`,
        [email, passwordHash, avatarUrl || null]
    );

    return result.rows[0];
};

export const updateUser = async ({ id, email, avatarUrl }) => {
    const result = await db.query(
        `update users set email = $1, avatar_url = $2, updated_at = now() where id = $3
        returning id, email, avatar_url, is_active, created_at, updated_at`,
        [email, avatarUrl, id]
    );

    return result.rows[0];
};

export const updatePassword = async ({ id, passwordHash }) => {
    const result = await db.query(
        `update users set password_hash = $1, updated_at = now() where id = $2`, [passwordHash, id]
    );

    return result.rows[0];
};

export const getUserByEmail = async (email) => {
    const result = await db.query(
        "select * from users where email = $1",
        [email]
    );

    return result.rows[0];
};

export const updateManyStatusUser = async (users) => {
    const values = users
        .map((_, i) => `($${i * 2 + 1}, $${i * 2 + 2})`)
        .join(", ");

    const params = users.flatMap((u) => [u.id, u.isActive]);

    const result = await db.query(
        `
    update users u
    set is_active = v.is_active::boolean,
        updated_at = now()
    from (
      values ${values}
    ) as v(id, is_active)
    where u.id = v.id::uuid
    returning u.id, u.email, u.is_active, u.updated_at
    `,
        params
    );

    return result.rows;
};