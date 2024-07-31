import express from 'express'
import mongoose from 'mongoose'
import dotenv from 'dotenv'
import { userRouter } from './routes/user.route'
import { authRouter } from './routes/auth.route'
import { errorMiddleware } from './middlewares/error.middleware'

dotenv.config()

const app = express()

app.use(express.json())
app.use(express.urlencoded({ extended: true }))

const PORT = process.env.PORT || 3000

app.use('/api/user', userRouter)
app.use('/api/auth', authRouter)

app.use(errorMiddleware)

mongoose.connect(process.env.MONGO_URI!)
    .then(() => {
        console.log('Connected to MongoDB')
    })
    .catch((err) => {
        console.log(err)
    })

app.listen(PORT, () => {
    console.log(`Server is listening on port ${PORT}`)
})