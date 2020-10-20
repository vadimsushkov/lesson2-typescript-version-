import UserModel from '../User/model';
import * as jwt from 'jsonwebtoken';
import redis from '../../config/redisConnection';
import ValidTypeReq from '../interfaces/validate-api-input.interfaces';

export default {

    async signUp(profile: ValidTypeReq) {
        await UserModel.create(profile);
    },

    async relationIdToRefreshToken(userId: string, refreshToken: string) {
        redis.set(userId, refreshToken);
        redis.expire(refreshToken, 86400);
    },

    async updateExistingUserRefreshToken(userId: string, refreshToken: string) {
        return redis.set(userId, refreshToken);
    },

    async findUserByEmail(email: string) {
        return UserModel.findOne({ email }).exec();
    },

    async findRefreshTokenById(userId: string) {
        //const RefreshToken = await redis.getAsync(userId);

        //return RefreshToken;
    },

    async deleteRefreshTokenById(userId: string) {
        return redis.del(userId);
    },

    async deleteAllRefreshTokens() {
        return redis.flushall();
    },

    async generateTokens(payloadId, payloadEmail, method: (arg0: any, arg1: any) => void) {
        const newPayload = { id: payloadId.toString(), email: payloadEmail };
        const accessToken = jwt.sign(newPayload, process.env.ACCESS_TOKEN_SECRET, { expiresIn: '1m' });
        const refreshToken = jwt.sign(newPayload, process.env.REFRESH_TOKEN_SECRET, { expiresIn: '7d' });

        await method(payloadId, refreshToken);

        return { accessToken, refreshToken };
    },
};


