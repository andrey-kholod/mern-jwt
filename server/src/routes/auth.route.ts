import { Router } from "express";
import { authConrollerInstanse } from "../controllers/auth.controller";

export const authRouter = Router()

authRouter.post('/signup', authConrollerInstanse.signUp)