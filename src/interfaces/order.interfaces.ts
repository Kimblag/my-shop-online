import IProduct from "./products.interfaces";

export interface IOrderProduct {
    product: string | IProduct;
    quantity: number;
    price: number;
}

export interface IOrder {
    _id: string;
    userId: string;
    products: IOrderProduct[];
    total: number;
    status: string;
    createdAt: Date;
    updatedAt: Date;
}