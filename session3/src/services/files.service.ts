import {supabase } from "../lib/supabase";
import type { FileUploadDTO, InsertDocumentDTO } from "../types/fileDTO";
import { chunkText } from "../utils/chunking";

export class FilesService {
    async uploadFile(file: FileUploadDTO) : Promise<BigInt> {
        const documentDTO: InsertDocumentDTO = {
            title: file.filename,
            content: file.text,
            metadata: null,
            user_id: 1,
            created_at: null,
            updated_at: null
        }

        const chunks = chunkText(file.text)
        console.log("Chunks resulted: ", chunks.length)
        documentDTO.metadata = JSON.stringify({ length: file.text.length, chunkCount: chunks.length })
        
        const { data, error } = await supabase
            .from("documents")
            .insert(documentDTO)
            .select("id")

        if (error) {
            throw new Error(error.message);
        }

        const documentId = data?.[0]?.id

        try {
        this.insertChunks(chunks.map((chunk, index) => ({
            document_id: documentId,
            chunk_text: chunk,
            chunk_index: index
        })))
        } catch (error) {
            console.error("Error inserting chunks:", error);
        }

        console.log("Document inserted with ID: ", documentId)
        return documentId;
    }

    async insertChunks(chunks: { document_id: BigInt, chunk_text: string, chunk_index: number }[]) {
        const { data, error } = await supabase.from("document_chunks")
            .insert(chunks)
        if (error) {
            throw new Error(error.message);
        }
    }
}