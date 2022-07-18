import mongoose from "mongoose";
import { Wishlist } from "../interfaces/wishlist.interfaces";

const wishlistSchema = new mongoose.Schema<Wishlist>({
    userId: { type: String, required: true },
    favorites: { }
})

export default mongoose.model<Wishlist>('Wishlist', wishlistSchema)