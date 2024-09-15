export type Projetos = {
    projectId: string;
    projectReference: string;
    nameCoordinator: string;
    projectCompany: string;
    projectObjective: string;
    projectDescription: string;
    projectValue: number;
    projectStartDate: string;
    projectEndDate: string;
    projectClassification: string;
    projectStatus: string;
    documents: {
        documentsId: string;
        fileName: string;
        fileType: string;
        fileUrl: string;
        uploadedAt: string | null;
        user: string | null;
    }[];
    historyProject: any[];
};
