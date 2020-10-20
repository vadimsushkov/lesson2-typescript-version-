"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
const service_1 = require("./service");
const validation_1 = require("./validation");
async function findAll(req, res) {
    const users = await service_1.default.findAll();
    return res.status(200).json({
        message: 'Users',
        data: users,
        statusCode: 200,
    });
}
exports.findAll = findAll;
async function findById(req, res) {
}
exports.findById = findById;
async function create(req, res) {
    const { value, error } = validation_1.default.create(req.params);
    if (error) {
        throw error;
    }
    const user = await service_1.default.create(value);
    return res.status(200).json({
        message: 'User was successfully created',
        data: user,
        statusCode: 200,
    });
}
exports.create = create;
async function updateById(req, res) {
    const { value, error } = validation_1.default.updateById(req.body);
    if (error) {
        throw error;
    }
    const updatedUser = await service_1.default.updateById(value.id, value.email);
    if (!updatedUser) {
        return res.status(404).json({
            message: 'User is not found',
            statusCode: 404,
        });
    }
    return res.status(200).json({
        message: 'User was successfully updated',
        statusCode: 200,
    });
}
exports.updateById = updateById;
async function deleteById(req, res) {
    const { value, error } = validation_1.default.deleteById(req.body);
    if (error) {
        throw error;
    }
    const deletedUser = await service_1.default.deleteById(value.id);
    if (!deletedUser) {
        return res.status(404).json({
            message: 'User is not found',
            statusCode: 404,
        });
    }
    return res.status(200).json({
        message: 'User was successfully deleted',
        statusCode: 200,
    });
}
exports.deleteById = deleteById;
exports.default = {
    findAll,
    findById,
    create,
    updateById,
    deleteById,
};
