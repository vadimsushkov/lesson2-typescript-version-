"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
const Joi = require("@hapi/joi");
const validation_1 = require("../validation");
class AuthValidation extends validation_1.default {
    static signIn(params) {
        return Joi.object({
            email: Joi.string().email().required(),
        }).validate(params);
    }
    static signUp(params) {
        return Joi.object({
            email: Joi.string().email().required(),
        }).validate(params);
    }
    static token(params) {
        return Joi.object({
            refreshToken: Joi.string().required(),
        }).validate(params);
    }
    static signOut(params) {
        return Joi.object({
            email: Joi.string().email().required(),
        }).validate(params);
    }
}
exports.default = AuthValidation;
exports.authValidation = new AuthValidation();
