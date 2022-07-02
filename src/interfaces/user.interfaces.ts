import mongoose from 'mongoose'
import { IPayment } from './payment.interfaces';
import IProduct from './products.interfaces';


export default interface IUser extends mongoose.Document {
    _id: string;
    name: string;
    lastname: string;
    email: string;
    password: string;
    isAdmin: boolean;
    isActive: boolean;
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
    favorites: Array<IProduct>
    payment: Array<IPayment>;
    isVerified: boolean;
    resetToken: string
    comparePassword: (password: string) => Promise<boolean>;
}