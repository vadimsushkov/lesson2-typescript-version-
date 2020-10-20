"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
const mongoose_1 = require("mongoose");
const connection_1 = require("../../config/connection");
const UserSchema = new mongoose_1.Schema({
    email: {
        type: String,
        trim: true,
    },
}, {
    collection: 'usermodel',
    versionKey: false,
});
exports.default = connection_1.default.model('UserModel', UserSchema);
