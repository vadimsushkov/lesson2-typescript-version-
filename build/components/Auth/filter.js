"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
const validation_1 = require("../validation");
function exceptionsFilter(targetMethod) {
    return async function (req, res, next) {
        try {
            await targetMethod(req, res, next);
        }
        catch (error) {
            console.error(error);
            if (error instanceof validation_1.default) {
                return res.status(422).json({
                    message: error.name,
                    details: error.message,
                    statusCode: 422,
                });
            }
            return res.status(500).json({
                message: error.message,
                details: null,
                statusCode: 500,
            });
            return next(error);
        }
    };
}
exports.default = exceptionsFilter;
;
