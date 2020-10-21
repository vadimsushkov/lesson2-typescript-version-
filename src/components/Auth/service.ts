import UserModel from '../User/model';
import * as jwt from 'jsonwebtoken';
import redis from '../../config/redisConnection';
import ValidTypeReq from '../shared/interfaces/validate-api-input.interfaces';
import {Types} from "mongoose";

export default {

    signUp(profile: ValidTypeReq) {
        return UserModel.create(profile);
    },

    relationIdToRefreshToken(userId: string, refreshToken: string) {
        redis.set(userId, refreshToken);
        redis.expire(refreshToken, 86400);
    },

    updateExistingUserRefreshToken(userId: string, refreshToken: string) {
        redis.set(userId, refreshToken);
    },

    findUserByEmail(email: string) {
        return UserModel.findOne({ email }).exec();
    },

    findRefreshTokenById(userId: Types.ObjectId) {
        return redis.get(String(userId));
    },

    deleteRefreshTokenById(userId: string) {
        return redis.del(userId);
    },

    deleteAllRefreshTokens() {
        return redis.flushall();
    },

    async generateTokens(payloadId, payloadEmail, method: (arg0: string, arg1: string) => void) {
        const newPayload = { id: payloadId.toString(), email: payloadEmail };
        const accessToken = jwt.sign(newPayload, process.env.ACCESS_TOKEN_SECRET, { expiresIn: '1m' });
        const refreshToken = jwt.sign(newPayload, process.env.REFRESH_TOKEN_SECRET, { expiresIn: '7d' });

        await method(payloadId, refreshToken);

        return { accessToken, refreshToken };
    },
};


