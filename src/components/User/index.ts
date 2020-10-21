import UserService from './service';
import UserValidation from './validation';
import { Request, Response } from 'express';

export async function findAll(req: Request, res: Response) {
    const users = await UserService.findAll();

    return res.status(200).json({
        message: 'Users',
        data: users,
        statusCode: 200,
    });
}

export async function findById(req: Request, res: Response) {
   const value = UserValidation.findById(req.body);

   const user = await UserService.findById(value.id);

   if (!user) {
       return res.status(404).json({
           message: 'User is not found',
           statusCode: 404,
       });
   }

   return res.status(200).json({
       message: 'The user was found successfully',
       data: user,
       statusCode: 200,
   });
}

export async function create(req: Request, res: Response) {
    const value = UserValidation.create(req.body);
    const user = await UserService.create(value);

    return res.status(200).json({
        message: 'The user was created successfully',
        data: user,
        statusCode: 200,
    });
}

export async function updateById(req: Request, res: Response) {
    const value = UserValidation.updateById(req.body);
    const updatedUser = await UserService.updateById(value.id, value.email);

    if (!updatedUser) {
        return res.status(404).json({
            message: 'User is not found',
            statusCode: 404,
        });
    }

    return res.status(200).json({
        message: 'User was successfully updated',
        data: updatedUser,
        statusCode: 200,
    });
}

export async function deleteById(req: Request, res: Response) {
    const value = UserValidation.deleteById(req.body);
    const deletedUser = await UserService.deleteById(value.id);

    if (!deletedUser) {
        return res.status(404).json({
            message: 'User is not found',
            statusCode: 404,
        });
    }

    return res.status(200).json({
        message: 'The user was deleted successfully',
        statusCode: 200,
    });
}

export default {
    findAll,
    findById,
    create,
    updateById,
    deleteById,
};
