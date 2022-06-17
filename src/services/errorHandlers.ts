import { Response } from "express";

export const notifyError = (res: Response, error: Error) => res.status(500).send({ message: error.message })