"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
const joi_1 = require("@hapi/joi");
const validation_1 = require("../validation");
class UsersValidation extends validation_1.default {
    findById(params) {
        return this.customJoi.object({
            id: this.customJoi.objectId().required(),
        }).validate(params);
    }
    findByEmail(params) {
        return this.customJoi.object({
            email: this.customJoi.string().email().required(),
        }).validate(params);
    }
    static create(params) {
        return joi_1.default.object({
            email: joi_1.default.string()
                .email({ minDomainSegments: 2, tlds: { allow: ['com', 'net'] } })
                .min(3)
                .max(30)
                .required(),
        }).validate(params);
    }
    static updateById(params) {
        return joi_1.default.object({
            id: joi_1.default.string()
                .min(12)
                .required(),
            email: joi_1.default.string()
                .email({ minDomainSegments: 2, tlds: { allow: ['com', 'net'] } })
                .min(3)
                .max(30)
                .required(),
        }).validate(params);
    }
    static deleteById(params) {
        return joi_1.default.object({
            id: joi_1.default.string()
                .min(12)
                .required(),
        }).validate(params);
    }
}
exports.default = UsersValidation;
exports.usersValidation = new UsersValidation();
