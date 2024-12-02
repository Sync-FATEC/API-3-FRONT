import { ClassificacaoProjetos } from '../enums/classificacaoProjetos';
import { projectClassificationCount } from './projectClassificationCount';
import { Projects } from './projects';

export type DraftEditProject = {
    draftEditProjectId: string;
    draftEditTitle: string;
    draftEditProjectReference: string;
    draftEditProjectCompany: string;
    draftEditNameCoordinator: string;
    draftEditProjectObjective: string;
    draftEditProjectDescription: string;
    draftEditProjectValue: number;
    draftEditProjectStartDate: Date;
    draftEditProjectEndDate: Date;
    draftEditProjectClassification: ClassificacaoProjetos;
    sensitiveFields: string[];
    project: Projects;
};