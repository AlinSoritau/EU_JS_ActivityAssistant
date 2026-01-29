import express from "express"
import { createClient } from "@supabase/supabase-js"
import cors from "cors"
import dotenv from "dotenv"
import health from "./routes/health.route"
import conversationRouter from "./routes/conversation.route"
import messageRouter from "./routes/message.route"

dotenv.config()

const app = express()
app.use(cors())
app.use(express.json())

const PORT = process.env.PORT

app.use("/health", health)
app.use("/conversation", conversationRouter)
app.use("/message", messageRouter)

app.listen(PORT, () => {
    console.log(`Server is running on port ${PORT}`)
})