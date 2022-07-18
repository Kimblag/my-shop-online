import { Request, RequestHandler, Response } from "express";
import ServerResponse from "../interfaces/serverResponse.interfaces";
import { forgotPasswordService, resetPasswordService, updatePassword, updatePersonalDataService } from '../services/userUpdate.services'

export const userUpdateController: RequestHandler = async (req: Request, res: Response) => {
    console.log(req.headers.authorization)
    try {
        const user: any = req.user;

        if (req.body.password) return res.status(400).send(<ServerResponse>({ status: 'error', errors: { message: 'Invalid route to modified password' } }));

        if (Object.entries(req.body).length === 0) return res.status(400).send(<ServerResponse>({ status: 'error', errors: { message: 'No values to modified' } }));

        if (Object.keys(req.body).includes('role')) return res.status(400).send(<ServerResponse>({ status: 'error', errors: { message: 'No authorized to modified some props' } }));

        await updatePersonalDataService(req, user.id);

        return res.status(200).send(<ServerResponse>({ status: 'success' }));
    } catch (e: any) {
        return res.status(400).send(<ServerResponse>({ status: 'error', errors: { message: e.message || e } }));
    }
}

export const passwordUpdateController: RequestHandler = async (req: Request, res: Response) => {
    try {
        const user: any = req.user;
        
        if(!req.body.password) return res.status(400).send(<ServerResponse>({status: 'error', errors: {message: 'Missing new password value'}}));

        await updatePassword(req.body.password, user.id);

        return res.status(200).send(<ServerResponse>({status: 'success'}))
        
    } catch (e: any) {
        return res.status(400).send(<ServerResponse>({status: 'error', errors: {message: e.message || e}}))
    }
}
export const forgotPasswordController: RequestHandler = async (req: Request, res: Response) => {
    try {        
        if(!req.body.email) return res.status(400).send(<ServerResponse>({status: 'error', errors: {message: 'Missing email value'}}));

        await forgotPasswordService(req);

        return res.status(200).send(<ServerResponse>({status: 'success', message: 'Please verify your email to change password'}))
        
    } catch (e: any) {
        return res.status(400).send(<ServerResponse>({status: 'error', errors: {message: e.message || e}}))
    }
}
export const createNewPasswordController: RequestHandler = async (req: Request, res: Response) => {
    try {        
        if(!req.body.password) return res.status(400).send(<ServerResponse>({status: 'error', errors: {message: 'Missing password value'}}));

        await resetPasswordService(req);

        return res.status(200).send(<ServerResponse>({status: 'success', message: 'Password changed successfully'}))
        
    } catch (e: any) {
        return res.status(400).send(<ServerResponse>({status: 'error', errors: {message: e.message || e}}))
    }
}