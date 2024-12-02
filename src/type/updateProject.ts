import { ProjectStatus } from "../enums/ProjectStatus";
import documents from "./documents";


export type UpdateProject = {
    projectReference: string;
    projectReferenceSensitive: boolean;
    projectTitle: string;
    projectTitleSensitive: boolean;
    nameCoordinator: string;
    nameCoordinatorSensitive: boolean;
    projectCompany: string;
    projectCompanySensitive: boolean;
    projectObjective: string;
    projectObjectiveSensitive: boolean;
    projectDescription: string;
    projectDescriptionSensitive: boolean;
    projectValue: number;
    projectValueSensitive: boolean;
    projectStartDate: string;
    projectStartDateSensitive: boolean;
    projectEndDate: string;
    projectEndDateSensitive: boolean;
    projectClassification: string;
    projectClassificationSensitive: boolean;
    projectStatus: ProjectStatus;
    makePublic: boolean;
    isDraft: boolean;
};
