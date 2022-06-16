import mongoose from 'mongoose';
import IProduct from '../interfaces/products.interfaces';

const productSchema = new mongoose.Schema<IProduct>({
    name: {
        type: String,
        required: [true, 'Name is required'],
    },
    description: {
        type: String,
        required: [true, 'Description is required'],
    },
    price: {
        type: Number,
        required: [true, 'Price is required'],
    },
    discountPercentage: {
        type: Number,
    },
    rating: {
        type: Number,
        default: 0,
    },
    stock: {
        type: Number,
        default: 1,
        required: [true, 'Stock is required'],
    },
    image: {
        type: String,
        required: [true, 'Image is required'],
    },
    category: {
        type: String,
        required: [true, 'Category is required'],
    },
    numOfReviews: {
        type: Number,
        default: 0,
    },
    reviews: {
        type: mongoose.Schema.Types.ObjectId,
        ref: 'Review',
    },
    deleted: {
        type: Boolean,
        default: false,
    },
});


export default mongoose.model<IProduct>('Product', productSchema);