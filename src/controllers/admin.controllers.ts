import { Request, Response, RequestHandler, NextFunction } from "express"
import IServerResponse from "../interfaces/serverResponse.interfaces"
import UsersModels from "../models/Users.models"
import ProductsModels from "../models/Products.models"
import { registerService } from "../services/register.services"
import { updatePasswordService, updatePersonalDataService } from "../services/userUpdate.services"

export const createUserController: RequestHandler = async (req: Request, res: Response, next: NextFunction) => {
    const { name, lastname, email, password } = req.body;
    console.log(req.body)
    if (!name || !lastname || !email || !password) {
        return res.status(400).send(<IServerResponse>({ status: 'failed', errors: { message: 'Missing required fields' } }));
    }
    try {
        const newUser = await registerService(req);
        if (!newUser) return res.status(400).send(<IServerResponse>({ status: 'failed', errors: { message: 'User already exists' } }));
        return res.status(201).send(<IServerResponse>({ status: 'success', data: newUser }));
    } catch (error: any) {
        return res.status(500).send(<IServerResponse>({ status: 'failed', errors: { message: error.message || error } }));
    }
}

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

export const deleteUserController: RequestHandler = async (req: Request, res: Response): Promise<any> => {
    try {
        let user = await UsersModels.findByIdAndUpdate(req.body.id, { isActive: false });
        user
            ? res.send({ message: 'User deactivated successfully' })
            : res.status(404).send({ message: 'User not found' })
    } catch (error: any) {
        return res.status(500).send(<IServerResponse>({ status: 'error', errors: { message: error.message || error } }))
    }
}

export const getUsersController: RequestHandler = async (req: Request, res: Response): Promise<any> => {
    try {
        const query = req.query.new
        console.log(query)
        const users = query ? await UsersModels.find().sort({ _id: -1 }).limit(5) : await UsersModels.find();
        (users.length > 0)
            ? res.status(200).send(<IServerResponse>({ status: 'success', data: users }))
            : res.status(200).send(<IServerResponse>({ status: 'success', message: 'No users found' }))
    } catch (error: any) {
        return res.status(500).send(<IServerResponse>({ status: 'error', errors: { message: error.message || error } }))
    }
}
export const getUserController: RequestHandler = async (req: Request, res: Response): Promise<any> => {
    try {
        const user = await UsersModels.findById(req.params.id);
        user
            ? res.status(200).send(<IServerResponse>({ status: 'success', data: user }))
            : res.status(404).send(<IServerResponse>({ status: 'error', errors: { message: 'No user found' } }))
    } catch (error: any) {
        return res.status(500).send(<IServerResponse>({ status: 'error', errors: { message: error.message || error } }))
    }
}

export const getUsersStatsController: RequestHandler = async (req: Request, res: Response): Promise<any> => {
    const date = new Date()
    const lastYear = new Date(date.setFullYear(date.getFullYear() - 1))

    try {
        const data = await UsersModels.aggregate([
            { $match: { createdAt: { $gte: lastYear } } },
            { $project: { month: { $month: "$createdAt" } } },
            { $group: { _id: "$month", count: { $sum: 1 } } },
        ])
        res.status(200).send(<IServerResponse>({ status: 'success', data }))
    } catch (error) {

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
            : res.status(404).send({ message: 'Product not deleted' })
    } catch (error: any) {
        res.status(500).send({ message: error.message })
    };
};