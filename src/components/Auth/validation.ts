import * as Joi from '@hapi/joi';
import Validation from '../shared/validations/validation';
import ValidTypeReq from '../shared/interfaces/validate-api-input.interfaces';

export default class AuthValidation extends Validation {
    static signIn(params: ValidTypeReq) {
        const { value, error } = Joi.object({email: Joi.string().email().required(),}).validate(params);
        if (error) throw error;
        return value;
    }

    static token(params: ValidTypeReq) {
        const { value, error } = Joi.object({refreshToken: Joi.string().required(),}).validate(params);
        if (error) throw error;
        return value;
    }

    static signOut(params: ValidTypeReq) {
        const { value, error } = Joi.object({email: Joi.string().email().required(),}).validate(params);
        if (error) throw error;
        return value;
    }
}


