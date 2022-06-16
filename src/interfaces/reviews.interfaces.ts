import IProduct from "./products.interfaces";

export default interface IReview {
    id: string;
    name: string;
    rating: number;
    comment: string;
    createdAt: Date;
    product: string | IProduct;

}