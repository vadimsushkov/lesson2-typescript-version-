"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
const jwt = require("jsonwebtoken");
const service_1 = require("./service");
const validation_1 = require("./validation");
async function signIn(req, res, next) {
    const { value, error } = validation_1.default.signIn(req.body);
    if (error)
        throw error;
    const user = await service_1.default.findUserByEmail(value.email);
    if (!user)
        res.status(404).json({ message: 'User is not found', statusCode: 404 });
    const { accessToken, refreshToken } = await service_1.default.generateTokens(user.id, value.email, service_1.default.relationIdToRefreshToken);
    res.header('Authorization', accessToken).status(200).json({ data: { accessToken, refreshToken } });
}
exports.signIn = signIn;
async function currentUser(req, res, next) {
    const authToken = req.header('authorization');
    const token = authToken && authToken.split(' ')[1];
    const user = jwt.verify(token, process.env.ACCESS_TOKEN_SECRET);
    if (!user)
        res.status(404).json({ message: 'User is not found', statusCode: 404 });
    res.status(200).json({ message: 'Your current data', data: { email: user.email, id: user.id } });
}
exports.currentUser = currentUser;
async function refresh(req, res, next) {
    const { value, error } = validation_1.default.token(req.body);
    console.log(value);
    if (error)
        throw error;
    return jwt.verify(value.refreshToken, process.env.REFRESH_TOKEN_SECRET, async (err, payload) => {
        if (err)
            return res.sendStatus(403);
        const oldRefreshToken = await service_1.default.findRefreshTokenById(payload.id);
        if (oldRefreshToken == null)
            return res.status(400).json({ message: 'RefreshToken has been expired' });
        const { accessToken, refreshToken } = await (service_1.default.generateTokens(payload.id, payload.email, service_1.default.updateExistingUserRefreshToken));
        return res.status(200).json({ data: { accessToken, refreshToken } });
    });
}
exports.refresh = refresh;
async function signOut(req, res, next) {
    const { value, error } = validation_1.default.signOut(req.body);
    console.log(req.body);
    if (error)
        throw error;
    const user = await service_1.default.findUserByEmail(value.email);
    console.log(user);
    await service_1.default.deleteRefreshTokenById(value.email.toString());
    res.status(200).json({ message: 'You are signed out', data: null });
}
exports.signOut = signOut;
async function signUp(req, res, next) {
    const { error } = validation_1.default.signUp(req.body);
    if (error)
        throw error;
    const user = await service_1.default.signUp(req.body);
    res.status(200).json({ message: 'User has been created', data: { user } });
}
exports.signUp = signUp;
async function signOutAll(req, res, next) {
    await service_1.default.deleteAllRefreshTokens();
    res.status(200).json({ message: 'All users have been signed out' });
}
exports.signOutAll = signOutAll;
