import { Request, RequestHandler, Response } from 'express'
import ProductsModels from '../models/Products.models'
import { products } from '../seeder/products'

/**
 * 
 * @getProducts = function type RequestHandler
 * @param req = Type Request
 * @param res = Type Response
 */

export const getProducts: RequestHandler = async (req: Request, res: Response): Promise<any> => {
    try {
        let products = await ProductsModels.find({ deleted: false })
        products.length === 0
            ? res.status(404).send({ message: 'There are no products.' })
            : res.status(200).send(products)
    } catch (error: any) {
        res.status(500).send({ message: error.message })
    }
}

export const getProduct: RequestHandler = async (req: Request, res: Response): Promise<any> => {
    try {
        let product = await ProductsModels.find({ _id: req.params.id, deleted: false })
        console.log(product)
        products.length === 0
            ? res.status(404).send({ message: 'There are no products.' })
            : res.status(200).send(product)
    } catch (error: any) {
        res.status(500).send({ message: error.message })
    }
}

export const createProducts: RequestHandler = async (req: Request, res: Response): Promise<any> => {
    try {
        let product = new ProductsModels(req.body)
        await product.save()
        product
            ? res.send({ message: 'Product created successfully', product })
            : res.status(500).send({ message: 'Product not created' })
    } catch (error: any) {
        res.status(500).send({ message: error.message })
    }
}

export const updatedProducts: RequestHandler = async (req: Request, res: Response): Promise<any> => {
    try {
        let product = await ProductsModels.findByIdAndUpdate(req.params.id, req.body)
        product
            ? res.status(200).send({ message: 'Product updated successfully', product })
            : res.status(500).send({ message: 'Product not updated' })
    } catch (error: any) {
        res.status(500).send({ message: error.message });
    }
}

export const deleteProduct: RequestHandler = async (req: Request, res: Response): Promise<any> => {
    try {
        let product = await ProductsModels.findByIdAndUpdate(req.params.id, { deleted: true })
        product
            ? res.send({ message: 'Product deleted successfully' })
            : res.status(500).send({ message: 'Product not found' })
    } catch (error: any) {
        res.status(500).send({ message: error.message })
    };
};