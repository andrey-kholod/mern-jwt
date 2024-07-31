import { ErrorRequestHandler, NextFunction } from "express";
import { ApiError } from "../exceptions/api.error";

export const errorMiddleware: ErrorRequestHandler = (err: ApiError | Error, req, res, next) => {
    console.log(`[ERROR] ${err.name}: ${err.message} \n${JSON.stringify(req.body)}`)
    if (err instanceof ApiError) {
        return res.status(err.status).json({ message: err.message })
    }
    return res.status(500).json({ message: err.message || 'Unknown error' })
}