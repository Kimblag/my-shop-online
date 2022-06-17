import { Request, Response, NextFunction } from 'express'
import IUser from "../interfaces/user.interfaces"
import jwt from "jsonwebtoken";
import config from '../config'


export const createTokenService = (user: IUser) => {
    return jwt.sign({ id: user._id, isAdmin: user.isAdmin, email: user.email }, config.JWT.SECRET, { expiresIn: "24h" })
}


