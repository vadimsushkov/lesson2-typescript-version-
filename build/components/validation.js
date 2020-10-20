"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
const Joi = require("joi");
const mongoose_1 = require("mongoose");
class ValidationError {
    constructor() {
        this.messageObjectId = 'Argument passed in must be a single String of 12 bytes or a string of 24 hex characters';
        this.customJoi = Joi.extend({
            name: 'objectId',
            language: {
                base: this.messageObjectId
            },
            pre(value, state, options) {
                if (!mongoose_1.Types.ObjectId.isValid(value)) {
                    return this.createError('objectId.base', {
                        value
                    }, state, options);
                }
                return value;
            }
        });
    }
}
exports.default = ValidationError;
