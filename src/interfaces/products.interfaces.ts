import IReview from "./reviews.interfaces"

export default interface IProduct {
    _id: string;
    name: string;
    brand: string;
    description: string;
    price: number;
    discountPercentage: number;
    rating: number;
    stock: number;
    image: string;
    category: string;
    numOfReviews: number;
    reviews: IReview[];
    deleted: boolean;
}