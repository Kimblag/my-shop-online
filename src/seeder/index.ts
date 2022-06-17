import axios from 'axios'
import { setUncaughtExceptionCaptureCallback } from 'process';
import ProductsModels from "../models/Products.models";
import { products } from './products'


export const seedProducts = async () => {
    try {
        const productsDB = await ProductsModels.find({});
        if (productsDB.length === 0) {
            const product = products.map((p) => {
                return {
                    name: p.title,
                    description: p.description,
                    price: p.price,
                    discountPercentage: p.discountPercentage,
                    rating: p.rating,
                    image: p.images[0],
                    category: p.category,
                }
            });
            product.forEach(async (item) => {
                const product = new ProductsModels(item);
                await product.save();
            });
        } else {
            console.log("Products already seeded");
        }
    } catch (error: any) {
        console.error(error);
    }
};
