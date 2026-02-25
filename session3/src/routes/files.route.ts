import { Router, Request, Response } from "express";
import { FilesService } from "../services/files.service"

const router = Router()

const filesService = new FilesService()

router.post('/', async (req: Request, res: Response) => {
    const data = await filesService.uploadFile(req.body)
    try {
        if (data) {
            res.status(201).send({ 
                id: data,
                success: "File uploaded successfully" })
        }
        else {
            res.status(400).send({ error: "Failed to upload file" })
        }
    } catch (error) {
        res.status(500).send({ error: "Internal server error" })
    }
})

export default router