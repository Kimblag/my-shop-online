import { NextFunction, Request, Response } from "express";
import IUser from "../interfaces/user.interfaces";

interface RequestWithUserRole extends Request {
    user?: IUser;
}

export const roleVerifyService = (req: RequestWithUserRole, res: Response, next: NextFunction) => {
    if (!req.user) return res.status(401).send('Unauthorized');
    if (req?.user?.isAdmin) return next();
    return res.status(403).send('Forbidden');
}