import IProduct from "./products.interfaces";

export default interface ICart {
    userId: string;
    products: Array<IProduct>
    createdAt: Date;
}