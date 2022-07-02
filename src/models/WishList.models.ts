import mongoose from "mongoose";
import { IWishlist } from "../interfaces/wishlist.interfaces";

const wishlistSchema = new mongoose.Schema<IWishlist>({
    userId: { type: String, required: true },
    favorites: { }
})

export default mongoose.model<IWishlist>('Wishlist', wishlistSchema)