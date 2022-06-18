import IProduct from "./products.interfaces";

export interface IOrder {
    _id: string;
    userId: string;
    products: [{
        product: string | IProduct;
        quantity: number;
    }];
    amount: number;
    address: {
        country: string;
        city: string;
        street: string;
        province: string;
        zip: string;
    };
    status: string;
}