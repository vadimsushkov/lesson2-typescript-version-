import Joi from '@hapi/joi';
import Validation from '../validation';
import ValidTypeReq from '../interfaces/validate-api-input.interfaces';

export default class UsersValidation extends Validation {
    findById(params: ValidTypeReq) {
        return this.customJoi.object({
            id: this.customJoi.objectId().required(),
        }).validate(params);
    }

    findByEmail(params: ValidTypeReq) {
        return this.customJoi.object({
            email: this.customJoi.string().email().required(),
        }).validate(params);
    }

    static create(params: ValidTypeReq) {
        return Joi.object({
            email: Joi.string()
                .email({ minDomainSegments: 2, tlds: { allow: ['com', 'net'] } })
                .min(3)
                .max(30)
                .required(),
        }).validate(params);
    }

    static updateById(params: ValidTypeReq) {
        return Joi.object({
            id: Joi.string()
                .min(12)
                .required(),
            email: Joi.string()
                .email({ minDomainSegments: 2, tlds: { allow: ['com', 'net'] } })
                .min(3)
                .max(30)
                .required(),
        }).validate(params);
    }

    static deleteById(params: ValidTypeReq) {
        return Joi.object({
            id: Joi.string()
                .min(12)
                .required(),
        }).validate(params);
    }
}

export const usersValidation: UsersValidation = new UsersValidation();