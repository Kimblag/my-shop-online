import Product from "./products.interfaces"

export interface Wishlist{
    userId: string
    favorites: Array<Product>
}