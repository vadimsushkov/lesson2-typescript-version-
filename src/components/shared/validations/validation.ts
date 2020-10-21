import * as Joi from 'joi';
import { Types } from 'mongoose';

export default class ValidationError  {
    customJoi: any;

    readonly messageObjectId: string =
        'Argument passed in must be a single String of 12 bytes or a string of 24 hex characters';
    message: string;
    name: string;

    constructor() {
        this.customJoi = Joi.extend({
            name: 'objectId',
            language: {
                base: this.messageObjectId
            },
            pre(
                value: string,
                state: Joi.State,
                options: Joi.ValidationOptions
            ): Object | string {
                if (!Types.ObjectId.isValid(value)) {
                    return this.createError(
                        'objectId.base', {
                            value
                        },
                        state,
                        options
                    );
                }
                return value;
            }
        });
    }
}

