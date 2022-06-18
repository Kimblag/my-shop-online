import { Request, Response, RequestHandler, NextFunction } from "express";
import IServerResponse from "../interfaces/serverResponse.interfaces";
import IUser from "../interfaces/user.interfaces"
import ProductsModels from "../models/Products.models";
import { updatePasswordService, updatePersonalDataService } from "../services/userUpdate.services";

//TODO: Declare create, get and delete users controllers

export const updateUserController: RequestHandler = async (req: Request, res: Response): Promise<any> => {
    try {
        const { id } = req.body;
        if (req.body.password) await updatePasswordService(req.body.password, id);
        if (Object.entries(req.body).length === 1 && req.body.password) {
            return res.status(200).send(<IServerResponse>({ status: 'success', message: 'Password updated' }))
        }
        if (Object.entries(req.body).length === 0) {
            return res.status(400).send(<IServerResponse>({ status: 'error', errors: { message: 'No data to update' } }))
        }
        req.body.password && delete req.body.password;
        await updatePersonalDataService(req, id)
        return res.status(200).send(<IServerResponse>({ status: 'success', message: 'Personal data updated' }))
    } catch (error: any) {
        return res.status(500).send(<IServerResponse>({ status: 'error', errors: { message: error.message || error } }))
    }
}


export const createProductController: RequestHandler = async (req: Request, res: Response): Promise<any> => {
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

export const updateProductController: RequestHandler = async (req: Request, res: Response): Promise<any> => {
    try {
        let product = await ProductsModels.findByIdAndUpdate(req.params.id, req.body)
        product
            ? res.status(200).send({ message: 'Product updated successfully', product })
            : res.status(500).send({ message: 'Product not updated' })
    } catch (error: any) {
        res.status(500).send({ message: error.message });
    }
}

export const deleteProductController: RequestHandler = async (req: Request, res: Response): Promise<any> => {
    try {
        let product = await ProductsModels.findByIdAndUpdate(req.params.id, { deleted: true })
        product
            ? res.send({ message: 'Product deleted successfully' })
            : res.status(500).send({ message: 'Product not found' })
    } catch (error: any) {
        res.status(500).send({ message: error.message })
    };
};