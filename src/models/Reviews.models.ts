import mongoose from 'mongoose';
import IReview from '../interfaces/reviews.interfaces';

const ReviewSchema = new mongoose.Schema<IReview>({
    userId: { type: String, required: true },
    name: {
        type: String,
        required: [true, 'Name is required'],
    },
    rating: {
        type: Number,
        required: [true, 'Rating is required'],
    },
    comment: {
        type: String,
        required: [true, 'Comment is required'],
    },
    productId: {
        type: String
    }
}, { timestamps: true });

export default mongoose.model<IReview>('Review', ReviewSchema);