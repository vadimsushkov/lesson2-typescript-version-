require('dotenv').config();

import UserModel from './model';
import { Types } from 'mongoose';
import ValidTypeReq from '../interfaces/validate-api-input.interfaces';


export default {
    /**
     * @exports
     * @method findAll
     * @method createUser
     * @param {}
     * @summary get list of all users
     * @returns Promise<UserModel[]>
     */
    async findAll() {
        return UserModel.find({});
    },

    /**
     * @exports
     * @method findById
     * @param {string} id
     * @summary get user by user
     * @returns Promise<UserModel[]>
     */
    async findById(id: Types.ObjectId) {
        const foundUser = await UserModel.findOne({ id: id });

        return foundUser || null;
    },

    /**
     * @exports
     * @method create
     * @param {object} profile
     * @summary create a new user
     * @returns {Promise<UserModel>}
     */
    async create(profile: ValidTypeReq) {
        const newUser = await UserModel.create(profile);

        return newUser || null;
    },

    /**
     * Find a user by id and update his profile
     * @exports
     * @method updateById
     * @param {string} id
     * @param {object} newProfile
     * @summary update a user's profile
     * @returns {Promise<void>}
     */
    async updateById(id: Types.ObjectId, newProfile: ValidTypeReq) {
        const updatedUser = await UserModel.updateOne(
            { _id: id },
            {
                $set: newProfile,
            },
        ).exec();
        return updatedUser || null;
    },

    /**
     * @exports
     * @method deleteById
     *  @param {string} id
     * @summary delete a user from database
     * @returns {Promise<void>}
     */
    async deleteById(id: Types.ObjectId) {
        const foundUser = await UserModel.deleteOne({ _id: id }).exec();

        return foundUser || null;
    },

    async findByEmail(email: string) {
        const foundUser = await UserModel.findOne({ email: Types.ObjectId(email) });

        return foundUser || null;
    },
};