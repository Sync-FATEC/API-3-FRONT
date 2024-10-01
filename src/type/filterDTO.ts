type filterDTO = {
    projectReference: string;
    projectCompany: string;
    nameCoordinator: string;
    projectClassification: string;
    projectStatus: string;
    projectStartDate: string | null;
    projectEndDate: string | null;
}

export default filterDTO;