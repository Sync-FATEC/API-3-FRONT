export type Document = {
    documents_id: string;
    fileName: string;
    fileType: string;
    fileUrl: string;
    filePath: string;
    uploadedAt: string;
    removed: boolean;
    links: any[];
};

export type HistoryChangesProjects = {
    changedFields: string;
    newValues: string;
    oldValues: string;
    changeDate: string;
    documents: Document | null;
    userEmail: string;
};