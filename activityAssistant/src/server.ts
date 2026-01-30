import express from "express"
import { createClient } from "@supabase/supabase-js"
import cors from "cors"
import dotenv from "dotenv"
import user from "./routes/user.route"

dotenv.config()

const app = express()
app.use(cors())
app.use(express.json())

const PORT = process.env.PORT

app.use("/user", user)

app.listen(PORT, () => {
    console.log(`Server is running on port ${PORT}`)
})