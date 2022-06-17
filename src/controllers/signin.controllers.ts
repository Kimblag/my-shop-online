import e, { Response, Request, RequestHandler } from 'express'
import IServerResponse from '../interfaces/serverResponse.interfaces'

import UsersModels from '../models/Users.models'
import { createTokenService } from '../services/token.services'
import { getUserService, matchPasswordService } from '../services/signin.services'

export const signinController: RequestHandler = async (req: Request, res: Response) => {
    if (!req.body.email || !req.body.password) {
        return res.status(400)
            .send(<IServerResponse>({ status: 'failed', errors: { message: 'Missing fields.' } }))
    }
    try {
        const user = await getUserService(req.body.email)
        if (!user) return res.status(400).send(<IServerResponse>({ status: 'failed', errors: { message: 'User not found.' } }))
        const match = await matchPasswordService(user, req.body.password)
        if (!match) return res.status(400).send(<IServerResponse>({ status: 'failed', errors: { message: 'Password is incorrect.' } }))
        return res.status(200).send(<IServerResponse>({ status: 'success', data: { token: createTokenService(user) } }))
    } catch (error: any) {
        return res.status(error.status || 400).send(<IServerResponse>({ status: 'failed', errors: { message: error.message || error } }))
    }
}