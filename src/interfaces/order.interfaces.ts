import Product from "./products.interfaces";

export interface Order {
    _id: string;
    userId: string;
    products: [{
        product: string | Product;
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