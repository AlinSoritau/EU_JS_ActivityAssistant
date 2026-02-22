import {supabase } from "../lib/supabase";
import type { DocumentDTO, FileUploadDTO } from "../types/fileDTO";

export class FilesService {
    async uploadFile(file: FileUploadDTO) : Promise<boolean> {
        const documentDTO: DocumentDTO = {
            title: file.filename,
            content: file.text,
            metadata: JSON.stringify({ length: file.text.length }),
            user_id: 1,
            id: 0,
            created_at: null,
            updated_at: null
        }

        const {  error } = await supabase
            .from("documents")
            .insert(documentDTO);

        if (error) {
            throw new Error(error.message);
        }

        return true;
    }
}