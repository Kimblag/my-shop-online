import mongoose from 'mongoose';
import IReview from '../interfaces/reviews.interfaces';

const ReviewSchema = new mongoose.Schema<IReview>({
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
    createdAt: {
        type: Date,
        default: Date.now,
    },
    product: {
        type: mongoose.Schema.Types.ObjectId,
        ref: 'Product',
    },
});

export default mongoose.model<IReview>('Review', ReviewSchema);