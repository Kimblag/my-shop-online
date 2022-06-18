import IProduct from "./products.interfaces";

export default interface ICart {
    userId: string
    products: [{
        productId: string,
        quantity: number,
    }]
}