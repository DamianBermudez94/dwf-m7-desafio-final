"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.UserController = void 0;
const models_1 = require("../models");
const utils_1 = require("../lib/utils");
const jwt = require("jsonwebtoken");
const utils_2 = require("../lib/utils");
class UserController {
    async createUser(data) {
        const { email, fullname, password } = data;
        const user = await models_1.User.create({
            fullname,
            email,
            password: (0, utils_1.getSHA256)(password),
        });
        return user;
    }
    async getMe(userId) {
        const user = await models_1.User.findByPk(userId);
        if (user) {
            return { fullname: user.get("fullname"), email: user.get("email") };
        }
        else {
            return { message: "not found" };
        }
    }
    async getToken(data) {
        const { email, password } = data;
        const user = await models_1.User.findOne({
            where: { email, password: (0, utils_1.getSHA256)(password) },
        });
        if (user) {
            const token = jwt.sign({ id: user.get("id") }, utils_2.SECRET);
            return { token };
        }
        else {
            return { error: "email or password incorrect" };
        }
    }
    async findByEmail(email) {
        const user = await models_1.User.findOne({ where: { email } });
        return user ? true : false;
    }
    async findById(userId) {
        const user = await models_1.User.findByPk(userId);
        return user;
    }
    async updateUser(userId, data) {
        const { fullname, password } = data;
        if (fullname && password) {
            await models_1.User.update({ fullname, password: (0, utils_1.getSHA256)(password) }, { where: { id: userId } });
        }
        else if (fullname) {
            await models_1.User.update({ fullname }, { where: { id: userId } });
        }
        else if (password) {
            await models_1.User.update({ password: (0, utils_1.getSHA256)(password) }, { where: { id: userId } });
        }
        return true;
    }
}
exports.UserController = UserController;
