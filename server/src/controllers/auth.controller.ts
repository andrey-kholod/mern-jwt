import { Request, Response } from "express";
import { User } from "../models/user.model";
import bcrypt from 'bcrypt'

class AuthController {
    async signUp(req: Request, res: Response) {

        try {
            const { username, email, password } = req.body

            if (!username || !email || !password) {
                throw new Error('You must provide us an email, password and username.')
            }

            const existingUser = await User.findOne({ $or: [{ email }, { username }] })

            if (existingUser) {
                throw new Error('This username or email are already in use.')
            }

            const hashedPassword = await bcrypt.hash(password, 10)

            const newUser = await User.create({ username, email, password: hashedPassword })

            res.status(201).json({ message: 'User created successfully.' })
        } catch (err) {
            console.log(err)

            const errMessage = err instanceof Error ? err.message : 'Unknown error'

            res.status(400).json({ message: errMessage })
        }
    }
}

export const authConrollerInstanse = new AuthController()