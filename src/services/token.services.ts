import { Request, Response, NextFunction } from 'express'
import IUser from "../interfaces/user.interfaces"
import jwt from "jsonwebtoken";
import config from '../config'
import passport from 'passport';


export const createTokenService = (user: IUser) => {
    return jwt.sign({ id: user._id, email: user.email, isAdmin: user.isAdmin }, config.JWT.SECRET, { expiresIn: "24h" })
}


