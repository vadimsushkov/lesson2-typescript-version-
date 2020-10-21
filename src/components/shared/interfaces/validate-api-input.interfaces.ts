import { Types } from 'mongoose';

export default interface ValidateAuthInput {
    readonly id: Types.ObjectId;
    readonly email: string;
}