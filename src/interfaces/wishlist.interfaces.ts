import IProduct from "./products.interfaces"

export interface IWishlist{
    userId: string
    favorites: Array<IProduct>
}