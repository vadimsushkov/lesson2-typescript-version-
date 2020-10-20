import * as Joi from '@hapi/joi';
import Validation from '../validation';
import ValidTypeReq from '../interfaces/validate-api-input.interfaces';

export default class AuthValidation extends Validation {
    static signIn(params: ValidTypeReq) {
        return Joi.object({
            email: Joi.string().email().required(),
        }).validate(params);
    }

    static signUp(params: ValidTypeReq) {
        return Joi.object({
            email: Joi.string().email().required(),
        }).validate(params);
    }

    static token(params: ValidTypeReq) {
        return Joi.object({
            refreshToken: Joi.string().required(),
        }).validate(params);
    }

    static signOut(params: ValidTypeReq) {
        return Joi.object({
            email: Joi.string().email().required(),
        }).validate(params);
    }
}

export const authValidation: AuthValidation = new AuthValidation();
