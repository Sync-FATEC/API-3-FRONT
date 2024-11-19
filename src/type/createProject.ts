type createProject = {
    projectReference: string;
    projectReferenceSensitive: boolean;
    projectTitle: string;
    projectTitleSensitive: boolean;
    nameCoordinator: string;
    nameCoordinatorSensitive: boolean;
    projectCompany: string;
    projectCompanySensitive: boolean;
    projectObjective: string;
    projectObjectiveSensitive: boolean
    projectDescription: string;
    projectDescriptionSensitive: boolean;
    projectValue: number;
    projectValueSensitive: boolean;
    projectStartDate: Date;
    projectStartDateSensitive: boolean;
    projectEndDate: Date;
    projectEndDateSensitive: boolean;
    projectClassification: string;
    projectClassificationSensitive: boolean;
  };

export default createProject;