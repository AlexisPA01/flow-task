import * as userService from "./user.service.js"

export const getUsers = async (req, res, next) => {
    try {
        const users = await userService.getUsers();

        res.json({
            success: true,
            data: users
        });
    } catch (error) {
        next(error);
    }
};