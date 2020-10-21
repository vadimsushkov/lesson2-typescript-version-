require('dotenv').config();

import UserModel from './model';
import { Types } from 'mongoose';
import ValidTypeReq from '../shared/interfaces/validate-api-input.interfaces';


export default {

    findAll() {
        return UserModel.find({});
    },

    findById(id: Types.ObjectId) {
        return UserModel.findOne({ id: id }) || null;
    },

    create(profile: ValidTypeReq) {
        return UserModel.create(profile) || null;
    },

    updateById(id: Types.ObjectId, newProfile: ValidTypeReq) {
        return UserModel.updateOne({ _id: id }, { $set: newProfile }).exec() || null;
    },

    deleteById(id: Types.ObjectId) {
        return UserModel.deleteOne({ _id: id }).exec() || null;
    },

    findByEmail(email: string) {
        return UserModel.findOne({ email: Types.ObjectId(email) }) || null;
    },
};