import ValidationError from '../validation';
import { NextFunction, Request, Response } from 'express';

export default function exceptionsFilter(targetMethod: (arg0: Request, arg1: Response, arg2: NextFunction) => void) {
    return async function (req: Request, res: Response , next: NextFunction ) {
        try {
            await targetMethod(req, res, next);
        } catch (error) {
            console.error(error);
            if (error instanceof ValidationError) {
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
};
