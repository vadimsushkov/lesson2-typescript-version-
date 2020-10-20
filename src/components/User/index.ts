import UserService from './service';
import UserValidation from './validation';

/**
 * @function
 * @param {express.Request} req
 * @param {express.Response} res
 * @param {express.NextFunction} next
 * @returns {Promise < void >}
 */
export async function findAll(req: any, res: { status: (arg0: number) => { json: (arg0: { message: string; data: any; statusCode: number; }) => void; }; }) {
    const users = await UserService.findAll();

    return res.status(200).json({
        message: 'Users',
        data: users,
        statusCode: 200,
    });
}

/**
 * @function
 * @param {express.Request} req
 * @param {express.Response} res
 * @param {express.NextFunction} next
 * @returns {Promise < void >}
 */

export async function findById(req: { params: any; }, res: { status: { (arg0: number): { json: (arg0: { message: string; statusCode: number; }) => void; }; (arg0: number): { json: (arg0: { message: string; data: any; statusCode: number; }) => void; }; }; }) {
//    const { value, error } = UserValidation.findById(req.params);

 //   if (error) {
 //       throw error;
  //  }

//    const user = await UserService.findById(value.id);
 //   console.log(value.id);
 //   console.log(user);
 //   if (!user) {
  //      return res.status(404).json({
  //          message: 'User is not found',
   //         statusCode: 404,
    //    });
  //  }
 //   return res.status(200).json({
 //       message: 'User successfully was found',
        //data: user,
  //      statusCode: 200,
  //  });
}

/**
 * @function
 * @param {express.Request} req
 * @param {express.Response} res
 * @param {express.NextFunction} next
 * @returns {Promise < void >}
 */
export async function create(req: { params: any; }, res: { status: (arg0: number) => { json: (arg0: { message: string; data: any; statusCode: number; }) => void; }; }) {
    const { value, error } = UserValidation.create(req.params);
    if (error) {
        throw error;
    }
    const user = await UserService.create(value);

    return res.status(200).json({
        message: 'User was successfully created',
        data: user,
        statusCode: 200,
    });
}

/**
 * @function
 * @param {express.Request} req
 * @param {express.Response} res
 * @param {express.NextFunction} next
 * @returns {Promise<void>}
 */
export async function updateById(req: { body: any; }, res: { status: { (arg0: number): { json: (arg0: { message: string; statusCode: number; }) => void; }; (arg0: number): { json: (arg0: { message: string; data: any; statusCode: number; }) => void; }; }; }) {
    const { value, error } = UserValidation.updateById(req.body);
    if (error) {
        throw error;
    }
    const updatedUser = await UserService.updateById(value.id,
        value.email,
    );

    if (!updatedUser) {
        return res.status(404).json({
            message: 'User is not found',
            statusCode: 404,
        });
    }

    return res.status(200).json({
        message: 'User was successfully updated',
        //data: updatedUser,
        statusCode: 200,
    });
}

/**
 * @function
 * @param {express.Request} req
 * @param {express.Response} res
 * @param {express.NextFunction} next
 * @returns {Promise<void>}
 */
export async function deleteById(req: { body: any; }, res: { status: { (arg0: number): { json: (arg0: { message: string; statusCode: number; }) => void; }; (arg0: number): { json: (arg0: { message: string; data: any; statusCode: number; }) => void; }; }; }) {
    const { value, error } = UserValidation.deleteById(req.body);
    if (error) {
        throw error;
    }
    const deletedUser = await UserService.deleteById(value.id);

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

export default {
    findAll,
    findById,
    create,
    updateById,
    deleteById,
};
