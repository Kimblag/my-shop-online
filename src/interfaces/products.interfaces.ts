
export default interface Product {
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
    deleted: boolean;
}