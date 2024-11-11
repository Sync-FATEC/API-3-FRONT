import { ProjectStatus } from "../enums/ProjectStatus";
import documents from "./documents";


export type Projects = {
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
    projectStatus: ProjectStatus;
    documents: documents[];
    historyProject: any[];
    sensitiveFields?: string[];
};
