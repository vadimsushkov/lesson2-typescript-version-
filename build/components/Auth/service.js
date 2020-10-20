"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
const model_1 = require("../User/model");
const jwt = require("jsonwebtoken");
const redisConnection_1 = require("../../config/redisConnection");
exports.default = {
    async signUp(profile) {
        await model_1.default.create(profile);
    },
    async relationIdToRefreshToken(userId, refreshToken) {
        redisConnection_1.default.set(userId, refreshToken);
        redisConnection_1.default.expire(refreshToken, 86400);
    },
    async updateExistingUserRefreshToken(userId, refreshToken) {
        return redisConnection_1.default.set(userId, refreshToken);
    },
    async findUserByEmail(email) {
        return model_1.default.findOne({ email }).exec();
    },
    async findRefreshTokenById(userId) {
    },
    async deleteRefreshTokenById(userId) {
        return redisConnection_1.default.del(userId);
    },
    async deleteAllRefreshTokens() {
        return redisConnection_1.default.flushall();
    },
    async generateTokens(payloadId, payloadEmail, method) {
        const newPayload = { id: payloadId.toString(), email: payloadEmail };
        const accessToken = jwt.sign(newPayload, process.env.ACCESS_TOKEN_SECRET, { expiresIn: '1m' });
        const refreshToken = jwt.sign(newPayload, process.env.REFRESH_TOKEN_SECRET, { expiresIn: '7d' });
        await method(payloadId, refreshToken);
        return { accessToken, refreshToken };
    },
};
