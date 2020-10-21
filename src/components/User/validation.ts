import Joi from '@hapi/joi';
import Validation from '../shared/validations/validation';
import ValidTypeReq from '../shared/interfaces/validate-api-input.interfaces';

export default class UsersValidation extends Validation {
    private static customJoi: any;

    static findById(params: ValidTypeReq) {
        const { value, error } = this.customJoi.object({
            id: this.customJoi.objectId().required(),
        }).validate(params);
        if (error) throw error;
        return value;
    }

    static create(params: ValidTypeReq) {
        const { value, error } = Joi.object({
            email: Joi.string()
                .email({ minDomainSegments: 2, tlds: { allow: ['com', 'net'] } })
                .min(3)
                .max(30)
                .required(),
        }).validate(params);
        if (error) throw error;
        return value;
    }

    static updateById(params: ValidTypeReq) {
        const { value, error } = Joi.object({
            id: Joi.string()
                .min(12)
                .required(),
            email: Joi.string()
                .email({ minDomainSegments: 2, tlds: { allow: ['com', 'net'] } })
                .min(3)
                .max(30)
                .required(),
        }).validate(params);
        if (error) throw error;
        return value;
    }

    static deleteById(params: ValidTypeReq) {
        const { value, error } = Joi.object({
            id: Joi.string()
                .min(12)
                .required(),
        }).validate(params);
        if (error) throw error;
        return value;
    }
}
