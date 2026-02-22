import { StringCheckGrader } from "openai/resources/graders/grader-models"

export interface FileUploadDTO {
    filename: string
    text: string
}

export interface DocumentDTO {
    id: number
    user_id: number
    title: string
    content: string
    metadata: string | null
    created_at: string | null
    updated_at: string | null
}