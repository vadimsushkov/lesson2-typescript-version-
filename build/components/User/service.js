"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
require('dotenv').config();
const model_1 = require("./model");
const mongoose_1 = require("mongoose");
exports.default = {
    async findAll() {
        return model_1.default.find({});
    },
    async findById(id) {
        const foundUser = await model_1.default.findOne({ id: id });
        return foundUser || null;
    },
    async create(profile) {
        const newUser = await model_1.default.create(profile);
        return newUser || null;
    },
    async updateById(id, newProfile) {
        const updatedUser = await model_1.default.updateOne({ _id: id }, {
            $set: newProfile,
        }).exec();
        return updatedUser || null;
    },
    async deleteById(id) {
        const foundUser = await model_1.default.deleteOne({ _id: id }).exec();
        return foundUser || null;
    },
    async findByEmail(email) {
        const foundUser = await model_1.default.findOne({ email: mongoose_1.Types.ObjectId(email) });
        return foundUser || null;
    },
};
