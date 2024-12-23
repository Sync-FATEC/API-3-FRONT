import axios from "axios";
import createProject from "../type/createProject";
import AddAnexo from "../components/addAnexo/addAnexos";
import { get } from "http";
import filterDTO from "../type/filterData";
import { Projects } from "../type/projects";
import { UpdateProject } from "../type/updateProject";
import { Grant, createGrant, updateGrant } from "../type/grant";
import { RegisterScholarshipHolder, UpdateScholarShipHolder } from "../type/scholarShipHolder";

const api = axios.create({
  baseURL: "http://localhost:8080",
});

const links = {
  getAllProjects: () => api.get("/projects/getAll"),

  getProject: (id: string) => api.get(`/projects/get/${id}`),

  getDraftEditProject: (id: string) => api.get(`/projects/get/draft/${id}`),

  getCoordinators: () => api.get("/projects/get/coordinators"),

  getCompanies: () => api.get("/projects/get/companies"),

  createProject: (data: createProject) => api.post("/projects/create", data),

  getDraftsProjects: () => api.get("/draft/get"),

  getDraftProject: (id: string) => api.get(`/draft/get/${id}`),

  deleteDraftProject: (id: string) => api.delete(`/draft/delete/${id}`),

  // COORDINATORS

  createCoordinators: (data: any) => api.post("/coordinators/create", data),

  getAllCoordinators: () => api.get("/coordinators/buscar"),

  getCoordinator: (id: string) => api.get(`/coordinators/buscar/${id}`),

  deleteCoordinator: (id: string) => api.delete(`/coordinators/delete/${id}`),

  updateCoordinators: (data: any) => api.put("/coordinators/update", data),

  getFilteredCoordinators: (data: any) =>
    api.get("/coordinators/filter", { params: data }),
  
  // COMPANIES

  createCompany: (data: any) => api.post("/company/create", data),

  getAllCompanies: () => api.get("/company/buscar"),

  getCompany: (id: string) => api.get(`/company/buscar/${id}`),

  deleteCompany: (id: string) => api.delete(`/company/delete/${id}`),

  updateCompany: (data: any) => api.put("/company/update", data),

  getFilteredCompanies: (data: any) =>
    api.get("/company/filter", { params: data }),
  
  AddAnexo: (projectId: string, file: any, tipoAnexo: string) => {
    const formData = new FormData();
    formData.append("projectId", projectId);
    if (file) {
      formData.append("file", file);
    }
    formData.append("typeFile", tipoAnexo);

    return api.post("/documents/create", formData, {
      headers: {
        "Content-Type": "multipart/form-data",
      },
    });
  },

  removeAnexo: (anexos: string[]) => api.put(`/documents/removed`, anexos),

  addAnexoTeste: (anexos: string[]) => api.put(`/documents/add`, anexos),

  getAnexos: (link: string) => api.get(link, { responseType: "blob" }),

  getExport: (link: string) => api.get(link, { responseType: "blob" }),

  getFiltered: (
    keyword: string,
    dataInicio: string,
    dataFim: string,
    status: string,
    classificacao: string,
    isDraft: boolean
  ) => {
    return api.get(
      `/projects/getAll?keyword=${keyword}&dataInicio=${dataInicio}&dataFim=${dataFim}&status=${status}&classificacao=${classificacao}&isDraft=${isDraft}`
    );
  },

  filterProjects: (data: filterDTO) =>
    api.get("/projects/filter", { params: data }),

  deleteProjects: (id: string) => api.delete(`/projects/delete/${id}`),

  updateProject: (id: string, data: UpdateProject) =>
    api.put(`/projects/update/${id}`, data),

  updateDraftProject: (id: string, data: UpdateProject) =>
    api.put(`/projects/update/draft/${id}`, data),

  getProectsNearEnd: () => api.get("/projects/get/all/near-end"),

  getHistoryChangesProjects: (id: string) =>
    api.get(`/projects/get/history-projects/${id}`),

  getCountStatusCoordinator: (
    nameCoordinator: string,
    projectStartDate: string,
    projectEndDate: string
  ) =>
    api.get("/dashboard/count/status/coordinator", {
      params: {
        nameCoordinator,
        projectStartDate,
        projectEndDate,
      },
    }),

  getCountClassificationCoordinator: (
    nameCoordinator: string,
    projectStartDate: string,
    projectEndDate: string
  ) =>
    api.get("/dashboard/count/classification/coordinator", {
      params: {
        nameCoordinator,
        projectStartDate,
        projectEndDate,
      },
    }),

  getCountMonthCoordinator: (
    nameCoordinator: string,
    projectStartDate: string,
    projectEndDate: string
  ) =>
    api.get("/dashboard/count/month/coordinator", {
      params: {
        nameCoordinator,
        projectStartDate,
        projectEndDate,
      },
    }),

  getCountStatusCompany: (
    projectCompany: string,
    projectStartDate: string,
    projectEndDate: string
  ) =>
    api.get("/dashboard/count/status/company", {
      params: {
        projectCompany,
        projectStartDate,
        projectEndDate,
      },
    }),

  getCountClassificationCompany: (
    projectCompany: string,
    projectStartDate: string,
    projectEndDate: string
  ) =>
    api.get("/dashboard/count/classification/company", {
      params: {
        projectCompany,
        projectStartDate,
        projectEndDate,
      },
    }),

  getCountMonthCompany: (
    projectCompany: string,
    projectStartDate: string,
    projectEndDate: string
  ) =>
    api.get("/dashboard/count/month/company", {
      params: {
        projectCompany,
        projectStartDate,
        projectEndDate,
      },
    }),

  getInvestmentCompany: (
    projectCompany: string,
    projectStartDate?: string,
    projectEndDate?: string
  ) =>
    api.get("/dashboard/count/investment/company", {
      params: {
        projectCompany,
        projectStartDate,
        projectEndDate,
      },
    }),

  getAllGrants: () => api.get("/grant/getAll"),

  getGrant: (id: string) => api.get(`/grant/get/${id}`),

  deactivateGrants: (id: string) => api.patch(`/grant/deactivate/${id}`),

  activateGrants: (id: string) => api.patch(`/grant/activate/${id}`),

  createGrant: (data: createGrant) => api.post("/grant/create", data),

  updateGrant: (data: updateGrant) => api.put("/grant/update", data),

  getScholarShipHolder: (id: string) => api.get(`/scholarship-holders/buscar/${id}`),

  getAllScholarShipHolder: () => api.get("/scholarship-holders/buscar"),

  RegisterScholarshipHolder: (data: RegisterScholarshipHolder) => api.post("/scholarship-holders/create", data),

  UpdateScholarShipHolder: (data: UpdateScholarShipHolder) => api.put("/scholarship-holders/update", data),

  removeScholarShipHolder: (id: string) => api.delete(`/scholarship-holders/delete/${id}`),

  getPlanoTrabalho: (id: string, referencia: string) => api.get(`/plano-de-trabalho/download/${id}`, { responseType: "blob" }).then(response => {
    const blob = new Blob([response.data], { type: response.headers['content-type'] });
    const url = window.URL.createObjectURL(blob);
    const a = document.createElement("a");
    a.href = url;
    a.download = `Plano_de_Trabalho_${referencia}.docx`; // Nome do arquivo
    document.body.appendChild(a);
    a.click();
    
    // Limpar o objeto URL criado
    setTimeout(() => {
      a.remove();
      window.URL.revokeObjectURL(url);
    }, 0);
  }),
};

export { links };
export default api;
