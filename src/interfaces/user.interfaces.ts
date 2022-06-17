import mongoose from 'mongoose'
import { IPayment } from './payment.interfaces';


export default interface IUser extends mongoose.Document {
    _id: string;
    name: string;
    lastname: string;
    email: string;
    password: string;
    isAdmin: boolean;
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