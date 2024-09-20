import documents from "./documents";


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
    documents: documents[];
    historyProject: any[];
};
