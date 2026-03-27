import { db } from "../../config/database.js";

export const findAll = async () => {
    const result = await db.query("SELECT id, email, avatar_url, is_active FROM users");

    return result.rows;
};

export const create = async ({ email, passwordHash, avatarUrl }) => {
    const result = await db.query(
        `INSERT INTO users (email, password_hash, avatar_url)
     VALUES ($1, $2, $3)
     RETURNING id, email, avatar_url, is_active, created_at`,
        [email, passwordHash, avatarUrl || null]
    );

    return result.rows[0];
};

export const update = async ({ id, email, avatarUrl }) => {
    const result = await db.query(
        `update users set email = $1, avatar_url = $2, updated_at = $3 where id = $4`, [email, avatarUrl, new Date().toISOString(), id]
    );

    return result.rows[0];
};

export const updatePassword = async ({ id, passwordHash }) => {
    const result = await db.query(
        `update users set password_hash = $1, updated_at = $2 where id = $3`, [passwordHash, new Date().toISOString(), id]
    );

    return result.rows[0];
};

export const findByEmail = async (email) => {
    const result = await db.query(
        "SELECT * FROM users WHERE email = $1",
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