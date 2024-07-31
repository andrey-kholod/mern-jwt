import { NextFunction, Request, Response } from "express";
import { User } from "../models/user.model";
import bcrypt from 'bcrypt'
import { ApiError } from "../exceptions/api.error";

class AuthController {
    async signUp(req: Request, res: Response, next: NextFunction) {

        try {
            const { username, email, password } = req.body

            if (!username || !email || !password) {
                throw ApiError.BadRequest('You must provide us an email, password and username.')
            }

            const existingUser = await User.findOne({ $or: [{ email }, { username }] })

            if (existingUser) {
                throw ApiError.BadRequest('This username or email are already in use.')
            }

            const hashedPassword = await bcrypt.hash(password, 10)

            const newUser = await User.create({ username, email, password: hashedPassword })

            res.status(201).json({ message: 'User created successfully.' })
        } catch (err) {
            console.error('Caught an error:', err);
            next(err);
        }
    }
}

export const authConrollerInstanse = new AuthController()