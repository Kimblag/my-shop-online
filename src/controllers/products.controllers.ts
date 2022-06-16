import { Request, RequestHandler, Response } from 'express';

/**
 * 
 * @getProducts = function type RequestHandler
 * @param req = Type Request
 * @param res = Type Response
 */

export const getProducts: RequestHandler = (req: Request, res: Response) => {
    res.send('Hello World');
};
export const createProducts: RequestHandler = (req: Request, res: Response) => {
    res.send('create');
};
export const updatedProducts: RequestHandler = (req: Request, res: Response) => {
    res.send('update');
};
export const deleteProducts: RequestHandler = (req: Request, res: Response) => {
    res.send('delete');
};