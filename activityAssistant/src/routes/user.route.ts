import { Router, Request, Response } from "express";
import { UserService } from "../services/user.service";
import { authenticateToken } from "../middleware/auth.middleware";

const router = Router()
const userService = new UserService()

router.post('/register', async (req: Request, res: Response) => {
    try {
        await userService.createUser(req.body)
        res.json({ message: "User registered successfully" })
    } catch (error) {
        res.status(500).json({ error: (error as Error).message })
    }
})

router.put('/:username', async (req: Request, res: Response) => {
    try {
        authenticateToken(req, res, () => {})
        await userService.updateUser(req.params.username as string, req.body)
        res.json({ message: "User updated successfully" })
    } catch (error) {
        res.status(500).json({ error: (error as Error).message })
    }
})

router.delete('/:username', async (req: Request, res: Response) => {
    try {
        await userService.deleteUser(req.params.username as string)
        res.json({ message: "User deleted successfully" })
    } catch (error) {
        res.status(500).json({ error: (error as Error).message })
    }
})

export default router