import IProduct from "./products.interfaces"

export default interface IReview {
    id?: string;
    userId: string
    name: string;
    rating: number;
    comment: string;
    productId: string;
}