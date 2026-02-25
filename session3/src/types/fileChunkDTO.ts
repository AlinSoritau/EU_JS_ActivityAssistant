export interface InsertFileChunkDTO {
    document_id: number;
    chunk_text: string;
    chunk_index: number;
    embedding: number[] | null;
    metadata: string | null;
    created_at: string | null;
}

export interface FileChunkDTO extends InsertFileChunkDTO {
    id: number;
}