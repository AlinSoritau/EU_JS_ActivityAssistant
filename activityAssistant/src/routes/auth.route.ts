import { Router, Request, Response } from "express";
import { AuthService } from "../services/auth.service";

const router = Router()
const authService = new AuthService()

router.post('/login', async (req: Request, res: Response) => {
    try {
        const token = await authService.loginUser(req.body.username, req.body.password)
        
        if (token) {
            res.status(200).json({message: "Login successful.", token: token})
        } else {
            res.status(401).json({ message: "Invalid username or password." })
        }
    } catch (error) {
        res.status(500).json({ message: "A server error occured during login. Please try again later." })
    }
})

export default router