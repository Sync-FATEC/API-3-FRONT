type documents = {
    removed:boolean
    documentId: string;
    fileName: string;
    fileType: string;
    fileUrl: string;
    uploadedAt: string | null;
    user: string | null;
    fileBytes: Uint8Array | null;
}

export default documents