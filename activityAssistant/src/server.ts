import express from "express"
import cors from "cors"
import dotenv from "dotenv"
import { authRouter, userRouter } from "./routes"

dotenv.config()

const app = express()
app.use(cors())
app.use(express.json())

const PORT = process.env.PORT

app.use("/user", userRouter)
app.use("/auth", authRouter)

app.listen(PORT, () => {
    console.log(`Server is running on port ${PORT}`)
})