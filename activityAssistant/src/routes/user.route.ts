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
        res.status(500).json({ message: error})
    }
})

router.put('/:email', async (req: Request, res: Response) => {
    try {
        authenticateToken(req, res, () => {})
        await userService.updateUser(req.params.email as string, req.body)
        res.json({ message: "User updated successfully" })
    } catch (error) {
        res.status(500).json({ message: error})
    }
})

router.get('/:email', async (req: Request, res: Response) => {
    try {
        authenticateToken(req, res, () => {})
        const user = await userService.getUser(req.params.email as string)
        res.json(user)
    } catch (error) {
        res.status(500).json({ message: error})
    }
})

router.delete('/:email', async (req: Request, res: Response) => {
    try {
        authenticateToken(req, res, () => {})
        await userService.deleteUser(req.params.email as string)
        res.json({ message: "User deleted successfully" })
    } catch (error) {
        res.status(500).json({ message: error})
    }
})

export default router