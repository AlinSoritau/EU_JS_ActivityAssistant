import { Router, Request, Response } from "express";
import { FilesService } from "../services/files.service"

const router = Router()

const filesService = new FilesService()

router.post('/', async (req: Request, res: Response) => {
    const data: boolean = await filesService.uploadFile(req.body)
    if (data === true) {
        res.status(201).send({ success: "File uploaded successfully" })
    }
    res.send(data)
})

export default router