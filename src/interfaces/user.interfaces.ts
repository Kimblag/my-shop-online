import mongoose from 'mongoose'
import { IPayment } from './payment.interfaces';


export enum UserRole {
    User,
    Admin,
}

export default interface IUser extends mongoose.Document {
    _id: string;
    name: string;
    lastname: string;
    email: string;
    password: string;
    role: UserRole;
    address: {
        country: string;
        city: string;
        street: string;
        province: string;
        zip: string;
    };
    shippingAddress: {
        country: string;
        city: string;
        street: string;
        province: string;
        zip: string;
    };
    payment: Array<IPayment>;
    isVerified: boolean;
    comparePassword: (password: string) => Promise<boolean>;
}