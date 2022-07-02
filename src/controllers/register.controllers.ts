import { Response, Request, RequestHandler } from 'express'
import { registerService } from '../services/register.services'
import IServerResponse from '../interfaces/serverResponse.interfaces'

export const registerController: RequestHandler = async (req: Request, res: Response): Promise<any> => {
    if (!req.body) return res.status(400).send(<IServerResponse>({ status: 'failed', errors: { message: 'Missing fields.' } }))
    try {
        const newUser = await registerService(req)
        if (!newUser) return res.status(400).send(<IServerResponse>({ status: 'failed', errors: { message: 'Email already exists.' } }))

        return res.status(200).send(<IServerResponse>({ status: 'success', data: newUser.message }))
    } catch (error: any) {
        console.error(error)
    }
}