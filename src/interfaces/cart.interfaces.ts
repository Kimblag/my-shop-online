
export default interface Cart {
    userId: string
    products: [{
        productId: string,
        quantity: number,
    }]
}